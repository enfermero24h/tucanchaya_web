// src/models/user.ts
import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string; // Asegúrate de usar hashing y seguridad para contraseñas
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<User>('User', userSchema);
