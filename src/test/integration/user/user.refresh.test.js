const request = require('supertest');
const bcryptjs = require('bcryptjs');

const { buildApp } = require('../../../../app');
const { prisma } = require('../../../lib/prisma');

const app = buildApp();

describe('POST /api/user/refresh-token', () => {
  it('200 - con refreshToken válido guardado en BD, devuelve nuevos tokens y rota el refresh', async () => {
    // 👇 Paso 1: crear usuario y loguearlo para obtener un refreshToken válido
    const email = `rt_${Date.now()}@example.com`;
    const pass = 'RtPass!234';
    const hashed = await bcryptjs.hash(pass, 6);
    await prisma.user.create({
      data: { email, name: 'RT', role: 'USER', password: hashed },
    });

    // login
    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email, password: pass });

    expect(loginRes.status).toBe(201);
    const issuedRefresh = loginRes.body.refreshToken;

    // ⚠️ IMPORTANTE:
    // Tu login ACTUAL no guarda el refresh en BD.
    // El handler de refresh compara el token enviado contra el que está en BD.
    // Por eso, para que este test pase debes guardar el refresh en BD al hacer login.
    // (Más abajo te dejo el fix del controlador.)
    //
    // Si aún no aplicas el fix, fuerza BD a tener ese refresh:
    await prisma.user.update({
      where: { email },
      data: { refreshToken: issuedRefresh },
    });

    // 👇 Paso 2: pedir refresh con el token válido
    const res = await request(app)
      .post('/api/user/refresh-token')
      .send({ refreshToken: issuedRefresh });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    const newRefresh = res.body.refreshToken;
    expect(typeof newRefresh).toBe('string');
    expect(newRefresh.length).toBeGreaterThan(10);

    // BD debe haberse actualizado al nuevo refresh (rota/invalida el anterior)
    const dbUser = await prisma.user.findUnique({ where: { email } });
    expect(dbUser.refreshToken).toBe(newRefresh);
  });

  it('400 - falta refreshToken', async () => {
    const res = await request(app)
      .post('/api/user/refresh-token')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Not got a refreshToken/i);
  });

  it('401 - refreshToken inválido o no coincide con BD', async () => {
    // usuario sin refresh en BD, o token aleatorio que no coincide
    const email = `rt_bad_${Date.now()}@example.com`;
    const hashed = await bcryptjs.hash('Xx12345!', 6);
    await prisma.user.create({
      data: { email, name: 'Bad RT', role: 'USER', password: hashed, refreshToken: null },
    });

    const res = await request(app)
      .post('/api/user/refresh-token')
      .send({ refreshToken: 'this.is.not.valid' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Refresh token invalid/i);
  });
});
