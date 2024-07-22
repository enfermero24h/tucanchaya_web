"use strict";
// models/asentamiento.js
const mongoose = require('mongoose');
const asentamientoSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    cancha: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancha', required: true },
    grupo: { type: mongoose.Schema.Types.ObjectId, ref: 'Grupo', required: true },
    estado: { type: String, default: 'pendiente' },
    fechaCreacion: { type: Date, default: Date.now }
});
const Asentamiento = mongoose.model('Asentamiento', asentamientoSchema);
module.exports = Asentamiento;
