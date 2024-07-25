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
const canchaServices_1 = __importDefault(require("../../services/Crud/canchaServices"));
class CanchaController {
    crearCancha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancha = yield canchaServices_1.default.crearCancha(req.body);
                res.status(201).json(cancha);
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
    obtenerCanchas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const canchas = yield canchaServices_1.default.obtenerCanchas();
                res.status(200).json(canchas);
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
    obtenerCanchaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancha = yield canchaServices_1.default.obtenerCanchaPorId(req.params.id);
                if (cancha) {
                    res.status(200).json(cancha);
                }
                else {
                    res.status(404).json({ message: 'Cancha no encontrada' });
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
    actualizarCancha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancha = yield canchaServices_1.default.actualizarCancha(req.params.id, req.body);
                if (cancha) {
                    res.status(200).json(cancha);
                }
                else {
                    res.status(404).json({ message: 'Cancha no encontrada' });
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
    eliminarCancha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancha = yield canchaServices_1.default.eliminarCancha(req.params.id);
                if (cancha) {
                    res.status(200).json(cancha);
                }
                else {
                    res.status(404).json({ message: 'Cancha no encontrada' });
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
exports.default = new CanchaController();
