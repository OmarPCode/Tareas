import { Request } from 'express';

// Interfaz extendida para solicitudes con datos de autenticación
export interface AuthRequest extends Request {
  user?: {
    id: string;
    rol?: string;
  };
}

// Interfaz para las credenciales de usuario (login y registro)
export interface UserCredentials {
  email: string;
  password: string;
}