// src/models/Partido.ts
import { Schema, model, Document } from 'mongoose';

interface IPartido extends Document {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: Date;
  lugar: string;
  marcador?: {
    local: number;
    visitante: number;
  };
}

const PartidoSchema = new Schema<IPartido>({
  equipoLocal: { type: String, required: true },
  equipoVisitante: { type: String, required: true },
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true },
  marcador: {
    local: { type: Number, default: 0 },
    visitante: { type: Number, default: 0 }
  }
});

const Partido = model<IPartido>('Partido', PartidoSchema);

export default Partido;
export { IPartido };
