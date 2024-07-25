// src/controllers/AsentamientoController.ts
import { Request, Response } from 'express';
import AsentamientoService from '../../services/Crud/asentamientoServices';

class AsentamientoController {
  async crearAsentamiento(req: Request, res: Response): Promise<void> {
    try {
      const asentamiento = await AsentamientoService.crearAsentamiento(req.body);
      res.status(201).json(asentamiento);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerAsentamientos(req: Request, res: Response): Promise<void> {
    try {
      const asentamientos = await AsentamientoService.obtenerAsentamientos();
      res.status(200).json(asentamientos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerAsentamientoPorId(req: Request, res: Response): Promise<void> {
    try {
      const asentamiento = await AsentamientoService.obtenerAsentamientoPorId(req.params.id);
      if (asentamiento) {
        res.status(200).json(asentamiento);
      } else {
        res.status(404).json({ message: 'Asentamiento no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async actualizarAsentamiento(req: Request, res: Response): Promise<void> {
    try {
      const asentamiento = await AsentamientoService.actualizarAsentamiento(req.params.id, req.body);
      if (asentamiento) {
        res.status(200).json(asentamiento);
      } else {
        res.status(404).json({ message: 'Asentamiento no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async eliminarAsentamiento(req: Request, res: Response): Promise<void> {
    try {
      const asentamiento = await AsentamientoService.eliminarAsentamiento(req.params.id);
      if (asentamiento) {
        res.status(200).json(asentamiento);
      } else {
        res.status(404).json({ message: 'Asentamiento no encontrado' });
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

export default new AsentamientoController();
