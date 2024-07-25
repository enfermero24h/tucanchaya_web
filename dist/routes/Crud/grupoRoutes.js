"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/GrupoRoutes.ts
const express_1 = require("express");
const grupoController_1 = __importDefault(require("../../controllers/Crud/grupoController"));
const router = (0, express_1.Router)();
router.post('/grupos', grupoController_1.default.crearGrupo);
router.get('/grupos', grupoController_1.default.obtenerGrupos);
router.get('/grupos/:id', grupoController_1.default.obtenerGrupoPorId);
router.put('/grupos/:id', grupoController_1.default.actualizarGrupo);
router.delete('/grupos/:id', grupoController_1.default.eliminarGrupo);
exports.default = router;
