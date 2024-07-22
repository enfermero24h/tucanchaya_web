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
// controllers/canchaController.js
const Cancha = require('../models/cancha');
// Crear una nueva cancha
const crearCancha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancha = new Cancha(req.body);
        yield cancha.save();
        res.status(201).send(cancha);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Obtener todas las canchas
const obtenerCanchas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const canchas = yield Cancha.find();
        res.status(200).send(canchas);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Obtener una cancha por ID
const obtenerCancha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancha = yield Cancha.findById(req.params.id);
        if (!cancha) {
            return res.status(404).send();
        }
        res.send(cancha);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Actualizar una cancha por ID
const actualizarCancha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nombre', 'direccion', 'dimensiones', 'ciudad'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }
    try {
        const cancha = yield Cancha.findById(req.params.id);
        if (!cancha) {
            return res.status(404).send();
        }
        updates.forEach(update => cancha[update] = req.body[update]);
        yield cancha.save();
        res.send(cancha);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Eliminar una cancha por ID
const eliminarCancha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancha = yield Cancha.findByIdAndDelete(req.params.id);
        if (!cancha) {
            return res.status(404).send();
        }
        res.send(cancha);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = {
    crearCancha,
    obtenerCanchas,
    obtenerCancha,
    actualizarCancha,
    eliminarCancha
};
