import mongoose, { Document, Schema } from 'mongoose';

export interface IPartido extends Document {
  _id: mongoose.Types.ObjectId;
  torneo: mongoose.Types.ObjectId;
  equipoLocal: mongoose.Types.ObjectId;
  equipoVisitante: mongoose.Types.ObjectId;
  fecha: Date;
  cancha: mongoose.Types.ObjectId;
  golesLocal?: number;
  golesVisitante?: number;
  estado: 'programado' | 'en_curso' | 'finalizado' | 'cancelado';
}

const partidoSchema: Schema = new Schema({
  torneo: { type: Schema.Types.ObjectId, ref: 'Torneo', required: true },
  equipoLocal: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
  equipoVisitante: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
  fecha: { type: Date, required: true },
  cancha: { type: Schema.Types.ObjectId, ref: 'Cancha', required: true },
  golesLocal: { type: Number },
  golesVisitante: { type: Number },
  estado: { type: String, enum: ['programado', 'en_curso', 'finalizado', 'cancelado'], default: 'programado' }
}, { timestamps: true });

export default mongoose.model<IPartido>('Partido', partidoSchema);