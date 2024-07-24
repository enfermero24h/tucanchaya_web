import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el documento de usuario
export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  // Agrega otros campos que necesites
}

// Esquema del usuario
const userSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Define otros campos según tus necesidades
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
