// src/test/integration/user/user.mutate-and-logout.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(30000);

// Helpers
function uniqueEmail(prefix = 'user') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}@example.com`;
}
async function createUser(data = {}) {
  const base = {
    email: uniqueEmail('mut'),
    name: 'User For Mutations',
    role: 'USER',
    password: 'hashed-not-needed-here', // no importa para estos endpoints
  };
  return prisma.user.create({ data: { ...base, ...data } });
}

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/user/logout (logout)', () => {
  it('200 - limpia la cookie "token"', async () => {
    // Simulamos que el cliente ya trae una cookie 'token'
    const res = await request(app)
      .post('/api/user/logout')
      .set('Cookie', ['token=abc123; Path=/; HttpOnly'])
      .send();

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/logged out successfully/i);

    // Debe venir un Set-Cookie que borra la cookie (expires pasado o Max-Age=0)
    const setCookie = res.headers['set-cookie'] || [];
    // Algo como: token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict
    const cleared = setCookie.some(
      c =>
        /^token=;/.test(c) &&
        /Path=\//i.test(c) &&
        (/Expires=/i.test(c) || /Max-Age=0/i.test(c))
    );
    expect(cleared).toBe(true);
  });
});

describe('PUT /api/user/:id (updateUser)', () => {
  it('200 - actualiza campos básicos (name, role)', async () => {
    const u = await createUser();
    const payload = { name: 'Updated Name', role: 'EMPLOYEE' };

    const res = await request(app)
      .put(`/api/user/${u.id}`)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', u.id);
    expect(res.body).toHaveProperty('name', 'Updated Name');
    expect(res.body).toHaveProperty('role', 'EMPLOYEE');

    // Verifica en BD
    const db = await prisma.user.findUnique({ where: { id: u.id } });
    expect(db.name).toBe('Updated Name');
    expect(db.role).toBe('EMPLOYEE');
  });

  it('404 - usuario no existe', async () => {
    const res = await request(app)
      .put('/api/user/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
      .send({ name: 'No one' });

    // Si implementaste el manejo P2025 como arriba:
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });

});

describe('DELETE /api/user/:id (deleteUser)', () => {
  it('200 - elimina un usuario existente', async () => {
    const u = await createUser();

    const res = await request(app).delete(`/api/user/${u.id}`).send();
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/user deleted/i);

    const db = await prisma.user.findUnique({ where: { id: u.id } });
    expect(db).toBeNull();
  });

  it('404 - usuario inexistente', async () => {
    const res = await request(app)
      .delete('/api/user/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
      .send();
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });

});
