"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Asentamiento.ts
const mongoose_1 = require("mongoose");
const AsentamientoSchema = new mongoose_1.Schema({
    canchaId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Cancha', required: true },
    fecha: { type: Date, required: true },
    estado: { type: String, enum: ['disponible', 'ocupado'], default: 'disponible' }
});
const Asentamiento = (0, mongoose_1.model)('Asentamiento', AsentamientoSchema);
exports.default = Asentamiento;
