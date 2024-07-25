import express from 'express';
import SectorController from '../../controllers/Crud/sectorController';

const router = express.Router();

router.post('/', SectorController.crearSector);
router.get('/', SectorController.obtenerSectores);
router.get('/:id', SectorController.obtenerSectorPorId);
router.put('/:id', SectorController.actualizarSector);
router.delete('/:id', SectorController.eliminarSector);

export default router;