// src/controllers/CanchaController.ts
import { Request, Response } from 'express';
import CanchaService from '../services/Crud/canchaServices';

class CanchaController {
  async crearCancha(req: Request, res: Response): Promise<void> {
    try {
      const cancha = await CanchaService.crearCancha(req.body);
      res.status(201).json(cancha);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerCanchas(req: Request, res: Response): Promise<void> {
    try {
      const canchas = await CanchaService.obtenerCanchas();
      res.status(200).json(canchas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerCanchaPorId(req: Request, res: Response): Promise<void> {
    try {
      const cancha = await CanchaService.obtenerCanchaPorId(req.params.id);
      if (cancha) {
        res.status(200).json(cancha);
      } else {
        res.status(404).json({ message: 'Cancha no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizarCancha(req: Request, res: Response): Promise<void> {
    try {
      const cancha = await CanchaService.actualizarCancha(req.params.id, req.body);
      if (cancha) {
        res.status(200).json(cancha);
      } else {
        res.status(404).json({ message: 'Cancha no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminarCancha(req: Request, res: Response): Promise<void> {
    try {
      const cancha = await CanchaService.eliminarCancha(req.params.id);
      if (cancha) {
        res.status(200).json(cancha);
      } else {
        res.status(404).json({ message: 'Cancha no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CanchaController();
