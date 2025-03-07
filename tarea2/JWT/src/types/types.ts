import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: { email: string; password: string };
}

export interface UserCredentials {
  email: string;
  password: string;
}