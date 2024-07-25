"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/PartidoRoutes.ts
const express_1 = require("express");
const partidoController_1 = __importDefault(require("../../controllers/Crud/partidoController"));
const router = (0, express_1.Router)();
router.post('/partidos', partidoController_1.default.crearPartido);
router.get('/partidos', partidoController_1.default.obtenerPartidos);
router.get('/partidos/:id', partidoController_1.default.obtenerPartidoPorId);
router.put('/partidos/:id', partidoController_1.default.actualizarPartido);
router.delete('/partidos/:id', partidoController_1.default.eliminarPartido);
exports.default = router;
