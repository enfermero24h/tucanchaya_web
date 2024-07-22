// models/partido.js
const mongoose = require('mongoose');

const partidoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  grupos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grupo' }],
  resultado: { type: String },
  fechaCreacion: { type: Date, default: Date.now }
});

const Partido = mongoose.model('Partido', partidoSchema);

module.exports = Partido;
