import { Request, Response } from 'express';
import PartidoService from '../services/Crud/partidoServices';

class PartidoController {
  async crearPartido(req: Request, res: Response): Promise<void> {
    try {
      const partido = await PartidoService.crearPartido(req.body);
      res.status(201).json(partido);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerPartidos(req: Request, res: Response): Promise<void> {
    try {
      const partidos = await PartidoService.obtenerPartidos();
      res.status(200).json(partidos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerPartidoPorId(req: Request, res: Response): Promise<void> {
    try {
      const partido = await PartidoService.obtenerPartidoPorId(req.params.id);
      if (partido) {
        res.status(200).json(partido);
      } else {
        res.status(404).json({ message: 'Partido no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async actualizarPartido(req: Request, res: Response): Promise<void> {
    try {
      const partido = await PartidoService.actualizarPartido(req.params.id, req.body);
      if (partido) {
        res.status(200).json(partido);
      } else {
        res.status(404).json({ message: 'Partido no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async eliminarPartido(req: Request, res: Response): Promise<void> {
    try {
      const partido = await PartidoService.eliminarPartido(req.params.id);
      if (partido) {
        res.status(200).json(partido);
      } else {
        res.status(404).json({ message: 'Partido no encontrado' });
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

export default new PartidoController();
