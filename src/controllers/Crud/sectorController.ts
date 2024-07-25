import { Request, Response } from 'express';
import SectorService from '../../services/Crud/sectorService';

class SectorController {
    async crearSector(req: Request, res: Response) {
        try {
        const sector = await SectorService.crearSector(req.body);
        res.status(201).json(sector);
        } catch (error) {
        res.status(400).json({ message: 'Error al crear el sector', error });
        }
    }

    async obtenerSectores(req: Request, res: Response) {
        try {
        const sectores = await SectorService.obtenerSectores();
        res.json(sectores);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener los sectores', error });
        }
    }

    async obtenerSectorPorId(req: Request, res: Response) {
        try {
        const sector = await SectorService.obtenerSectorPorId(req.params.id);
        if (sector) {
            res.json(sector);
        } else {
            res.status(404).json({ message: 'Sector no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener el sector', error });
        }
    }

    async actualizarSector(req: Request, res: Response) {
        try {
        const sector = await SectorService.actualizarSector(req.params.id, req.body);
        if (sector) {
            res.json(sector);
        } else {
            res.status(404).json({ message: 'Sector no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el sector', error });
        }
    }

    async eliminarSector(req: Request, res: Response) {
        try {
        const sector = await SectorService.eliminarSector(req.params.id);
        if (sector) {
            res.json({ message: 'Sector eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Sector no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el sector', error });
        }
    }
}

export default new SectorController();