import Sector, { ISector } from '../../models/sector';

class SectorService {
    async crearSector(sectorData: Partial<ISector>): Promise<ISector> {
        const sector = new Sector(sectorData);
        return await sector.save();
    }

    async obtenerSectores(): Promise<ISector[]> {
        return await Sector.find({ activo: true });
    }

    async obtenerSectorPorId(id: string): Promise<ISector | null> {
        return await Sector.findById(id);
    }

    async actualizarSector(id: string, sectorData: Partial<ISector>): Promise<ISector | null> {
        return await Sector.findByIdAndUpdate(id, sectorData, { new: true });
    }

    async eliminarSector(id: string): Promise<ISector | null> {
        return await Sector.findByIdAndUpdate(id, { activo: false }, { new: true });
    }
}

export default new SectorService();