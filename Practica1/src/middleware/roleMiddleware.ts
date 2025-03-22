import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest } from '../types/types';

export const roleMiddleware = (requiredRole: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user?.id);
      if (!user || user.rol !== requiredRole) {
        res.status(403).json({ msg: 'Acceso denegado: permisos insuficientes' }); 
        return;
      }
      next(); 
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
      res.status(500).send('Error en el servidor'); 
    }
  };
};