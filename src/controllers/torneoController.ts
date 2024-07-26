import { Request, Response } from 'express';
import PartidoService from '../services/partidoServices';
import TablaPosicionesService from '../services/tablaPosicionesService';
import TorneoService from '../services/torneoService';

class TorneoController {
  async crearTorneo(req: Request, res: Response) {
    try {
      const torneo = await TorneoService.crearTorneo(req.body);
      res.status(201).json(torneo);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el torneo' });
    }
  }

  async obtenerTorneos(req: Request, res: Response) {
    try {
      const torneos = await TorneoService.obtenerTorneos();
      res.json(torneos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los torneos'});
    }
  }

  async obtenerTorneoPorId(req: Request, res: Response) {
    try {
      const torneo = await TorneoService.obtenerTorneoPorId(req.params.id);
      if (torneo) {
        res.json(torneo);
      } else {
        res.status(404).json({ message: 'Torneo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el torneo' });
    }
  }

  async actualizarTorneo(req: Request, res: Response) {
    try {
      const torneo = await TorneoService.actualizarTorneo(req.params.id, req.body);
      if (torneo) {
        res.json(torneo);
      } else {
        res.status(404).json({ message: 'Torneo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el torneo' });
    }
  }

  async eliminarTorneo(req: Request, res: Response) {
    try {
      const torneo = await TorneoService.eliminarTorneo(req.params.id);
      if (torneo) {
        res.json({ message: 'Torneo eliminado con éxito' });
      } else {
        res.status(404).json({ message: 'Torneo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el torneo' });
    }
  }

  async generarFixture(req: Request, res: Response) {
    try {
      const partidos = await PartidoService.generarFixture(req.params.id);
      res.json(partidos);
    } catch (error) {
      res.status(500).json({ message: 'Error al generar el fixture' });
    }
  }

  async obtenerTablaPosiciones(req: Request, res: Response) {
    try {
      const tablaPosiciones = await TablaPosicionesService.obtenerTablaPosiciones(req.params.id);
      res.json(tablaPosiciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la tabla de posiciones'});
    }
  }

  async inscribirEquipo(req: Request, res: Response) {
    try {
      const { torneoId, equipoId } = req.params;
      const torneo = await TorneoService.inscribirEquipo(torneoId, equipoId);
      if (torneo) {
        res.json(torneo);
      } else {
        res.status(404).json({ message: 'Torneo no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error al inscribir el equipo'});
    }
  }
}

export default new TorneoController();