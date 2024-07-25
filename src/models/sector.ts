import mongoose, { Document, Schema } from 'mongoose';

export interface ISector extends Document {
    nombre: string;
    ubicacion: string;
    descripcion?: string;
    activo: boolean;
    }

    const sectorSchema: Schema = new Schema({
    nombre: { type: String, required: true, unique: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String },
    activo: { type: Boolean, default: true },
    }, { timestamps: true });

export default mongoose.model<ISector>('Sector', sectorSchema);