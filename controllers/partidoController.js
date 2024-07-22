// controllers/partidoController.js
const Partido = require('../models/partido');

// Crear un nuevo partido
const crearPartido = async (req, res) => {
  try {
    const partido = new Partido(req.body);
    await partido.save();
    res.status(201).send(partido);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los partidos
const obtenerPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find().populate('grupos');
    res.status(200).send(partidos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un partido por ID
const obtenerPartido = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id).populate('grupos');
    if (!partido) {
      return res.status(404).send();
    }
    res.send(partido);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un partido por ID
const actualizarPartido = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['fecha', 'ubicacion', 'grupos', 'resultado'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const partido = await Partido.findById(req.params.id);
    if (!partido) {
      return res.status(404).send();
    }

    updates.forEach(update => partido[update] = req.body[update]);
    await partido.save();
    res.send(partido);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un partido por ID
const eliminarPartido = async (req, res) => {
  try {
    const partido = await Partido.findByIdAndDelete(req.params.id);
    if (!partido) {
      return res.status(404).send();
    }
    res.send(partido);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  crearPartido,
  obtenerPartidos,
  obtenerPartido,
  actualizarPartido,
  eliminarPartido
};
