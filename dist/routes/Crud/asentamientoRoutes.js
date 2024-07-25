"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/AsentamientoRoutes.ts
const express_1 = require("express");
const asentamientoController_1 = __importDefault(require("../../controllers/Crud/asentamientoController"));
const router = (0, express_1.Router)();
router.post('/asentamientos', asentamientoController_1.default.crearAsentamiento);
router.get('/asentamientos', asentamientoController_1.default.obtenerAsentamientos);
router.get('/asentamientos/:id', asentamientoController_1.default.obtenerAsentamientoPorId);
router.put('/asentamientos/:id', asentamientoController_1.default.actualizarAsentamiento);
router.delete('/asentamientos/:id', asentamientoController_1.default.eliminarAsentamiento);
exports.default = router;
