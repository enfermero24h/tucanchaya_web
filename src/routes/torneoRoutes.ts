import express from 'express';
import TorneoController from '../controllers/torneoController';
import { autenticarUsuario, autorizarRol } from '../middleware/auth';

const router = express.Router();

router.post('/', autenticarUsuario, autorizarRol(['admin']), TorneoController.crearTorneo);
router.get('/', TorneoController.obtenerTorneos);
router.get('/:id', TorneoController.obtenerTorneoPorId);
router.put('/:id', autenticarUsuario, autorizarRol(['admin']), TorneoController.actualizarTorneo);
router.delete('/:id', autenticarUsuario, autorizarRol(['admin']), TorneoController.eliminarTorneo);
router.post('/:id/generar-fixture', autenticarUsuario, autorizarRol(['admin']), TorneoController.generarFixture);
router.get('/:id/tabla-posiciones', TorneoController.obtenerTablaPosiciones);
router.post('/:torneoId/inscribir/:equipoId', autenticarUsuario, autorizarRol(['admin', 'staff']), TorneoController.inscribirEquipo);


export default router;