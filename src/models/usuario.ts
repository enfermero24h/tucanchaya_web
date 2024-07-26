// src/models/usuario.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'usuario' | 'admin' | 'staff';
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['usuario', 'admin', 'staff'], default: 'usuario' },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
