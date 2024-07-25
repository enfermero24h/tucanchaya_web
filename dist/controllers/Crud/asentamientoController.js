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
const asentamientoServices_1 = __importDefault(require("../../services/Crud/asentamientoServices"));
class AsentamientoController {
    crearAsentamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asentamiento = yield asentamientoServices_1.default.crearAsentamiento(req.body);
                res.status(201).json(asentamiento);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    obtenerAsentamientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asentamientos = yield asentamientoServices_1.default.obtenerAsentamientos();
                res.status(200).json(asentamientos);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    obtenerAsentamientoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asentamiento = yield asentamientoServices_1.default.obtenerAsentamientoPorId(req.params.id);
                if (asentamiento) {
                    res.status(200).json(asentamiento);
                }
                else {
                    res.status(404).json({ message: 'Asentamiento no encontrado' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    actualizarAsentamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asentamiento = yield asentamientoServices_1.default.actualizarAsentamiento(req.params.id, req.body);
                if (asentamiento) {
                    res.status(200).json(asentamiento);
                }
                else {
                    res.status(404).json({ message: 'Asentamiento no encontrado' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    eliminarAsentamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asentamiento = yield asentamientoServices_1.default.eliminarAsentamiento(req.params.id);
                if (asentamiento) {
                    res.status(200).json(asentamiento);
                }
                else {
                    res.status(404).json({ message: 'Asentamiento no encontrado' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.default = new AsentamientoController();
