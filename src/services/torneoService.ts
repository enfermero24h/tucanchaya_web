import mongoose from 'mongoose';
import Equipo from '../models/equipo';
import Torneo, { ITorneo } from '../models/torneo';

class TorneoService {
  async crearTorneo(torneoData: Partial<ITorneo>): Promise<ITorneo> {
    const torneo = new Torneo(torneoData);
    return await torneo.save();
  }

  async obtenerTorneos(): Promise<ITorneo[]> {
    return await Torneo.find()
      .populate('equiposParticipantes')
      .populate('canchas')
      .populate('creador');
  }

  async obtenerTorneoPorId(id: string): Promise<ITorneo | null> {
    return await Torneo.findById(id)
      .populate('equiposParticipantes')
      .populate('canchas')
      .populate('creador')
      .populate('ganador');
  }

  async actualizarTorneo(id: string, torneoData: Partial<ITorneo>): Promise<ITorneo | null> {
    return await Torneo.findByIdAndUpdate(id, torneoData, { new: true });
  }

  async eliminarTorneo(id: string): Promise<ITorneo | null> {
    return await Torneo.findByIdAndDelete(id);
  }

  async inscribirEquipo(torneoId: string, equipoId: string): Promise<ITorneo | null> {
    const torneo = await Torneo.findById(torneoId);
    const equipo = await Equipo.findById(equipoId);

    if (!torneo || !equipo) {
      throw new Error('Torneo o equipo no encontrado');
    }

    if (torneo.equiposParticipantes.length >= torneo.maxEquipos) {
      throw new Error('El torneo ya ha alcanzado el máximo de equipos');
    }

    const equipoObjectId = new mongoose.Types.ObjectId(equipoId);
    if (torneo.equiposParticipantes.some(id => id.equals(equipoObjectId))) {
      throw new Error('El equipo ya está inscrito en este torneo');
    }

    torneo.equiposParticipantes.push(equipoObjectId);
    return await torneo.save();
  }

  async establecerGanador(torneoId: string, equipoId: string): Promise<ITorneo | null> {
    const torneo = await Torneo.findById(torneoId);
    const equipo = await Equipo.findById(equipoId);

    if (!torneo || !equipo) {
      throw new Error('Torneo o equipo no encontrado');
    }

    const equipoObjectId = new mongoose.Types.ObjectId(equipoId);
    if (!torneo.equiposParticipantes.some(id => id.equals(equipoObjectId))) {
      throw new Error('Este equipo no participa en el torneo');
    }

    torneo.ganador = equipoObjectId;
    torneo.estado = 'finalizado';
    return await torneo.save();
  }
}

export default new TorneoService();