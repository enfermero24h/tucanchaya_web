import mongoose, { Document, Schema, Types } from 'mongoose';

interface IPosicion {
  equipo: Types.ObjectId;
  puntos: number;
  partidosJugados: number;
  victorias: number;
  empates: number;
  derrotas: number;
  golesFavor: number;
  golesContra: number;
  diferenciaGoles: number;
  partidosLocal: number;
  partidosVisitante: number;
  victoriasLocal: number;
  victoriasVisitante: number;
  empatesLocal: number;
  empatesVisitante: number;
  derrotasLocal: number;
  derrotasVisitante: number;
  rachaActual: string[]; // 'V' para victoria, 'E' para empate, 'D' para derrota
}

export interface ITorneo extends Document {
  _id: Types.ObjectId;
  nombre: string;
  deporte: string;
  fechaInicio: Date;
  fechaFin: Date;
  equiposParticipantes: Types.ObjectId[];
  canchas: Types.ObjectId[];
  estado: 'planificado' | 'en_curso' | 'finalizado';
  ganador?: Types.ObjectId;
  creador: Types.ObjectId;
  descripcion?: string;
  maxEquipos: number;
  precio?: number;
  tablaPosiciones: IPosicion[];
}

const posicionSchema = new Schema({
  equipo: { type: Schema.Types.ObjectId, ref: 'Equipo' },
  puntos: { type: Number, default: 0 },
  partidosJugados: { type: Number, default: 0 },
  victorias: { type: Number, default: 0 },
  empates: { type: Number, default: 0 },
  derrotas: { type: Number, default: 0 },
  golesFavor: { type: Number, default: 0 },
  golesContra: { type: Number, default: 0 },
  diferenciaGoles: { type: Number, default: 0 },
  partidosLocal: { type: Number, default: 0 },
  partidosVisitante: { type: Number, default: 0 },
  victoriasLocal: { type: Number, default: 0 },
  victoriasVisitante: { type: Number, default: 0 },
  empatesLocal: { type: Number, default: 0 },
  empatesVisitante: { type: Number, default: 0 },
  derrotasLocal: { type: Number, default: 0 },
  derrotasVisitante: { type: Number, default: 0 },
  rachaActual: [{ type: String, enum: ['V', 'E', 'D'] }]
});

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
  precio: { type: Number },
  tablaPosiciones: [posicionSchema]
}, { timestamps: true });

export default mongoose.model<ITorneo>('Torneo', torneoSchema);