import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserCredentials } from '../types/types';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body as UserCredentials;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const token = jwt.sign({ email, password }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};