import express from 'express';
import PagoController from '../controllers/pagoController';
import { autenticarUsuario, autorizarRol } from '../middleware/auth';

const router = express.Router();

router.post('/', autenticarUsuario, PagoController.crearPago);
router.get('/', autenticarUsuario, autorizarRol(['admin']), PagoController.obtenerPagos);
router.get('/:id', autenticarUsuario, PagoController.obtenerPagoPorId);
router.put('/:id', autenticarUsuario, autorizarRol(['admin']), PagoController.actualizarPago);
router.delete('/:id', autenticarUsuario, autorizarRol(['admin']), PagoController.eliminarPago);
router.get('/usuario/:usuarioId', autenticarUsuario, PagoController.obtenerPagosPorUsuario);
router.get('/reserva/:reservaId', autenticarUsuario, PagoController.obtenerPagosPorReserva);

export default router;