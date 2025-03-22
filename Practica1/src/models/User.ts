import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'usuario' } 
});

export default mongoose.model<IUser>('User', UserSchema);