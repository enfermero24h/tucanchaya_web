// services/disponibilidadCanchaService.ts

import Cancha from '../models/cancha';
import Reserva from '../models/reserva';

class DisponibilidadCanchaService {
    async verificarDisponibilidad(canchaId: string, fechaInicio: Date, fechaFin: Date): Promise<boolean> {
        const reservasExistentes = await Reserva.find({
        cancha: canchaId,
        $or: [
            { fechaInicio: { $lt: fechaFin }, fechaFin: { $gt: fechaInicio } },
            { fechaInicio: { $gte: fechaInicio, $lt: fechaFin } },
            { fechaFin: { $gt: fechaInicio, $lte: fechaFin } }
        ],
        estado: { $ne: 'cancelada' }
        });

        return reservasExistentes.length === 0;
    }

    async obtenerHorariosDisponibles(canchaId: string, fecha: Date): Promise<{ inicio: Date; fin: Date }[]> {
        const cancha = await Cancha.findById(canchaId);
        if (!cancha) {
        throw new Error('Cancha no encontrada');
        }

        const horaInicio = new Date(fecha);
        horaInicio.setHours(cancha.horaApertura, 0, 0, 0);

        const horaCierre = new Date(fecha);
        horaCierre.setHours(cancha.horaCierre, 0, 0, 0);

        const reservas = await Reserva.find({
        cancha: canchaId,
        fechaInicio: { $gte: horaInicio, $lt: horaCierre },
        estado: { $ne: 'cancelada' }
        }).sort('fechaInicio');

        const horariosDisponibles: { inicio: Date; fin: Date }[] = [];
        let horaActual = new Date(horaInicio);

        for (const reserva of reservas) {
        if (horaActual < reserva.fechaInicio) {
            horariosDisponibles.push({ inicio: new Date(horaActual), fin: new Date(reserva.fechaInicio) });
        }
        horaActual = new Date(reserva.fechaFin);
        }

        if (horaActual < horaCierre) {
        horariosDisponibles.push({ inicio: new Date(horaActual), fin: new Date(horaCierre) });
        }

        return horariosDisponibles;
    }

    async validarReserva(canchaId: string, fechaInicio: Date, fechaFin: Date, usuarioId: string): Promise<{ esValida: boolean; mensaje?: string }> {
        // Verificar disponibilidad
        const disponible = await this.verificarDisponibilidad(canchaId, fechaInicio, fechaFin);
        if (!disponible) {
        return { esValida: false, mensaje: 'La cancha no está disponible en el horario seleccionado' };
        }

        // Verificar que la cancha existe
        const cancha = await Cancha.findById(canchaId);
        if (!cancha) {
        return { esValida: false, mensaje: 'La cancha no existe' };
        }

        // Verificar que la reserva está dentro del horario de operación
        if (fechaInicio.getHours() < cancha.horaApertura || fechaFin.getHours() > cancha.horaCierre) {
        return { esValida: false, mensaje: 'La reserva está fuera del horario de operación de la cancha' };
        }

        // Verificar que la duración de la reserva es válida
        const duracionMinutos = (fechaFin.getTime() - fechaInicio.getTime()) / 60000;
        if (duracionMinutos < cancha.duracionMinimaReserva || duracionMinutos > cancha.duracionMaximaReserva) {
        return { esValida: false, mensaje: 'La duración de la reserva no es válida' };
        }

        // Aquí puedes agregar más validaciones según tus requisitos

        return { esValida: true };
    }
    }

    export default new DisponibilidadCanchaService();