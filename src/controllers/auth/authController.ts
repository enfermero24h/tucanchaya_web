// src/controllers/authController.ts
import { Request, Response } from 'express';
import AuthService from '../../services/auth/authService';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { user, token } = await AuthService.register(req.body);
            res.status(201).json({ user, token });
        } catch (error) {
            console.error('Registration error:', error);
            if (error instanceof Error) {
            if (error.message === 'User already exists') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
            } else {
            res.status(500).json({ error: 'Unknown error' });
            }
        }
        }
    
        async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.login(email, password);
            res.json({ user, token });
        } catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error) {
            if (error.message === 'Invalid credentials') {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
            } else {
            res.status(500).json({ error: 'Unknown error' });
            }
        }
        }
    }
    
    export default new AuthController();