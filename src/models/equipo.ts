// src/models/Equipo.ts
import { Schema, model, Document } from 'mongoose';

interface IEquipo extends Document {
  nombre: string;
  ciudad: string;
  jugadores: string[];
}

const EquipoSchema = new Schema<IEquipo>({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  jugadores: { type: [String], default: [] }
});

const Equipo = model<IEquipo>('Equipo', EquipoSchema);

export default Equipo;
export { IEquipo };
