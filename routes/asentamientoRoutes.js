// routes/asentamientoRoutes.js
const express = require('express');
const router = express.Router();
const asentamientoController = require('../controllers/asentamientoController');

router.post('/asentamientos', asentamientoController.crearAsentamiento);
router.get('/asentamientos', asentamientoController.obtenerAsentamientos);
router.get('/asentamientos/:id', asentamientoController.obtenerAsentamiento);
router.patch('/asentamientos/:id', asentamientoController.actualizarAsentamiento);
router.delete('/asentamientos/:id', asentamientoController.eliminarAsentamiento);

module.exports = router;
