import mongoose from 'mongoose';
import request from 'supertest';
import connectDB from '../config/bd';
import app from '../index';

beforeAll(async () => {
  await connectDB();
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});

  describe('Auth API', () => {
    beforeEach(async () => {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.db.dropDatabase();
      }
    });

    describe('POST /api/auth/register', () => {
      it('should register a new user and return a token', async () => {
        const res = await request(app)
          .post('/api/auth/register')
          .send({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
          });
    
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('name', 'Test User');
        expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
      });
    
      it('should not register a user with an existing email', async () => {
        // Primero, registra un usuario
        await request(app)
          .post('/api/auth/register')
          .send({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
          });
    
        // Intenta registrar otro usuario con el mismo email
        const res = await request(app)
          .post('/api/auth/register')
          .send({
            name: 'Another User',
            email: 'testuser@example.com',
            password: 'password123'
          });
    
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'User already exists');
      });
    });
    

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Registrar un usuario para las pruebas de login
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Login Test User',
          email: 'logintest@example.com',
          password: 'password123'
        });
    });

    it('should login a user and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('name', 'Login Test User');
      expect(res.body.user).toHaveProperty('email', 'logintest@example.com');
    });

        it('should not login with non-existent user', async () => {
          const res = await request(app)
            .post('/api/auth/login')
            .send({
            email: 'testuser@example.com',
            password: 'password123'
            });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});