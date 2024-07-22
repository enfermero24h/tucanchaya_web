"use strict";
// models/equipo.js
const mongoose = require('mongoose');
const equipoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    miembros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    fechaCreacion: { type: Date, default: Date.now }
});
const Equipo = mongoose.model('Equipo', equipoSchema);
module.exports = Equipo;
