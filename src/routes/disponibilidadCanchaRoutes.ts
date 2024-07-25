// routes/disponibilidadCanchaRoutes.ts

import express from 'express';
import DisponibilidadCanchaController from '../controllers/disponibilidadCanchaController';
import { autenticarUsuario } from '../middleware/auth'; // Asegúrate de tener este middleware

const router = express.Router();

router.post('/verificar', autenticarUsuario, DisponibilidadCanchaController.verificarDisponibilidad);
router.get('/:canchaId/:fecha', autenticarUsuario, DisponibilidadCanchaController.obtenerHorariosDisponibles);
router.post('/validar', autenticarUsuario, DisponibilidadCanchaController.validarReserva);

export default router;