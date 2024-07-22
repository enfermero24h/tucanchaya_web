// src/Crud/grupoServices.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define la interfaz para el documento
export interface IGrupo extends Document {
  nombre: string;
  descripcion: string;
  // Agrega otras propiedades según tus necesidades
}

// Define el esquema del modelo
const GrupoSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true }
  // Define otros campos según tus necesidades
});

// Crea el modelo de Mongoose
const Grupo = mongoose.model<IGrupo>('Grupo', GrupoSchema);

export default Grupo;
