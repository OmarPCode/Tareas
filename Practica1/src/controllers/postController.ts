import { Request, Response } from 'express';
import { AuthRequest } from '../types/types';
import Post from '../models/Post';

// Crear publicación
export const createPost = async (req: AuthRequest, res: Response) => {
  const { titulo, contenido } = req.body;

  try {
    const post = new Post({ titulo, contenido, autor: req.user?.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Listar publicaciones
export const getAllPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find().populate('autor', ['nombre', 'email']);
    res.json(posts);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor');
  }
};