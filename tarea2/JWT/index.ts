import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes'; // Importa las rutas de autenticación
import { swaggerUi, specs } from './swagger.config'; // Opcional: Si usas Swagger

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Usa las rutas de autenticación
app.use('/api', authRoutes);

// Configura Swagger (opcional)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});