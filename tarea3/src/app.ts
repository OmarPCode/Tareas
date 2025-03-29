import express, { Express, Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback, diskStorage } from 'multer';
import path from 'path';
import fs from 'fs';
import { engine } from 'express-handlebars';
import { UploadedFile, GalleryViewData, UploadViewData, MulterRequest } from './types';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

// Configuración de Handlebars (versión corregida)
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Multer
const storage = diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void = 
  (req, file, cb) => {
    const validTypes = /jpeg|jpg|png/;
    const mimetypeValid = validTypes.test(file.mimetype);
    const extnameValid = validTypes.test(path.extname(file.originalname).toLowerCase());
    
    mimetypeValid && extnameValid ? cb(null, true) : cb(new Error('Error: Solo se permiten archivos JPG o PNG.'));
  };

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Rutas mejoradas
app.get('/', (req: Request, res: Response) => {
  res.render('home'); // Muestra la página de inicio directamente
});

app.get('/upload', (req: Request, res: Response) => {
  res.render('upload', { error: undefined } as UploadViewData);
});

app.post('/upload', upload.single('image'), (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).render('upload', { 
      error: 'No se seleccionó ningún archivo o el archivo no es válido.' 
    } as UploadViewData);
  }
  res.redirect('/gallery');
});

app.get('/gallery', (req: Request, res: Response) => {
  const uploadPath = path.join(__dirname, 'public', 'uploads');
  
  fs.readdir(uploadPath, (err, files) => {
    const images = err ? [] : files
      .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()))
      .map(file => `/uploads/${file}`);
    
    res.render('gallery', { 
      images,
      isEmpty: images.length === 0 
    } as GalleryViewData);
  });
});

// Manejo de errores mejorado
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).render('upload', { 
      error: error.message 
    } as UploadViewData);
  }
  console.error(error.stack);
  res.status(500).send('Error interno del servidor');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`- Página de inicio: http://localhost:${port}`);
  console.log(`- Subir imágenes: http://localhost:${port}/upload`);
  console.log(`- Galería: http://localhost:${port}/gallery`);
});