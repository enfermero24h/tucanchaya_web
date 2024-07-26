import express from 'express';
import TorneoController from '../controllers/torneoController';
import { autenticarUsuario, autorizarRol } from '../middleware/auth';

const router = express.Router();

// Rutas públicas
router.get('/', TorneoController.obtenerTorneos);
router.get('/:id', TorneoController.obtenerTorneoPorId);

// Rutas protegidas
router.post('/', autenticarUsuario, autorizarRol(['admin', 'staff']), TorneoController.crearTorneo);
router.put('/:id', autenticarUsuario, autorizarRol(['admin', 'staff']), TorneoController.actualizarTorneo);
router.delete('/:id', autenticarUsuario, autorizarRol(['admin']), TorneoController.eliminarTorneo);
router.post('/:torneoId/inscribir/:equipoId', autenticarUsuario, TorneoController.inscribirEquipo);
router.post('/:torneoId/ganador/:equipoId', autenticarUsuario, autorizarRol(['admin', 'staff']), TorneoController.establecerGanador);

export default router;