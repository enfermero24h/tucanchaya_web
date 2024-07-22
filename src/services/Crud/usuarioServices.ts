// src/services/userService.ts
import { Model, Document } from 'mongoose';
import { User } from '../../models/usuario'; // Asegúrate de que el modelo User esté definido y exportado

export class UserService {
  private model: Model<User & Document>;

  constructor(model: Model<User & Document>) {
    this.model = model;
  }

  async getAll(): Promise<User[]> {
    return this.model.find().exec();
  }

  async getById(id: string): Promise<User | null> {
    return this.model.findById(id).exec();
  }

  async create(data: User): Promise<User> {
    const newUser = new this.model(data);
    return newUser.save();
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
