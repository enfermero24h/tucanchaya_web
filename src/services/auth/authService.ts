// src/services/authService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import User, { IUser } from '../../models/usuario';

interface AuthResponse {
  user: Document<any, any, IUser> & IUser;
  token: string;
}

class AuthService {
  private secret = process.env.JWT_SECRET || 'your_jwt_secret';

  async register(userData: IUser, role: 'usuario' | 'admin' | 'staff' = 'usuario'): Promise<AuthResponse> {
    const { email, password } = userData;
    console.log('Registering user:', email);

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      throw new Error('User already exists');
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario con el rol especificado
    const user = new User({
      ...userData,
      password: hashedPassword,
      role: role
    });
    await user.save();

    console.log('User registered successfully:', email, 'with role:', role);

    // Crear token
    const token = this.generateToken(user._id.toString(), role);
    return { user, token };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    console.log('Attempting login for:', email);

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      throw new Error('Invalid credentials');
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for:', email);
      throw new Error('Invalid credentials');
    }

    console.log('Login successful for:', email);

    // Crear token
    const token = this.generateToken(user._id.toString(), user.role);
    return { user, token };
  }

  async createAdmin(userData: IUser): Promise<AuthResponse> {
    return this.register(userData, 'admin');
  }

  async createStaff(userData: IUser): Promise<AuthResponse> {
    return this.register(userData, 'staff');
  }

  private generateToken(userId: string, role: string): string {
    return jwt.sign({ id: userId, role }, this.secret, { expiresIn: '1h' });
  }
}

export default new AuthService();