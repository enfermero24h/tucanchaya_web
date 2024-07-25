import Reserva, { IReserva } from '../../models/reserva';

class ReservaService {
    async crearReserva(reservaData: Partial<IReserva>): Promise<IReserva> {
        const reserva = new Reserva(reservaData);
        return await reserva.save();
    }

    async obtenerReservas(): Promise<IReserva[]> {
        return await Reserva.find().populate('cancha').populate('usuario');
    }

    async obtenerReservaPorId(id: string): Promise<IReserva | null> {
        return await Reserva.findById(id).populate('cancha').populate('usuario');
    }

    async actualizarReserva(id: string, reservaData: Partial<IReserva>): Promise<IReserva | null> {
        return await Reserva.findByIdAndUpdate(id, reservaData, { new: true });
    }

    async cancelarReserva(id: string): Promise<IReserva | null> {
        return await Reserva.findByIdAndUpdate(id, { estado: 'cancelada' }, { new: true });
    }

    async obtenerReservasPorUsuario(usuarioId: string): Promise<IReserva[]> {
        return await Reserva.find({ usuario: usuarioId }).populate('cancha');
    }

    async obtenerReservasPorCancha(canchaId: string): Promise<IReserva[]> {
        return await Reserva.find({ cancha: canchaId }).populate('usuario');
    }
}

export default new ReservaService();