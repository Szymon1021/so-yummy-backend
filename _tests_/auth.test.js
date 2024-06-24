require('dotenv').config(); // Wczytujemy konfigurację z pliku .env



const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Recipe } = require('../models/recipe');

describe('Authentication and Recipes API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'db-contacts',
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let authToken;

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password123!'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    authToken = response.body.token;
  }, 30000);

  it('should login the registered user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'Password123!'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    authToken = response.body.token;
  }, 30000);

  it('should fetch recipes', async () => {
    // Dodaj przykładowy przepis, aby upewnić się, że jest coś do pobrania
    await Recipe.create({
      title: 'Sample Recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      instructions: 'Mix all ingredients and cook for 20 minutes.',
      author: 'testuser'
    });

    const response = await request(app)
      .get('/api/recipes')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 30000);
});
