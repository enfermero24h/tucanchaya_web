// src/routes/PartidoRoutes.ts
import { Router } from 'express';
import PartidoController from '../../controllers/Crud/partidoController';

const router = Router();

router.post('/partidos', PartidoController.crearPartido);
router.get('/partidos', PartidoController.obtenerPartidos);
router.get('/partidos/:id', PartidoController.obtenerPartidoPorId);
router.put('/partidos/:id', PartidoController.actualizarPartido);
router.delete('/partidos/:id', PartidoController.eliminarPartido);

export default router;
