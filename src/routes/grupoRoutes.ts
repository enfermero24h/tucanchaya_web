// src/routes/GrupoRoutes.ts
import { Router } from 'express';
import GrupoController from '../controllers/grupoController';

const router = Router();

router.post('/grupos', GrupoController.crearGrupo);
router.get('/grupos', GrupoController.obtenerGrupos);
router.get('/grupos/:id', GrupoController.obtenerGrupoPorId);
router.put('/grupos/:id', GrupoController.actualizarGrupo);
router.delete('/grupos/:id', GrupoController.eliminarGrupo);

export default router;
