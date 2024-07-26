import Pago, { IPago } from '../models/pago';
import Reserva from '../models/reserva';

class PagoService {
  async crearPago(pagoData: Partial<IPago>): Promise<IPago> {
    const pago = new Pago(pagoData);
    await pago.save();

    // Actualizar el estado de la reserva si el pago es completado
    if (pago.estado === 'completado') {
      await Reserva.findByIdAndUpdate(pago.reserva, { estado: 'confirmada' });
    }

    return pago;
  }

  async obtenerPagos(): Promise<IPago[]> {
    return await Pago.find().populate('reserva').populate('usuario');
  }

  async obtenerPagoPorId(id: string): Promise<IPago | null> {
    return await Pago.findById(id).populate('reserva').populate('usuario');
  }

  async actualizarPago(id: string, pagoData: Partial<IPago>): Promise<IPago | null> {
    const pago = await Pago.findByIdAndUpdate(id, pagoData, { new: true });

    if (pago && pago.estado === 'completado') {
      await Reserva.findByIdAndUpdate(pago.reserva, { estado: 'confirmada' });
    }

    return pago;
  }

  async eliminarPago(id: string): Promise<IPago | null> {
    return await Pago.findByIdAndDelete(id);
  }

  async obtenerPagosPorUsuario(usuarioId: string): Promise<IPago[]> {
    return await Pago.find({ usuario: usuarioId }).populate('reserva');
  }

  async obtenerPagosPorReserva(reservaId: string): Promise<IPago[]> {
    return await Pago.find({ reserva: reservaId }).populate('usuario');
  }
}

export default new PagoService();