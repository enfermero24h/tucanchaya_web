// src/models/Asentamiento.ts
import { Schema, model, Document } from 'mongoose';

interface IAsentamiento extends Document {
  canchaId: Number;
  fecha: Date;
  estado: string;
}

const AsentamientoSchema = new Schema<IAsentamiento>({
  canchaId: { type: Schema.Types.ObjectId, ref: 'Cancha', required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, enum: ['disponible', 'ocupado'], default: 'disponible' }
});

const Asentamiento = model<IAsentamiento>('Asentamiento', AsentamientoSchema);

export default Asentamiento;
export { IAsentamiento };
