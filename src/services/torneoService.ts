import mongoose from 'mongoose';
import Equipo from '../models/equipo';
import Torneo, { ITorneo } from '../models/torneo';
import NotificacionService from './notificacionService';

class TorneoService {
  async crearTorneo(torneoData: Partial<ITorneo>): Promise<ITorneo> {
    const torneo = new Torneo(torneoData);
    return await torneo.save();
  }
  //getionamos la parte de la informacion para la gestio nd

  async obtenerTorneos(): Promise<ITorneo[]> {
    return await Torneo.find().populate('equiposParticipantes');
  }

  async obtenerTorneoPorId(id: string): Promise<ITorneo | null> {
    return await Torneo.findById(id).populate('equiposParticipantes');
  }

  async actualizarTorneo(id: string, torneoData: Partial<ITorneo>): Promise<ITorneo | null> {
    const torneoActualizado = await Torneo.findByIdAndUpdate(id, torneoData, { new: true });
    if (torneoActualizado) {
      await NotificacionService.notificarCambioTorneo(id, 'Se han actualizado los detalles del torneo.');
    }
    return torneoActualizado;
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

    // Agregar el equipo a la tabla de posiciones
    torneo.tablaPosiciones.push({
      equipo: equipoObjectId,
      puntos: 0,
      partidosJugados: 0,
      victorias: 0,
      empates: 0,
      derrotas: 0,
      golesFavor: 0,
      golesContra: 0,
      diferenciaGoles: 0,
      partidosLocal: 0,
      partidosVisitante: 0,
      victoriasLocal: 0,
      victoriasVisitante: 0,
      empatesLocal: 0,
      empatesVisitante: 0,
      derrotasLocal: 0,
      derrotasVisitante: 0,
      rachaActual: []
    });
    const torneoActualizado = await torneo.save();
    if (torneoActualizado) {
      await NotificacionService.notificarCambioTorneo(torneoId, `Se ha inscrito un nuevo equipo: ${equipo.nombre}`);
    }
    return torneoActualizado;
  }
}

export default new TorneoService();