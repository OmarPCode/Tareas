import { Request } from 'express';
import multer from 'multer';

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface GalleryViewData {
  images: string[];
  isEmpty: boolean;
}

export interface UploadViewData {
  error?: string;
}

export interface MulterRequest extends Request {
    file?: Express.Multer.File;
  }