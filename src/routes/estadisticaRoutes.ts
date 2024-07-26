import express from 'express';
import EstadisticaController from '../controllers/estadisticaController';
import { autenticarUsuario, autorizarRol } from '../middleware/auth';

const router = express.Router();

router.get('/torneo/:torneoId', EstadisticaController.obtenerEstadisticasPorTorneo);
router.get('/equipo/:equipoId/torneo/:torneoId', EstadisticaController.obtenerEstadisticasPorEquipo);
router.get('/jugador/:jugadorId/torneo/:torneoId', EstadisticaController.obtenerEstadisticasPorJugador);
router.get('/reporte/torneo/:torneoId', autenticarUsuario, autorizarRol(['admin', 'staff']), EstadisticaController.generarReporteTorneo);

export default router;