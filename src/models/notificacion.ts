import mongoose, { Document, Schema } from 'mongoose';

export interface INotificacion extends Document {
  usuario: mongoose.Types.ObjectId;
  tipo: 'partido_proximo' | 'cambio_torneo' | 'resultado_partido';
  contenido: string;
  leida: boolean;
  fechaEnvio: Date;
  torneo?: mongoose.Types.ObjectId;
  partido?: mongoose.Types.ObjectId;
}

const notificacionSchema: Schema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo: { type: String, enum: ['partido_proximo', 'cambio_torneo', 'resultado_partido'], required: true },
  contenido: { type: String, required: true },
  leida: { type: Boolean, default: false },
  fechaEnvio: { type: Date, default: Date.now },
  torneo: { type: Schema.Types.ObjectId, ref: 'Torneo' },
  partido: { type: Schema.Types.ObjectId, ref: 'Partido' }
}, { timestamps: true });

export default mongoose.model<INotificacion>('Notificacion', notificacionSchema);