import { Express } from 'express';
import asentamientoRoutes from './routes/Crud/asentamientoRoutes';
import canchaRoutes from './routes/Crud/canchaRoutes';
import equipoRoutes from './routes/Crud/equipoRoutes';
import grupoRoutes from './routes/Crud/grupoRoutes';
import reservaRoutes from './routes/Crud/reservaRoutes';
import sectorRoutes from './routes/Crud/sectorRoutes';
import authRoutes from './routes/auth/authRoutes';
import disponibilidadCanchaRoutes from './routes/disponibilidadCanchaRoutes';
import estadisticaRoutes from './routes/estadisticaRoutes';
import notificacionRoutes from './routes/notificacionRoutes';
import pagoRoutes from './routes/pagoRoutes';
import partidoRoutes from './routes/partidoRoutes';
import torneoRoutes from './routes/torneoRoutes';

export default function setupRoutes(app: Express) {
  // Rutas Crud
    app.use('/api/grupo', grupoRoutes);
    app.use('/api/equipo', equipoRoutes);
    app.use('/api/cancha', canchaRoutes);
    app.use('/api/asentamiento', asentamientoRoutes);
    app.use('/api/sectores', sectorRoutes);
    app.use('/api/reservas', reservaRoutes);


    // Auth
    app.use('/api/auth', authRoutes);

    // Disponibilidad de la cancha
    app.use('/api/disponibilidad', disponibilidadCanchaRoutes);

    //pagos
    app.use('/api/pagos', pagoRoutes);

    //torneo
    app.use('/api/torneos', torneoRoutes);

    //partidos
    app.use('/api/partidos', partidoRoutes);

    //notificaciones
    app.use('/api/notificaciones', notificacionRoutes);

    //estadisticas 
    app.use('/api/estadisticas', estadisticaRoutes);
}