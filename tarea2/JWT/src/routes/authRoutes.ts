import { Router } from 'express';
import { login } from '../controllers/authController';
import { getProfile } from '../controllers/profileController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/login', login);

router.get('/profile', authenticateToken, getProfile);

export default router;