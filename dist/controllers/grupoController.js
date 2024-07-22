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
// controllers/grupoController.js
const Grupo = require('../models/grupo');
// Crear un nuevo grupo
const crearGrupo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupo = new Grupo(req.body);
        yield grupo.save();
        res.status(201).send(grupo);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Obtener todos los grupos
const obtenerGrupos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupos = yield Grupo.find().populate('equipos');
        res.status(200).send(grupos);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Obtener un grupo por ID
const obtenerGrupo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupo = yield Grupo.findById(req.params.id).populate('equipos');
        if (!grupo) {
            return res.status(404).send();
        }
        res.send(grupo);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Actualizar un grupo por ID
const actualizarGrupo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nombre', 'equipos'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }
    try {
        const grupo = yield Grupo.findById(req.params.id);
        if (!grupo) {
            return res.status(404).send();
        }
        updates.forEach(update => grupo[update] = req.body[update]);
        yield grupo.save();
        res.send(grupo);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Eliminar un grupo por ID
const eliminarGrupo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupo = yield Grupo.findByIdAndDelete(req.params.id);
        if (!grupo) {
            return res.status(404).send();
        }
        res.send(grupo);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = {
    crearGrupo,
    obtenerGrupos,
    obtenerGrupo,
    actualizarGrupo,
    eliminarGrupo
};
