// src/services/EquipoService.ts
import Equipo, { IEquipo } from '../../models/equipo';

class EquipoService {
  async crearEquipo(equipo: IEquipo): Promise<IEquipo> {
    const nuevoEquipo = new Equipo(equipo);
    return await nuevoEquipo.save();
  }

  async obtenerEquipos(): Promise<IEquipo[]> {
    return await Equipo.find();
  }

  async obtenerEquipoPorId(id: string): Promise<IEquipo | null> {
    return await Equipo.findById(id);
  }

  async actualizarEquipo(id: string, equipo: Partial<IEquipo>): Promise<IEquipo | null> {
    return await Equipo.findByIdAndUpdate(id, equipo, { new: true });
  }

  async eliminarEquipo(id: string): Promise<IEquipo | null> {
    return await Equipo.findByIdAndDelete(id);
  }
}

export default new EquipoService();
