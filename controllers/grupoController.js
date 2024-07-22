// controllers/grupoController.js
const Grupo = require('../models/grupo');

// Crear un nuevo grupo
const crearGrupo = async (req, res) => {
  try {
    const grupo = new Grupo(req.body);
    await grupo.save();
    res.status(201).send(grupo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los grupos
const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find().populate('equipos');
    res.status(200).send(grupos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un grupo por ID
const obtenerGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.findById(req.params.id).populate('equipos');
    if (!grupo) {
      return res.status(404).send();
    }
    res.send(grupo);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un grupo por ID
const actualizarGrupo = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nombre', 'equipos'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const grupo = await Grupo.findById(req.params.id);
    if (!grupo) {
      return res.status(404).send();
    }

    updates.forEach(update => grupo[update] = req.body[update]);
    await grupo.save();
    res.send(grupo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un grupo por ID
const eliminarGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.findByIdAndDelete(req.params.id);
    if (!grupo) {
      return res.status(404).send();
    }
    res.send(grupo);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  crearGrupo,
  obtenerGrupos,
  obtenerGrupo,
  actualizarGrupo,
  eliminarGrupo
};
