import Grupo, { IGrupo } from '../../models/grupo';

class GrupoService {
  async crearGrupo(grupo: IGrupo): Promise<IGrupo> {
    const nuevoGrupo = new Grupo(grupo);
    return await nuevoGrupo.save();
  }

  async obtenerGrupos(): Promise<IGrupo[]> {
    return await Grupo.find();
  }

  async obtenerGrupoPorId(id: string): Promise<IGrupo | null> {
    return await Grupo.findById(id);
  }

  async actualizarGrupo(id: string, grupo: Partial<IGrupo>): Promise<IGrupo | null> {
    return await Grupo.findByIdAndUpdate(id, grupo, { new: true });
  }

  async eliminarGrupo(id: string): Promise<IGrupo | null> {
    return await Grupo.findByIdAndDelete(id);
  }
}

export default new GrupoService();
