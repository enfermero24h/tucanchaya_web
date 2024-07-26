import { Request, Response } from 'express';
import PagoService from '../services/pagoService';

class PagoController {
    async crearPago(req: Request, res: Response) {
        try {
        const pago = await PagoService.crearPago(req.body);
        res.status(201).json(pago);
        } catch (error) {
        res.status(400).json({ message: 'Error al crear el pago', error });
        }
    }

    async obtenerPagos(req: Request, res: Response) {
        try {
        const pagos = await PagoService.obtenerPagos();
        res.json(pagos);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pagos', error });
        }
    }

    async obtenerPagoPorId(req: Request, res: Response) {
        try {
        const pago = await PagoService.obtenerPagoPorId(req.params.id);
        if (pago) {
            res.json(pago);
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pago', error });
        }
    }

    async actualizarPago(req: Request, res: Response) {
        try {
        const pago = await PagoService.actualizarPago(req.params.id, req.body);
        if (pago) {
            res.json(pago);
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pago', error });
        }
    }

    async eliminarPago(req: Request, res: Response) {
        try {
        const pago = await PagoService.eliminarPago(req.params.id);
        if (pago) {
            res.json({ message: 'Pago eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
        } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pago', error });
        }
    }

    async obtenerPagosPorUsuario(req: Request, res: Response) {
        try {
        const pagos = await PagoService.obtenerPagosPorUsuario(req.params.usuarioId);
        res.json(pagos);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pagos del usuario', error });
        }
    }

    async obtenerPagosPorReserva(req: Request, res: Response) {
        try {
        const pagos = await PagoService.obtenerPagosPorReserva(req.params.reservaId);
        res.json(pagos);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pagos de la reserva', error });
        }
    }
}

export default new PagoController();