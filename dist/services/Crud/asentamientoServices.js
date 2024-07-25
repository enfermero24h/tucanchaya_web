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
// src/services/AsentamientoService.ts
const asentamiento_1 = __importDefault(require("../../models/asentamiento"));
class AsentamientoService {
    crearAsentamiento(asentamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const nuevoAsentamiento = new asentamiento_1.default(asentamiento);
            return yield nuevoAsentamiento.save();
        });
    }
    obtenerAsentamientos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield asentamiento_1.default.find().populate('canchaId');
        });
    }
    obtenerAsentamientoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield asentamiento_1.default.findById(id).populate('canchaId');
        });
    }
    actualizarAsentamiento(id, asentamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield asentamiento_1.default.findByIdAndUpdate(id, asentamiento, { new: true }).populate('canchaId');
        });
    }
    eliminarAsentamiento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield asentamiento_1.default.findByIdAndDelete(id).populate('canchaId');
        });
    }
}
exports.default = new AsentamientoService();
