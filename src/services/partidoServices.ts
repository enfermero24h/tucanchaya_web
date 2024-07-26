import mongoose from 'mongoose';
import Partido, { IPartido } from '../models/partido';
import Torneo from '../models/torneo';

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
    return await Partido.findByIdAndUpdate(
      partidoId,
      {
        golesLocal,
        golesVisitante,
        estado: 'finalizado'
      },
      { new: true }
    );
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
          torneo: new mongoose.Types.ObjectId(torneoId),
          equipoLocal: new mongoose.Types.ObjectId(equipos[i].toString()),
          equipoVisitante: new mongoose.Types.ObjectId(equipos[j].toString()),
          fecha: new Date(), // Ajustar según la lógica de programación
          cancha: new mongoose.Types.ObjectId(canchas[Math.floor(Math.random() * canchas.length)]._id.toString()),
          estado: 'programado'
        });
        partidos.push(partido);
      }
    }

    // Guardar los partidos generados
    return await Partido.insertMany(partidos);
  }
}

export default new PartidoService();