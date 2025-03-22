import express from 'express';
import connectDB from './database';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar
connectDB();

// Middleware
app.use(express.json());

// Usuarios
app.use('/api/users', userRoutes);

// Publicaciones
app.use('/api', postRoutes);

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});