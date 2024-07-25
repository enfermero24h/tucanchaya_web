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
const partidoServices_1 = __importDefault(require("../../services/Crud/partidoServices"));
class PartidoController {
    crearPartido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partido = yield partidoServices_1.default.crearPartido(req.body);
                res.status(201).json(partido);
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
    obtenerPartidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partidos = yield partidoServices_1.default.obtenerPartidos();
                res.status(200).json(partidos);
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
    obtenerPartidoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partido = yield partidoServices_1.default.obtenerPartidoPorId(req.params.id);
                if (partido) {
                    res.status(200).json(partido);
                }
                else {
                    res.status(404).json({ message: 'Partido no encontrado' });
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
    actualizarPartido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partido = yield partidoServices_1.default.actualizarPartido(req.params.id, req.body);
                if (partido) {
                    res.status(200).json(partido);
                }
                else {
                    res.status(404).json({ message: 'Partido no encontrado' });
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
    eliminarPartido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partido = yield partidoServices_1.default.eliminarPartido(req.params.id);
                if (partido) {
                    res.status(200).json(partido);
                }
                else {
                    res.status(404).json({ message: 'Partido no encontrado' });
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
exports.default = new PartidoController();
