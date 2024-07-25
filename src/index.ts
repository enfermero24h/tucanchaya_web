// src/server.ts
import express from 'express';
import connectDB from './config/bd';
import asentamientoRoutes from './routes/Crud/asentamientoRoutes';
import canchaRoutes from './routes/Crud/canchaRoutes';
import equipoRoutes from './routes/Crud/equipoRoutes';
import grupoRoutes from './routes/Crud/grupoRoutes';
import partidoRoutes from './routes/Crud/partidoRoutes';
import authRoutes from './routes/auth/authRoutes';

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas Crud 
app.use('/api', partidoRoutes);
app.use('/api', grupoRoutes);
app.use('/api', equipoRoutes);
app.use('/api', canchaRoutes);
app.use('/api', asentamientoRoutes);

//auth
app.use('/api/auth', authRoutes); //autenticacion y registro

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app; // Exportar la aplicación
