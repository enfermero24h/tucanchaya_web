// src/routes/EquipoRoutes.ts
import { Router } from 'express';
import EquipoController from '../../controllers/Crud/equipoController';

const router = Router();

router.post('/equipos', EquipoController.crearEquipo);
router.get('/equipos', EquipoController.obtenerEquipos);
router.get('/equipos/:id', EquipoController.obtenerEquipoPorId);
router.put('/equipos/:id', EquipoController.actualizarEquipo);
router.delete('/equipos/:id', EquipoController.eliminarEquipo);

export default router;
