import { Request, Response } from 'express';
import ReservaService from '../../services/Crud/reservaService';

class ReservaController {
    async crearReserva(req: Request, res: Response) {
        try {
        const reserva = await ReservaService.crearReserva(req.body);
        res.status(201).json(reserva);
        } catch (error) {
        res.status(400).json({ message: 'Error al crear la reserva', error });
        }
    }

    async obtenerReservas(req: Request, res: Response) {
        try {
        const reservas = await ReservaService.obtenerReservas();
        res.json(reservas);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas', error });
        }
    }

    async obtenerReservaPorId(req: Request, res: Response) {
        try {
        const reserva = await ReservaService.obtenerReservaPorId(req.params.id);
        if (reserva) {
            res.json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reserva', error });
        }
    }

    async actualizarReserva(req: Request, res: Response) {
        try {
        const reserva = await ReservaService.actualizarReserva(req.params.id, req.body);
        if (reserva) {
            res.json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reserva', error });
        }
    }

    async cancelarReserva(req: Request, res: Response) {
        try {
        const reserva = await ReservaService.cancelarReserva(req.params.id);
        if (reserva) {
            res.json({ message: 'Reserva cancelada con éxito', reserva });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al cancelar la reserva', error });
        }
    }

    async obtenerReservasPorUsuario(req: Request, res: Response) {
        try {
        const reservas = await ReservaService.obtenerReservasPorUsuario(req.params.usuarioId);
        res.json(reservas);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas del usuario', error });
        }
    }

    async obtenerReservasPorCancha(req: Request, res: Response) {
        try {
        const reservas = await ReservaService.obtenerReservasPorCancha(req.params.canchaId);
        res.json(reservas);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas de la cancha', error });
        }
    }
    }

    export default new ReservaController();