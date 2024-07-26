import mongoose, { Document, Schema } from 'mongoose';

export interface IEstadistica extends Document {
  torneo: mongoose.Types.ObjectId;
  equipo: mongoose.Types.ObjectId;
  jugador: mongoose.Types.ObjectId;
  partido: mongoose.Types.ObjectId;
  goles: number;
  asistencias: number;
  tarjetasAmarillas: number;
  tarjetasRojas: number;
  minutosJugados: number;
}

const estadisticaSchema: Schema = new Schema({
  torneo: { type: Schema.Types.ObjectId, ref: 'Torneo', required: true },
  equipo: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
  jugador: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  partido: { type: Schema.Types.ObjectId, ref: 'Partido', required: true },
  goles: { type: Number, default: 0 },
  asistencias: { type: Number, default: 0 },
  tarjetasAmarillas: { type: Number, default: 0 },
  tarjetasRojas: { type: Number, default: 0 },
  minutosJugados: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IEstadistica>('Estadistica', estadisticaSchema);