// src/controllers/GrupoController.ts
import { Request, Response } from 'express';
import GrupoService from '../../services/Crud/grupoServices';

class GrupoController {
  async crearGrupo(req: Request, res: Response): Promise<void> {
    try {
      const grupo = await GrupoService.crearGrupo(req.body);
      res.status(201).json(grupo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerGrupos(req: Request, res: Response): Promise<void> {
    try {
      const grupos = await GrupoService.obtenerGrupos();
      res.status(200).json(grupos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async obtenerGrupoPorId(req: Request, res: Response): Promise<void> {
    try {
      const grupo = await GrupoService.obtenerGrupoPorId(req.params.id);
      if (grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(404).json({ message: 'Grupo no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async actualizarGrupo(req: Request, res: Response): Promise<void> {
    try {
      const grupo = await GrupoService.actualizarGrupo(req.params.id, req.body);
      if (grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(404).json({ message: 'Grupo no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async eliminarGrupo(req: Request, res: Response): Promise<void> {
    try {
      const grupo = await GrupoService.eliminarGrupo(req.params.id);
      if (grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(404).json({ message: 'Grupo no encontrado' });
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

export default new GrupoController();
