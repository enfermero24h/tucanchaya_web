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

app.post('/agregar', async (req, res) => {
  const nuevoEjemplo = new ModeloEjemplo(req.body);
  try {
    await nuevoEjemplo.save();
    res.status(201).send(nuevoEjemplo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/listar', async (req, res) => {
  try {
    const ejemplos = await ModeloEjemplo.find();
    res.status(200).send(ejemplos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
