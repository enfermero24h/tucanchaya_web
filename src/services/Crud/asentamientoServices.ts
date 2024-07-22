// src/services/AsentamientoService.ts
import Asentamiento, { IAsentamiento } from '../../models/asentamiento';

class AsentamientoService {
  async crearAsentamiento(asentamiento: IAsentamiento): Promise<IAsentamiento> {
    const nuevoAsentamiento = new Asentamiento(asentamiento);
    return await nuevoAsentamiento.save();
  }

  async obtenerAsentamientos(): Promise<IAsentamiento[]> {
    return await Asentamiento.find().populate('canchaId');
  }

  async obtenerAsentamientoPorId(id: string): Promise<IAsentamiento | null> {
    return await Asentamiento.findById(id).populate('canchaId');
  }

  async actualizarAsentamiento(id: string, asentamiento: Partial<IAsentamiento>): Promise<IAsentamiento | null> {
    return await Asentamiento.findByIdAndUpdate(id, asentamiento, { new: true }).populate('canchaId');
  }

  async eliminarAsentamiento(id: string): Promise<IAsentamiento | null> {
    return await Asentamiento.findByIdAndDelete(id).populate('canchaId');
  }
}

export default new AsentamientoService();
