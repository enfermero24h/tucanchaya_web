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
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tucanchaya', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});
// Middleware para parsear JSON
app.use(express.json());
// Definir un esquema y modelo de Mongoose
const esquemaEjemplo = new mongoose.Schema({
    nombre: String,
    edad: Number,
});
const ModeloEjemplo = mongoose.model('Ejemplo', esquemaEjemplo);
// Rutas
app.get('/', (req, res) => {
    res.send('Hola, Mundo!');
});
app.post('/agregar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoEjemplo = new ModeloEjemplo(req.body);
    try {
        yield nuevoEjemplo.save();
        res.status(201).send(nuevoEjemplo);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
app.get('/listar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ejemplos = yield ModeloEjemplo.find();
        res.status(200).send(ejemplos);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/`);
});
