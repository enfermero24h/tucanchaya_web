// routes/canchaRoutes.js
const express = require('express');
const router = express.Router();
const canchaController = require('../controllers/canchaController');

router.post('/canchas', canchaController.crearCancha);
router.get('/canchas', canchaController.obtenerCanchas);
router.get('/canchas/:id', canchaController.obtenerCancha);
router.patch('/canchas/:id', canchaController.actualizarCancha);
router.delete('/canchas/:id', canchaController.eliminarCancha);

module.exports = router;
