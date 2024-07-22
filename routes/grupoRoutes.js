// routes/grupoRoutes.js
const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.post('/grupos', grupoController.crearGrupo);
router.get('/grupos', grupoController.obtenerGrupos);
router.get('/grupos/:id', grupoController.obtenerGrupo);
router.patch('/grupos/:id', grupoController.actualizarGrupo);
router.delete('/grupos/:id', grupoController.eliminarGrupo);

module.exports = router;
