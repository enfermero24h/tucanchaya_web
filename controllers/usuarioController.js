// controllers/usuarioController.js
const Usuario = require('../models/usuario');

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un usuario por ID
const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nombre', 'email', 'contraseña', 'rol'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }

    updates.forEach(update => usuario[update] = req.body[update]);
    await usuario.save();
    res.send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
};
