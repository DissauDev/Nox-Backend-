// src/test/integration/user/user.password-reset.test.js
const request = require('supertest');
const bcryptjs = require('bcryptjs');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

// 👇 Mock del envío de email para capturar el token sin mandar correos reales
jest.mock('../../../utils/email', () => {
  return {
    sendEmail: jest.fn().mockResolvedValue(true),
  };
});
const { sendEmail } = require('../../../utils/email');

const app = buildApp();
jest.setTimeout(20000);

// Helpers
async function createUser({ email, name = 'Test User', role = 'USER', password = 'Passw0rd!' }) {
  const hashed = await bcryptjs.hash(password, 6);
  return prisma.user.create({
    data: { email, name, role, password: hashed },
  });
}
function uniqueEmail(prefix = 'user') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}@example.com`;
}

beforeEach(async () => {
  await truncateAll();
  jest.clearAllMocks();
});

describe('PUT /api/user/password/:id (updatePassword)', () => {
  it('200 - actualiza la contraseña de un usuario existente', async () => {
    const u = await createUser({ email: uniqueEmail('upd') });

    const res = await request(app)
      .put(`/api/user/password/${u.id}`) // u.id es UUID string
      .send({ password: 'NewP@ss123' });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/password update/i);

    const dbUser = await prisma.user.findUnique({ where: { id: u.id } });
    expect(dbUser).toBeTruthy();

    // La contraseña NO debe ser igual en texto plano
    expect(dbUser.password).not.toBe('NewP@ss123');

    // Y debe matchear con bcryptjs.compare
    const ok = await bcryptjs.compare('NewP@ss123', dbUser.password);
    expect(ok).toBe(true);
  });

  it('400 - falta password', async () => {
    const u = await createUser({ email: uniqueEmail('upd2') });
    const res = await request(app)
      .put(`/api/user/password/${u.id}`)
      .send({}); // sin password
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/new password is required/i);
  });

  it('404 - usuario inexistente', async () => {
    const res = await request(app)
      .put('/api/user/password/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
      .send({ password: 'Xx123456!' });
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });
});

describe('POST /api/user/forgot-password (forgotPassword)', () => {
  it('200 - genera token y envía email con link', async () => {
    const email = uniqueEmail('forgot');
    const u = await createUser({ email });

    const res = await request(app)
      .post('/api/user/forgot-password')
      .send({ email });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/email send/i);

    // Verifica que se haya llamado sendEmail
    expect(sendEmail).toHaveBeenCalledTimes(1);
    const args = sendEmail.mock.calls[0][0];
    expect(args.to).toBe(email);
    expect(args.subject).toMatch(/reset/i);
    expect(args.html).toContain(process.env.FRONT_URL || '');

    // En la BD debe haberse guardado el hash y la expiración
    const dbUser = await prisma.user.findUnique({ where: { id: u.id } });
    expect(dbUser.passwordResetToken).toBeTruthy();
    expect(dbUser.passwordResetExpires).toBeTruthy();
    expect(new Date(dbUser.passwordResetExpires).getTime()).toBeGreaterThan(Date.now());
  });

  it('400 - falta email', async () => {
    const res = await request(app)
      .post('/api/user/forgot-password')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/email is required/i);
  });

  it('400 - usuario no existe', async () => {
    const res = await request(app)
      .post('/api/user/forgot-password')
      .send({ email: uniqueEmail('nope') });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/user not found/i);
  });
});

describe('POST /api/user/reset-password (resetPassword)', () => {
  // Flujo feliz: forgot -> obtenemos token desde el mock -> reset
  it('200 - resetea contraseña con token válido y limpia token/expiración', async () => {
    const email = uniqueEmail('reset');
    const user = await createUser({ email, password: 'OldP@ss1' });

    // 1) Disparamos forgot y capturamos el token del correo mockeado
    const resForgot = await request(app)
      .post('/api/user/forgot-password')
      .send({ email });
    expect(resForgot.status).toBe(200);

    expect(sendEmail).toHaveBeenCalledTimes(1);
    const { html } = sendEmail.mock.calls[0][0];

    // Extraer `token=...` del HTML del correo
    const match = html.match(/[?&]token=([a-f0-9]{64})/i) || html.match(/[?&]token=([A-Za-z0-9_-]+)/);
    expect(match).toBeTruthy();
    const rawToken = match[1]; // este es el token en claro que debe aceptar tu endpoint

    // 2) Reseteamos
    const newPwd = 'NewP@ss2!';
    const resReset = await request(app)
      .post('/api/user/reset-password')
      .send({ token: rawToken, password: newPwd });

    expect(resReset.status).toBe(200);
    expect(resReset.body.message).toMatch(/password update/i);

    // 3) Verificamos en BD: password cambiada, y token limpiado
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    const ok = await bcryptjs.compare(newPwd, dbUser.password);
    expect(ok).toBe(true);
    expect(dbUser.passwordResetToken).toBeNull();
    expect(dbUser.passwordResetExpires).toBeNull();
  });

  it('400 - token inválido o expirado', async () => {
    const res = await request(app)
      .post('/api/user/reset-password')
      .send({ token: 'token_invalido', password: 'Xx123456!' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/token invalid|expired/i);
  });
});
