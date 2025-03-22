import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/types'; 

dotenv.config();

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'No hay token, autorización denegada' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user: { id: string; rol?: string } };
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

export default authMiddleware;