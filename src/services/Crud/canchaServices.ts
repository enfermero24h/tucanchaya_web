// src/services/CanchaService.ts
import Cancha, { ICancha } from '../../models/cancha';

class CanchaService {
  async crearCancha(cancha: ICancha): Promise<ICancha> {
    const nuevaCancha = new Cancha(cancha);
    return await nuevaCancha.save();
  }

  async obtenerCanchas(): Promise<ICancha[]> {
    return await Cancha.find();
  }

  async obtenerCanchaPorId(id: string): Promise<ICancha | null> {
    return await Cancha.findById(id);
  }

  async actualizarCancha(id: string, cancha: Partial<ICancha>): Promise<ICancha | null> {
    return await Cancha.findByIdAndUpdate(id, cancha, { new: true });
  }

  async eliminarCancha(id: string): Promise<ICancha | null> {
    return await Cancha.findByIdAndDelete(id);
  }
}

export default new CanchaService();
