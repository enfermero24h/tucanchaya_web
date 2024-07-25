"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/CanchaRoutes.ts
const express_1 = require("express");
const canchaController_1 = __importDefault(require("../../controllers/Crud/canchaController"));
const router = (0, express_1.Router)();
router.post('/canchas', canchaController_1.default.crearCancha);
router.get('/canchas', canchaController_1.default.obtenerCanchas);
router.get('/canchas/:id', canchaController_1.default.obtenerCanchaPorId);
router.put('/canchas/:id', canchaController_1.default.actualizarCancha);
router.delete('/canchas/:id', canchaController_1.default.eliminarCancha);
exports.default = router;
