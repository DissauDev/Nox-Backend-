// src/test/integration/users/user.login.test.js
const request = require('supertest');
const bcryptjs = require('bcryptjs');
const { buildApp } = require('../../../../app');
// Usa la opción que corresponda a tu proyecto:
const { prisma } = require('../../../lib/prisma');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const app = buildApp();

describe('POST /api/user/login (auth User)', () => {
  it('201 - login exitoso, devuelve user (sin password) + accessToken + refreshToken', async () => {
    // Arrange
    const plain = 'MyS3cret!';
    const email = `login_${Date.now()}@example.com`;
    const hashed = await bcryptjs.hash(plain, 6);

    await prisma.user.create({
      data: { email, name: 'Login Test', role: 'USER', password: hashed },
    });

    // Act
    const res = await request(app)
      .post('/api/user/login')
      .send({ email, password: plain });

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    const { user, accessToken, refreshToken } = res.body;
    expect(user.email).toBe(email);
    expect(user.password).toBeUndefined();
    expect(user.refreshToken).toBeUndefined();
    expect(typeof accessToken).toBe('string');
    expect(accessToken.length).toBeGreaterThan(10);
    expect(typeof refreshToken).toBe('string');
    expect(refreshToken.length).toBeGreaterThan(10);
  });

  it('404 - usuario no existe', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({ email: `nope_${Date.now()}@example.com`, password: 'whatever' });

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/User not found/i);
  });

  it('401 - wrong password', async () => {
    // Arrange
    const plain = 'CorrectPass1!';
    const email = `wrong_${Date.now()}@example.com`;
    const hashed = await bcryptjs.hash(plain, 6);
    await prisma.user.create({
      data: { email, name: 'Wrong', role: 'USER', password: hashed },
    });

    // Act
    const res = await request(app)
      .post('/api/user/login')
      .send({ email, password: 'whatever' });

    // Assert
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/User or password invalid/i);
  });
});
