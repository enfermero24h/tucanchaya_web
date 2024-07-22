// controllers/equipoController.js
const Equipo = require('../models/equipo');

// Crear un nuevo equipo
const crearEquipo = async (req, res) => {
  try {
    const equipo = new Equipo(req.body);
    await equipo.save();
    res.status(201).send(equipo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los equipos
const obtenerEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.find().populate('miembros');
    res.status(200).send(equipos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un equipo por ID
const obtenerEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id).populate('miembros');
    if (!equipo) {
      return res.status(404).send();
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un equipo por ID
const actualizarEquipo = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nombre', 'miembros'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      return res.status(404).send();
    }

    updates.forEach(update => equipo[update] = req.body[update]);
    await equipo.save();
    res.send(equipo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un equipo por ID
const eliminarEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) {
      return res.status(404).send();
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  crearEquipo,
  obtenerEquipos,
  obtenerEquipo,
  actualizarEquipo,
  eliminarEquipo
};
