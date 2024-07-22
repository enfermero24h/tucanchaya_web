// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/Crud/usuarioServices';
import UserModel from '../models/usuario'; // Asegúrate de que el modelo esté exportado

const userService = new UserService(UserModel);

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;
    const newUser = await userService.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userService.update(userId, userData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.delete(userId);
    if (deletedUser) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
