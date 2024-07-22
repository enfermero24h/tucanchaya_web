// controllers/canchaController.js
const Cancha = require('../models/cancha');

// Crear una nueva cancha
const crearCancha = async (req, res) => {
  try {
    const cancha = new Cancha(req.body);
    await cancha.save();
    res.status(201).send(cancha);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todas las canchas
const obtenerCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.find();
    res.status(200).send(canchas);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener una cancha por ID
const obtenerCancha = async (req, res) => {
  try {
    const cancha = await Cancha.findById(req.params.id);
    if (!cancha) {
      return res.status(404).send();
    }
    res.send(cancha);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar una cancha por ID
const actualizarCancha = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nombre', 'direccion', 'dimensiones', 'ciudad'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const cancha = await Cancha.findById(req.params.id);
    if (!cancha) {
      return res.status(404).send();
    }

    updates.forEach(update => cancha[update] = req.body[update]);
    await cancha.save();
    res.send(cancha);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar una cancha por ID
const eliminarCancha = async (req, res) => {
  try {
    const cancha = await Cancha.findByIdAndDelete(req.params.id);
    if (!cancha) {
      return res.status(404).send();
    }
    res.send(cancha);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  crearCancha,
  obtenerCanchas,
  obtenerCancha,
  actualizarCancha,
  eliminarCancha
};
