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
const equipoServices_1 = __importDefault(require("../../services/Crud/equipoServices"));
class EquipoController {
    crearEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = yield equipoServices_1.default.crearEquipo(req.body);
                res.status(201).json(equipo);
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
    obtenerEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipos = yield equipoServices_1.default.obtenerEquipos();
                res.status(200).json(equipos);
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
    obtenerEquipoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = yield equipoServices_1.default.obtenerEquipoPorId(req.params.id);
                if (equipo) {
                    res.status(200).json(equipo);
                }
                else {
                    res.status(404).json({ message: 'Equipo no encontrado' });
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
    actualizarEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = yield equipoServices_1.default.actualizarEquipo(req.params.id, req.body);
                if (equipo) {
                    res.status(200).json(equipo);
                }
                else {
                    res.status(404).json({ message: 'Equipo no encontrado' });
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
    eliminarEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = yield equipoServices_1.default.eliminarEquipo(req.params.id);
                if (equipo) {
                    res.status(200).json(equipo);
                }
                else {
                    res.status(404).json({ message: 'Equipo no encontrado' });
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
exports.default = new EquipoController();
