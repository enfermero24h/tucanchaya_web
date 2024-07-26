import { Request, Response } from 'express';
import EstadisticaService from '../services/estadisticaService';

class EstadisticaController {
    async obtenerEstadisticasPorTorneo(req: Request, res: Response) {
        try {
        const estadisticas = await EstadisticaService.obtenerEstadisticasPorTorneo(req.params.torneoId);
        res.json(estadisticas);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas' });
        }
    }

    async obtenerEstadisticasPorEquipo(req: Request, res: Response) {
        try {
        const estadisticas = await EstadisticaService.obtenerEstadisticasPorEquipo(req.params.equipoId, req.params.torneoId);
        res.json(estadisticas);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas del equipo'});
        }
    }

    async obtenerEstadisticasPorJugador(req: Request, res: Response) {
        try {
        const estadisticas = await EstadisticaService.obtenerEstadisticasPorJugador(req.params.jugadorId, req.params.torneoId);
        res.json(estadisticas);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas del jugador' });
        }
    }

    async generarReporteTorneo(req: Request, res: Response) {
        try {
        const reporte = await EstadisticaService.generarReporteTorneo(req.params.torneoId);
        res.json(reporte);
        } catch (error) {
        res.status(500).json({ message: 'Error al generar el reporte del torneo'});
        }
    }
    }

    export default new EstadisticaController();