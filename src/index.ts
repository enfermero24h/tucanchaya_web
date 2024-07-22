// src/server.ts
import express from 'express';
import connectDB from './config/bd';
import partidoRoutes from './routes/partidoRoutes';
import grupoRoutes from './routes/grupoRoutes';
import equipoRoutes from './routes/equipoRoutes';
import canchaRoutes from './routes/canchaRoutes';
import asentamientoRoutes from './routes/asentamientoRoutes';

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', partidoRoutes);
app.use('/api', grupoRoutes);
app.use('/api', equipoRoutes);
app.use('/api', canchaRoutes);
app.use('/api', asentamientoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
