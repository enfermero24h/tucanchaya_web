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
const grupoServices_1 = __importDefault(require("../../services/Crud/grupoServices"));
class GrupoController {
    crearGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield grupoServices_1.default.crearGrupo(req.body);
                res.status(201).json(grupo);
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
    obtenerGrupos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupos = yield grupoServices_1.default.obtenerGrupos();
                res.status(200).json(grupos);
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
    obtenerGrupoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield grupoServices_1.default.obtenerGrupoPorId(req.params.id);
                if (grupo) {
                    res.status(200).json(grupo);
                }
                else {
                    res.status(404).json({ message: 'Grupo no encontrado' });
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
    actualizarGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield grupoServices_1.default.actualizarGrupo(req.params.id, req.body);
                if (grupo) {
                    res.status(200).json(grupo);
                }
                else {
                    res.status(404).json({ message: 'Grupo no encontrado' });
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
    eliminarGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield grupoServices_1.default.eliminarGrupo(req.params.id);
                if (grupo) {
                    res.status(200).json(grupo);
                }
                else {
                    res.status(404).json({ message: 'Grupo no encontrado' });
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
exports.default = new GrupoController();
