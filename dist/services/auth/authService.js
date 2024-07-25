"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/authService.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../../models/usuario"));
class AuthService {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'your_jwt_secret';
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            // Verificar si el usuario ya existe
            const existingUser = yield usuario_1.default.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Hashear la contraseña
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Crear nuevo usuario
            const user = new usuario_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            yield user.save();
            // Crear token
            const token = this.generateToken(user._id.toString());
            return { user, token };
        });
    }
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, this.secret, { expiresIn: '1h' });
    }
}
exports.default = new AuthService();
