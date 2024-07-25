"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Cancha.ts
const mongoose_1 = require("mongoose");
const CanchaSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    dimensiones: { type: String, required: true },
    ciudad: { type: String, required: true }
});
const Cancha = (0, mongoose_1.model)('Cancha', CanchaSchema);
exports.default = Cancha;
