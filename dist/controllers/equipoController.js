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
// controllers/equipoController.js
const Equipo = require('../models/equipo');
// Crear un nuevo equipo
const crearEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipo = new Equipo(req.body);
        yield equipo.save();
        res.status(201).send(equipo);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Obtener todos los equipos
const obtenerEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield Equipo.find().populate('miembros');
        res.status(200).send(equipos);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Obtener un equipo por ID
const obtenerEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipo = yield Equipo.findById(req.params.id).populate('miembros');
        if (!equipo) {
            return res.status(404).send();
        }
        res.send(equipo);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Actualizar un equipo por ID
const actualizarEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nombre', 'miembros'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }
    try {
        const equipo = yield Equipo.findById(req.params.id);
        if (!equipo) {
            return res.status(404).send();
        }
        updates.forEach(update => equipo[update] = req.body[update]);
        yield equipo.save();
        res.send(equipo);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Eliminar un equipo por ID
const eliminarEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipo = yield Equipo.findByIdAndDelete(req.params.id);
        if (!equipo) {
            return res.status(404).send();
        }
        res.send(equipo);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = {
    crearEquipo,
    obtenerEquipos,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo
};
