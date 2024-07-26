import mongoose from 'mongoose';
import Partido, { IPartido } from '../models/partido';
import Torneo from '../models/torneo';
import EstadisticaService from './estadisticaService';
import NotificacionService from './notificacionService';
import TablaPosicionesService from './tablaPosicionesService';

class PartidoService {
  async crearPartido(partidoData: Partial<IPartido>): Promise<IPartido> {
    const partido = new Partido(partidoData);
    return await partido.save();
  }

  async obtenerPartidosPorTorneo(torneoId: string): Promise<IPartido[]> {
    return await Partido.find({ torneo: torneoId })
      .populate('equipoLocal')
      .populate('equipoVisitante')
      .populate('cancha')
      .sort('fecha');
  }

  async actualizarResultado(
    partidoId: mongoose.Types.ObjectId,
    resultadoData: {
      golesLocal: number,
      golesVisitante: number,
      estadisticasJugadores: Array<{
        jugador: mongoose.Types.ObjectId,
        equipo: mongoose.Types.ObjectId,
        goles: number,
        asistencias: number,
        tarjetasAmarillas: number,
        tarjetasRojas: number,
        minutosJugados: number
      }>
    }
  ): Promise<IPartido | null> {
    const partido = await Partido.findByIdAndUpdate(
      partidoId,
      {
        golesLocal: resultadoData.golesLocal,
        golesVisitante: resultadoData.golesVisitante,
        estado: 'finalizado'
      },
      { new: true }
    );

    if (partido) {
      await TablaPosicionesService.actualizarTablaPosiciones(partidoId);
      await NotificacionService.notificarResultadoPartido(partidoId);

      // Registrar estadísticas
      const estadisticas = resultadoData.estadisticasJugadores.map(e => ({
        torneo: partido.torneo,
        equipo: e.equipo,
        jugador: e.jugador,
        partido: partido._id,
        goles: e.goles,
        asistencias: e.asistencias,
        tarjetasAmarillas: e.tarjetasAmarillas,
        tarjetasRojas: e.tarjetasRojas,
        minutosJugados: e.minutosJugados
      }));

      await EstadisticaService.registrarEstadisticas(estadisticas);
    }

    return partido;
  }


  async generarFixture(torneoId: string): Promise<IPartido[]> {
    const torneo = await Torneo.findById(torneoId).populate('canchas');
    if (!torneo) throw new Error('Torneo no encontrado');

    const equipos = torneo.equiposParticipantes;
    const canchas = torneo.canchas;
    const partidos: IPartido[] = [];

    // Algoritmo simple de round-robin
    for (let i = 0; i < equipos.length; i++) {
      for (let j = i + 1; j < equipos.length; j++) {
        const partido = new Partido({
          torneo: torneoId,
          equipoLocal: equipos[i],
          equipoVisitante: equipos[j],
          fecha: new Date(),
          cancha: canchas[Math.floor(Math.random() * canchas.length)]._id,
          estado: 'programado'
        });
        partidos.push(partido);
      }
    }

    const partidosCreados = await Partido.insertMany(partidos);
    await TablaPosicionesService.inicializarTablaPosiciones(torneoId);

    // Notificar sobre los próximos partidos
    for (const partido of partidosCreados) {
      await NotificacionService.notificarPartidoProximo(partido._id);
    }
    
    return partidosCreados;
  }
}

export default new PartidoService();