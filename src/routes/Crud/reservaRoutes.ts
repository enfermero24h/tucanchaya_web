import express from 'express';
import ReservaController from '../../controllers/Crud/reservaController';

const router = express.Router();

router.post('/', ReservaController.crearReserva);
router.get('/', ReservaController.obtenerReservas);
router.get('/:id', ReservaController.obtenerReservaPorId);
router.put('/:id', ReservaController.actualizarReserva);
router.patch('/:id/cancelar', ReservaController.cancelarReserva);
router.get('/usuario/:usuarioId', ReservaController.obtenerReservasPorUsuario);
router.get('/cancha/:canchaId', ReservaController.obtenerReservasPorCancha);

export default router;