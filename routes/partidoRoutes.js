// routes/partidoRoutes.js
const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.post('/partidos', partidoController.crearPartido);
router.get('/partidos', partidoController.obtenerPartidos);
router.get('/partidos/:id', partidoController.obtenerPartido);
router.patch('/partidos/:id', partidoController.actualizarPartido);
router.delete('/partidos/:id', partidoController.eliminarPartido);

module.exports = router;
