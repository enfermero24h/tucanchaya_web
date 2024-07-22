// models/grupo.js
const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  equipos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' }],
  fechaCreacion: { type: Date, default: Date.now }
});

const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = Grupo;
