"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Equipo.ts
const mongoose_1 = require("mongoose");
const EquipoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    ciudad: { type: String, required: true },
    jugadores: { type: [String], default: [] }
});
const Equipo = (0, mongoose_1.model)('Equipo', EquipoSchema);
exports.default = Equipo;
