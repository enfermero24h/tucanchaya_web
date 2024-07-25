// src/controllers/EquipoController.ts
import { Request, Response } from 'express';
import EquipoService from '../../services/Crud/equipoServices';

class EquipoController {
  async crearEquipo(req: Request, res: Response): Promise<void> {
    try {
      const equipo = await EquipoService.crearEquipo(req.body);
      res.status(201).json(equipo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerEquipos(req: Request, res: Response): Promise<void> {
    try {
      const equipos = await EquipoService.obtenerEquipos();
      res.status(200).json(equipos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerEquipoPorId(req: Request, res: Response): Promise<void> {
    try {
      const equipo = await EquipoService.obtenerEquipoPorId(req.params.id);
      if (equipo) {
        res.status(200).json(equipo);
      } else {
        res.status(404).json({ message: 'Equipo no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async actualizarEquipo(req: Request, res: Response): Promise<void> {
    try {
      const equipo = await EquipoService.actualizarEquipo(req.params.id, req.body);
      if (equipo) {
        res.status(200).json(equipo);
      } else {
        res.status(404).json({ message: 'Equipo no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async eliminarEquipo(req: Request, res: Response): Promise<void> {
    try {
      const equipo = await EquipoService.eliminarEquipo(req.params.id);
      if (equipo) {
        res.status(200).json(equipo);
      } else {
        res.status(404).json({ message: 'Equipo no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default new EquipoController();
