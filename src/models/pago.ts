import mongoose, { Document, Schema } from 'mongoose';

export interface IPago extends Document {
  reserva: mongoose.Types.ObjectId;
  usuario: mongoose.Types.ObjectId;
  monto: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
  estado: 'pendiente' | 'completado' | 'fallido';
  fechaPago: Date;
  referencia?: string;
}

const pagoSchema: Schema = new Schema({
  reserva: { type: Schema.Types.ObjectId, ref: 'Reserva', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  monto: { type: Number, required: true },
  metodoPago: { type: String, enum: ['efectivo', 'tarjeta', 'transferencia'], required: true },
  estado: { type: String, enum: ['pendiente', 'completado', 'fallido'], default: 'pendiente' },
  fechaPago: { type: Date, default: Date.now },
  referencia: { type: String }
}, { timestamps: true });

export default mongoose.model<IPago>('Pago', pagoSchema);