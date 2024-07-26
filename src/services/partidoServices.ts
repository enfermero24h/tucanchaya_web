import Partido, { IPartido } from '../models/partido';
import Torneo from '../models/torneo';
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

  async actualizarResultado(partidoId: string, golesLocal: number, golesVisitante: number): Promise<IPartido | null> {
    const partido = await Partido.findByIdAndUpdate(
      partidoId,
      { 
        golesLocal, 
        golesVisitante, 
        estado: 'finalizado' 
      },
      { new: true }
    );

    if (partido) {
      await TablaPosicionesService.actualizarTablaPosiciones(partidoId);
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
    return partidosCreados;
  }
}

export default new PartidoService();