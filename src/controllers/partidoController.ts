import { Request, Response } from 'express';
import PartidoService from '../services/partidoServices';

class PartidoController {
  async crearPartido(req: Request, res: Response) {
    try {
      const partido = await PartidoService.crearPartido(req.body);
      res.status(201).json(partido);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el partido' });
    }
  }

  async obtenerPartidosPorTorneo(req: Request, res: Response) {
    try {
      const partidos = await PartidoService.obtenerPartidosPorTorneo(req.params.torneoId);
      res.json(partidos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los partidos'});
    }
  }

  async actualizarResultado(req: Request, res: Response) {
    try {
      const { partidoId } = req.params;
      const { golesLocal, golesVisitante } = req.body;
      const partido = await PartidoService.actualizarResultado(partidoId, golesLocal, golesVisitante);
      res.json(partido);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el resultado' });
    }
  }

  async generarFixture(req: Request, res: Response) {
    try {
      const { torneoId } = req.params;
      const partidos = await PartidoService.generarFixture(torneoId);
      res.json(partidos);
    } catch (error) {
      res.status(500).json({ message: 'Error al generar el fixture' });
    }
  }
}

export default new PartidoController();