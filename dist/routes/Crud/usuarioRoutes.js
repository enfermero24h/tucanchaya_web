"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../../controllers/Crud/usuarioController"));
const router = (0, express_1.Router)();
router.get('/users', usuarioController_1.default.getUsers);
router.get('/users/:id', usuarioController_1.default.getUserById);
router.post('/users', usuarioController_1.default.createUser);
router.put('/users/:id', usuarioController_1.default.updateUser);
router.delete('/users/:id', usuarioController_1.default.deleteUser);
exports.default = router;
