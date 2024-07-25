// controllers/disponibilidadCanchaController.ts

import { Request, Response } from 'express';
import DisponibilidadCanchaService from '../services/disponibilidadCanchaService';

class DisponibilidadCanchaController {
  async verificarDisponibilidad(req: Request, res: Response) {
    try {
      const { canchaId, fechaInicio, fechaFin } = req.body;
      const disponible = await DisponibilidadCanchaService.verificarDisponibilidad(
        canchaId,
        new Date(fechaInicio),
        new Date(fechaFin)
      );
      res.json({ disponible });
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar disponibilidad', error });
    }
  }

  async obtenerHorariosDisponibles(req: Request, res: Response) {
    try {
      const { canchaId, fecha } = req.params;
      const horarios = await DisponibilidadCanchaService.obtenerHorariosDisponibles(
        canchaId,
        new Date(fecha)
      );
      res.json(horarios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener horarios disponibles', error });
    }
  }

  async validarReserva(req: Request, res: Response) {
    try {
      const { canchaId, fechaInicio, fechaFin, usuarioId } = req.body;
      const resultado = await DisponibilidadCanchaService.validarReserva(
        canchaId,
        new Date(fechaInicio),
        new Date(fechaFin),
        usuarioId
      );
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: 'Error al validar la reserva', error });
    }
  }
}

export default new DisponibilidadCanchaController();