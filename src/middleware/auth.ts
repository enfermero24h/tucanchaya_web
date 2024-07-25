import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario'; // Asegúrate de que la ruta sea correcta

interface TokenPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

export const autenticarUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      throw new Error();
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Por favor autentícate.' });
  }
};

export const autorizarRol = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).send({ error: 'Por favor autentícate.' });
    }

    if (!roles.includes(req.usuario.role)) {
      return res.status(403).send({ error: 'No tienes permiso para realizar esta acción.' });
    }

    next();
  };
};

export const esAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario && req.usuario.role === 'admin') {
    next();
  } else {
    res.status(403).send({ error: 'Se requieren permisos de administrador.' });
  }
};