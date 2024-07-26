import express from 'express';
import PartidoController from '../controllers/partidoController';
import { autenticarUsuario, autorizarRol } from '../middleware/auth';

const router = express.Router();

router.post('/', autenticarUsuario, autorizarRol(['admin', 'staff']), PartidoController.crearPartido);
router.get('/torneo/:torneoId', PartidoController.obtenerPartidosPorTorneo);
router.put('/:partidoId/resultado', autenticarUsuario, autorizarRol(['admin', 'staff']), PartidoController.actualizarResultado);
router.post('/generar-fixture/:torneoId', autenticarUsuario, autorizarRol(['admin', 'staff']), PartidoController.generarFixture);

export default router;