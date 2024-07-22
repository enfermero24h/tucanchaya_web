// src/models/Cancha.ts
import { Schema, model, Document } from 'mongoose';

interface ICancha extends Document {
  nombre: string;
  direccion: string;
  dimensiones: string;
  ciudad: string;
}

const CanchaSchema = new Schema<ICancha>({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  dimensiones: { type: String, required: true },
  ciudad: { type: String, required: true }
});

const Cancha = model<ICancha>('Cancha', CanchaSchema);

export default Cancha;
export { ICancha };
