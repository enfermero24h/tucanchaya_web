"use strict";
// models/cancha.js
const mongoose = require('mongoose');
const canchaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    dimensiones: { type: String, required: true },
    ciudad: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});
const Cancha = mongoose.model('Cancha', canchaSchema);
module.exports = Cancha;
