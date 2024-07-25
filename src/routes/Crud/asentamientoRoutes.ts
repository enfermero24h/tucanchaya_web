// src/routes/AsentamientoRoutes.ts
import { Router } from 'express';
import AsentamientoController from '../../controllers/Crud/asentamientoController';

const router = Router();

router.post('/asentamientos', AsentamientoController.crearAsentamiento);
router.get('/asentamientos', AsentamientoController.obtenerAsentamientos);
router.get('/asentamientos/:id', AsentamientoController.obtenerAsentamientoPorId);
router.put('/asentamientos/:id', AsentamientoController.actualizarAsentamiento);
router.delete('/asentamientos/:id', AsentamientoController.eliminarAsentamiento);

export default router;
