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
// controllers/asentamientoController.js
const Asentamiento = require('../models/asentamiento');
// Crear un nuevo asentamiento
const crearAsentamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asentamiento = new Asentamiento(req.body);
        yield asentamiento.save();
        res.status(201).send(asentamiento);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Obtener todos los asentamientos
const obtenerAsentamientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asentamientos = yield Asentamiento.find().populate('cancha');
        res.status(200).send(asentamientos);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Obtener un asentamiento por ID
const obtenerAsentamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asentamiento = yield Asentamiento.findById(req.params.id).populate('cancha');
        if (!asentamiento) {
            return res.status(404).send();
        }
        res.send(asentamiento);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Actualizar un asentamiento por ID
const actualizarAsentamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fecha', 'cancha', 'descripcion'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }
    try {
        const asentamiento = yield Asentamiento.findById(req.params.id);
        if (!asentamiento) {
            return res.status(404).send();
        }
        updates.forEach(update => asentamiento[update] = req.body[update]);
        yield asentamiento.save();
        res.send(asentamiento);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Eliminar un asentamiento por ID
const eliminarAsentamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asentamiento = yield Asentamiento.findByIdAndDelete(req.params.id);
        if (!asentamiento) {
            return res.status(404).send();
        }
        res.send(asentamiento);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = {
    crearAsentamiento,
    obtenerAsentamientos,
    obtenerAsentamiento,
    actualizarAsentamiento,
    eliminarAsentamiento
};
