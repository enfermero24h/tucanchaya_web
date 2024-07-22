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
// controllers/partidoController.js
const Partido = require('../models/partido');
// Crear un nuevo partido
const crearPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = new Partido(req.body);
        yield partido.save();
        res.status(201).send(partido);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Obtener todos los partidos
const obtenerPartidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield Partido.find().populate('grupos');
        res.status(200).send(partidos);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Obtener un partido por ID
const obtenerPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = yield Partido.findById(req.params.id).populate('grupos');
        if (!partido) {
            return res.status(404).send();
        }
        res.send(partido);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Actualizar un partido por ID
const actualizarPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fecha', 'ubicacion', 'grupos', 'resultado'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }
    try {
        const partido = yield Partido.findById(req.params.id);
        if (!partido) {
            return res.status(404).send();
        }
        updates.forEach(update => partido[update] = req.body[update]);
        yield partido.save();
        res.send(partido);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Eliminar un partido por ID
const eliminarPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = yield Partido.findByIdAndDelete(req.params.id);
        if (!partido) {
            return res.status(404).send();
        }
        res.send(partido);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = {
    crearPartido,
    obtenerPartidos,
    obtenerPartido,
    actualizarPartido,
    eliminarPartido
};
