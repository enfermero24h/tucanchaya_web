// controllers/asentamientoController.js
const Asentamiento = require('../models/asentamiento');

// Crear un nuevo asentamiento
const crearAsentamiento = async (req, res) => {
  try {
    const asentamiento = new Asentamiento(req.body);
    await asentamiento.save();
    res.status(201).send(asentamiento);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los asentamientos
const obtenerAsentamientos = async (req, res) => {
  try {
    const asentamientos = await Asentamiento.find().populate('cancha');
    res.status(200).send(asentamientos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un asentamiento por ID
const obtenerAsentamiento = async (req, res) => {
  try {
    const asentamiento = await Asentamiento.findById(req.params.id).populate('cancha');
    if (!asentamiento) {
      return res.status(404).send();
    }
    res.send(asentamiento);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un asentamiento por ID
const actualizarAsentamiento = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['fecha', 'cancha', 'descripcion'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const asentamiento = await Asentamiento.findById(req.params.id);
    if (!asentamiento) {
      return res.status(404).send();
    }

    updates.forEach(update => asentamiento[update] = req.body[update]);
    await asentamiento.save();
    res.send(asentamiento);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un asentamiento por ID
const eliminarAsentamiento = async (req, res) => {
  try {
    const asentamiento = await Asentamiento.findByIdAndDelete(req.params.id);
    if (!asentamiento) {
      return res.status(404).send();
    }
    res.send(asentamiento);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  crearAsentamiento,
  obtenerAsentamientos,
  obtenerAsentamiento,
  actualizarAsentamiento,
  eliminarAsentamiento
};
