"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/EquipoRoutes.ts
const express_1 = require("express");
const equipoController_1 = __importDefault(require("../../controllers/Crud/equipoController"));
const router = (0, express_1.Router)();
router.post('/equipos', equipoController_1.default.crearEquipo);
router.get('/equipos', equipoController_1.default.obtenerEquipos);
router.get('/equipos/:id', equipoController_1.default.obtenerEquipoPorId);
router.put('/equipos/:id', equipoController_1.default.actualizarEquipo);
router.delete('/equipos/:id', equipoController_1.default.eliminarEquipo);
exports.default = router;
