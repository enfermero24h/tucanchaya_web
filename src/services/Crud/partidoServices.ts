// src/services/PartidoService.ts
import Partido, { IPartido } from '../../models/partido';

class PartidoService {
  async crearPartido(partido: IPartido): Promise<IPartido> {
    const nuevoPartido = new Partido(partido);
    return await nuevoPartido.save();
  }

  async obtenerPartidos(): Promise<IPartido[]> {
    return await Partido.find();
  }

  async obtenerPartidoPorId(id: string): Promise<IPartido | null> {
    return await Partido.findById(id);
  }

  async actualizarPartido(id: string, partido: Partial<IPartido>): Promise<IPartido | null> {
    return await Partido.findByIdAndUpdate(id, partido, { new: true });
  }

  async eliminarPartido(id: string): Promise<IPartido | null> {
    return await Partido.findByIdAndDelete(id);
  }
}

export default new PartidoService();
