import mongoose, { Document, Schema } from 'mongoose';

export interface IReserva extends Document {
  cancha: mongoose.Types.ObjectId;
  usuario: mongoose.Types.ObjectId;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  precio: number;
}

const reservaSchema: Schema = new Schema({
  cancha: { type: Schema.Types.ObjectId, ref: 'Cancha', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
  precio: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IReserva>('Reserva', reservaSchema);