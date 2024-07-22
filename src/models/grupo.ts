// src/models/Grupo.ts
import { Schema, model, Document } from 'mongoose';

interface IGrupo extends Document {
  nombre: string;
  descripcion: string;
  miembros: string[];
}

const GrupoSchema = new Schema<IGrupo>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  miembros: { type: [String], default: [] }
});

const Grupo = model<IGrupo>('Grupo', GrupoSchema);

export default Grupo;
export { IGrupo };
