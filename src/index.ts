// src/index.ts

import express from 'express';
import connectDB from './config/bd';
import setupRoutes from './routes';

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Configurar rutas
setupRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app; // Exportar la aplicación