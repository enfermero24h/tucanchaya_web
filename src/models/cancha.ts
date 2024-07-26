// src/models/Cancha.ts
import { Document, Schema, Types, model } from 'mongoose';

interface ICancha extends Document {
  _id: Types.ObjectId;
  nombre: string;
  direccion: string;
  dimensiones: string;
  ciudad: string;
  horaApertura: number;
  horaCierre: number;
  duracionMinimaReserva: number;
  duracionMaximaReserva: number;
}

const CanchaSchema = new Schema<ICancha>({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  dimensiones: { type: String, required: true },
  ciudad: { type: String, required: true },
  horaApertura:  { type: Number, required: true },
  horaCierre: { type: Number, required: true },
  duracionMinimaReserva: { type: Number, required: true },
  duracionMaximaReserva: { type: Number, required: true },
});

const Cancha = model<ICancha>('Cancha', CanchaSchema);

export default Cancha;
export { ICancha };
