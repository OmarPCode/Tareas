import { Response } from 'express';
import { AuthRequest, UserCredentials } from '../types/types'; 
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Registro de usuario
export const register = async (req: AuthRequest, res: Response) => {
  const { nombre, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'El usuario ya existe' });
      return;
    }

    user = new User({ nombre, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Autenticación de usuario
export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body as UserCredentials;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: 'Credenciales inválidas' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: 'Credenciales inválidas' });
      return;
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener usuario autenticado
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ msg: 'No autorizado' });
      return;
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      res.status(404).json({ msg: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Crear usuario
export const createUser = async (req: AuthRequest, res: Response) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const user = new User({ nombre, email, password, rol });
    await user.save();
    res.status(201).json(user); 
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor'); 
  }
};

// Listar usuarios 
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener usuario
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ msg: 'Usuario no encontrado' }); 
      return;
    }
    res.json(user); 
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor'); 
  }
};

// Actualizar usuario
export const updateUser = async (req: AuthRequest, res: Response) => {
  const { nombre, email, rol } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol },
      { new: true }
    ).select('-password');
    if (!user) {
      res.status(404).json({ msg: 'Usuario no encontrado' });
      return;
    }
    res.json(user); 
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor'); 
  }
};


export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ msg: 'Usuario no encontrado' }); 
      return;
    }
    res.json({ msg: 'Usuario eliminado' }); 
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Ocurrió un error inesperado:', err);
    res.status(500).send('Error en el servidor'); 
  }
};
