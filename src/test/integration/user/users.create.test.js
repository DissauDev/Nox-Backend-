// src/test/integration/users/users.create.test.js
const request = require('supertest');
const bcryptjs = require('bcryptjs');
const { buildApp } = require('../../../../app');
const { prisma } = require('../../../lib/prisma');

const app = buildApp();

describe('POST /api/users (createUser)', () => {
  it('201 - crea usuario y devuelve tokens (sin exponer password)', async () => {
    const body = {
      email: `new_${Date.now()}@example.com`,
      password: 'MyS3cret!',
      role: 'USER',
      name: 'John Doe',
    };

    // Act
    const res = await request(app).post('/api/user/create').send(body);

    // Assert respuesta
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    const { user, accessToken, refreshToken } = res.body;

    // user básico
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(body.email);
    expect(user.name).toBe(body.name);
    expect(user.role).toBe('USER');

    // No exponer campos sensibles
    expect(user.password).toBeUndefined();
    expect(user.refreshToken).toBeUndefined();

    // Tokens presentes
    expect(typeof accessToken).toBe('string');
    expect(accessToken.length).toBeGreaterThan(10);
    expect(typeof refreshToken).toBe('string');
    expect(refreshToken.length).toBeGreaterThan(10);

    // Verificaciones en DB
    const dbUser = await prisma.user.findUnique({ where: { email: body.email } });
    expect(dbUser).toBeTruthy();
    // password hasheado
    expect(dbUser.password).not.toBe(body.password);
    const okHash = await bcryptjs.compare(body.password, dbUser.password);
    expect(okHash).toBe(true);
    // refresh token guardado
    expect(dbUser.refreshToken).toBe(refreshToken);
  });

  it('400 - campos requeridos faltantes', async () => {
    const res = await request(app).post('/api/user/create').send({
      // faltan password, role y name
      email: `missing_${Date.now()}@example.com`,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/required/i);
  });

  it('400 - email ya registrado', async () => {
    const email = `dup_${Date.now()}@example.com`;
    // Arrange: creamos el usuario directo en DB
    await prisma.user.create({
      data: {
        email,
        name: 'Dup',
        role: 'USER',
        password: await bcryptjs.hash('123456', 6),
      },
    });

    // Act
    const res = await request(app).post('/api/user/create').send({
      email,
      password: 'AnotherPass!',
      role: 'USER',
      name: 'Dup 2',
    });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already registered/i);
  });

  it('400 - role inválido', async () => {
    const res = await request(app).post('/api/user/create').send({
      email: `role_${Date.now()}@example.com`,
      password: '12345678',
      role: 'MANAGER', // no permitido
      name: 'Role Test',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/role is invalid/i);
  });
});
