import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Rutas con autenticación
router.post('/publicaciones', authMiddleware, createPost);
router.get('/publicaciones', authMiddleware, getAllPosts);

export default router;