// src/routes/CanchaRoutes.ts
import { Router } from 'express';
import CanchaController from '../controllers/canchaController';

const router = Router();

router.post('/canchas', CanchaController.crearCancha);
router.get('/canchas', CanchaController.obtenerCanchas);
router.get('/canchas/:id', CanchaController.obtenerCanchaPorId);
router.put('/canchas/:id', CanchaController.actualizarCancha);
router.delete('/canchas/:id', CanchaController.eliminarCancha);

export default router;
