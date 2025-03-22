import express from 'express';
import { register, login, getProfile } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } from '../controllers/userController';
  import { roleMiddleware } from '../middleware/roleMiddleware';

const router = express.Router();

// Registro de usuario
router.post('/registro', register);

// Autenticación de usuario
router.post('/login', login);

// Obtener perfil del usuario 
router.get('/perfil', authMiddleware, getProfile);


// Rutas
router.post('/usuarios', authMiddleware, roleMiddleware('admin'), createUser);
router.get('/usuarios', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.get('/usuarios/:id', authMiddleware, roleMiddleware('admin'), getUserById);
router.put('/usuarios/:id', authMiddleware, roleMiddleware('admin'), updateUser);
router.delete('/usuarios/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

export default router;
