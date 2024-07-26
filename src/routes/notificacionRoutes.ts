import express from 'express';
import NotificacionController from '../controllers/notificacionController';
import { autenticarUsuario } from '../middleware/auth';

const router = express.Router();

router.get('/', autenticarUsuario, NotificacionController.obtenerNotificacionesPorUsuario);
router.put('/:id/leer', autenticarUsuario, NotificacionController.marcarComoLeida);

export default router;