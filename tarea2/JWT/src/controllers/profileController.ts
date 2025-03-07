import { AuthRequest } from '../types/types';
import { Response } from 'express';

export const getProfile = (req: AuthRequest, res: Response) => {
  const user = req.user;
  res.json(user);
};