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
// src/services/PartidoService.ts
const partido_1 = __importDefault(require("../../models/partido"));
class PartidoService {
    crearPartido(partido) {
        return __awaiter(this, void 0, void 0, function* () {
            const nuevoPartido = new partido_1.default(partido);
            return yield nuevoPartido.save();
        });
    }
    obtenerPartidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield partido_1.default.find();
        });
    }
    obtenerPartidoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield partido_1.default.findById(id);
        });
    }
    actualizarPartido(id, partido) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield partido_1.default.findByIdAndUpdate(id, partido, { new: true });
        });
    }
    eliminarPartido(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield partido_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new PartidoService();
