// routes/equipoRoutes.js
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.post('/equipos', equipoController.crearEquipo);
router.get('/equipos', equipoController.obtenerEquipos);
router.get('/equipos/:id', equipoController.obtenerEquipo);
router.patch('/equipos/:id', equipoController.actualizarEquipo);
router.delete('/equipos/:id', equipoController.eliminarEquipo);

module.exports = router;
