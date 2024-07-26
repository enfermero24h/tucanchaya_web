import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITorneo extends Document {
  _id: Types.ObjectId;
  nombre: string;
  deporte: string;
  fechaInicio: Date;
  fechaFin: Date;
  equiposParticipantes: mongoose.Types.ObjectId[];
  canchas: mongoose.Types.ObjectId[];
  estado: 'planificado' | 'en_curso' | 'finalizado';
  ganador?: mongoose.Types.ObjectId;
  creador: mongoose.Types.ObjectId;
  descripcion?: string;
  maxEquipos: number;
  precio?: number;
}

const torneoSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  deporte: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  equiposParticipantes: [{ type: Schema.Types.ObjectId, ref: 'Equipo' }],
  canchas: [{ type: Schema.Types.ObjectId, ref: 'Cancha' }],
  estado: { type: String, enum: ['planificado', 'en_curso', 'finalizado'], default: 'planificado' },
  ganador: { type: Schema.Types.ObjectId, ref: 'Equipo' },
  creador: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  descripcion: { type: String },
  maxEquipos: { type: Number, required: true },
  precio: { type: Number }
}, { timestamps: true });

export default mongoose.model<ITorneo>('Torneo', torneoSchema);