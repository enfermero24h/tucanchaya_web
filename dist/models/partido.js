"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Partido.ts
const mongoose_1 = require("mongoose");
const PartidoSchema = new mongoose_1.Schema({
    equipoLocal: { type: String, required: true },
    equipoVisitante: { type: String, required: true },
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    marcador: {
        local: { type: Number, default: 0 },
        visitante: { type: Number, default: 0 }
    }
});
const Partido = (0, mongoose_1.model)('Partido', PartidoSchema);
exports.default = Partido;
