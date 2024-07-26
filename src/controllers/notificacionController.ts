import { Request, Response } from 'express';
import NotificacionService from '../services/notificacionService';

class NotificacionController {
  async obtenerNotificacionesPorUsuario(req: Request, res: Response) {
    try {
      const notificaciones = await NotificacionService.obtenerNotificacionesPorUsuario(req.usuario._id);
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las notificaciones' });
    }
  }

  async marcarComoLeida(req: Request, res: Response) {
    try {
      const notificacion = await NotificacionService.marcarComoLeida(req.params.id);
      if (notificacion) {
        res.json(notificacion);
      } else {
        res.status(404).json({ message: 'Notificación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al marcar la notificación como leída'});
    }
  }
}

export default new NotificacionController();