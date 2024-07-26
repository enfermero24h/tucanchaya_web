import mongoose from 'mongoose';
import Equipo from '../models/equipo';
import Estadistica, { IEstadistica } from '../models/estadistica';
import Torneo from '../models/torneo';
import Usuario from '../models/usuario';

class EstadisticaService {

    async registrarEstadisticas(estadisticasData: Array<{
      torneo: mongoose.Types.ObjectId;
      equipo: mongoose.Types.ObjectId;
      jugador: mongoose.Types.ObjectId;
      partido: mongoose.Types.ObjectId;
      goles: number;
      asistencias: number;
      tarjetasAmarillas: number;
      tarjetasRojas: number;
      minutosJugados: number;
    }>): Promise<IEstadistica[]> {
      return await Estadistica.insertMany(estadisticasData);
    }

    async obtenerEstadisticasPorTorneo(torneoId: string): Promise<IEstadistica[]> {
      return await Estadistica.find({ torneo: torneoId })
        .populate('jugador', 'nombre')
        .populate('equipo', 'nombre')
        .lean();  // Esto convierte el documento de Mongoose a un objeto JavaScript plano
    }

  async obtenerEstadisticasPorEquipo(equipoId: string, torneoId: string): Promise<IEstadistica[]> {
    return await Estadistica.find({ equipo: equipoId, torneo: torneoId })
      .populate('jugador', 'nombre');
  }

  async obtenerEstadisticasPorJugador(jugadorId: string, torneoId: string): Promise<IEstadistica[]> {
    return await Estadistica.find({ jugador: jugadorId, torneo: torneoId });
  }

  async generarReporteTorneo(torneoId: string): Promise<any> {
    const estadisticas = await this.obtenerEstadisticasPorTorneo(torneoId);
    const torneo = await Torneo.findById(torneoId);

    if (!torneo) throw new Error('Torneo no encontrado');

    const equiposEstadisticas = await Promise.all(torneo.equiposParticipantes.map(async (equipoId) => {
      const estadisticasEquipo = estadisticas.filter(e => e.equipo._id.toString() === equipoId.toString());
      const equipo = await Equipo.findById(equipoId);
      return {
        nombre: equipo?.nombre || 'Equipo desconocido',
        goles: estadisticasEquipo.reduce((sum, e) => sum + e.goles, 0),
        asistencias: estadisticasEquipo.reduce((sum, e) => sum + e.asistencias, 0),
        tarjetasAmarillas: estadisticasEquipo.reduce((sum, e) => sum + e.tarjetasAmarillas, 0),
        tarjetasRojas: estadisticasEquipo.reduce((sum, e) => sum + e.tarjetasRojas, 0)
      };
    }));

    const jugadoresEstadisticas = await Promise.all(
      Array.from(new Set(estadisticas.map(e => e.jugador?._id?.toString() || ''))).map(async (jugadorId) => {
        const estadisticasJugador = estadisticas.filter(e => e.jugador?._id?.toString() === jugadorId);
        const jugador = await Usuario.findById(jugadorId);
        
        // Obtén el nombre del equipo de manera segura
        let nombreEquipo = 'Equipo desconocido';
        if (estadisticasJugador[0] && estadisticasJugador[0].equipo) {
          if (typeof estadisticasJugador[0].equipo === 'string') {
            // Si equipo es un string (probablemente un ID), busca el equipo
            const equipo = await Equipo.findById(estadisticasJugador[0].equipo);
            nombreEquipo = equipo?.nombre || 'Equipo desconocido';
          } else if (typeof estadisticasJugador[0]?.equipo === 'object') {
            // Si equipo es un objeto, intenta acceder al nombre
            nombreEquipo = estadisticasJugador[0]?.equipo?.toString() || 'Equipo desconocido';
          }
        }
    
        return {
          nombre: jugador?.name || 'Jugador desconocido',
          equipo: nombreEquipo,
          goles: estadisticasJugador.reduce((sum, e) => sum + (e.goles || 0), 0),
          asistencias: estadisticasJugador.reduce((sum, e) => sum + (e.asistencias || 0), 0),
          tarjetasAmarillas: estadisticasJugador.reduce((sum, e) => sum + (e.tarjetasAmarillas || 0), 0),
          tarjetasRojas: estadisticasJugador.reduce((sum, e) => sum + (e.tarjetasRojas || 0), 0),
          minutosJugados: estadisticasJugador.reduce((sum, e) => sum + (e.minutosJugados || 0), 0)
        };
      })
    );

    return {
      torneo: torneo.nombre,
      equipos: equiposEstadisticas,
      jugadores: jugadoresEstadisticas
    };
  }
}

export default new EstadisticaService();