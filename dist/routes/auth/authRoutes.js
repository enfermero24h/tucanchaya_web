"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = __importDefault(require("../../controllers/auth/authController"));
const router = (0, express_1.Router)();
router.post('/register', authController_1.default.register);
exports.default = router;
