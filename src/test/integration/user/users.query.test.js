// src/test/integration/user/users.query.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

// Helpers simples
async function createUser({ email, name = 'Test User', role = 'USER', password = 'hashed' }) {
  return prisma.user.create({
    data: { email, name, role, password },
  });
}

function uniqueEmail(prefix = 'user') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random()*1e6)}@example.com`;
}

async function createOrderForUser(userId, { totalAmount = 20, subtotal = 20 } = {}) {
  // Crea una orden mínima válida (modelo exige varios campos)
  return prisma.order.create({
    data: {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PAID',
      totalAmount,
      subtotal,
      paymentMethod: 'Stripe',
      stripePaymentIntentId: `pi_${Math.random().toString(36).slice(2)}`,
      user: userId ? { connect: { id: userId } } : undefined,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '555-555',
      customerAddress: '123 Test St',
      // billingCity/State son opcionales en tu schema
    },
  });
}

beforeEach(async () => {
  // Limpia todo entre tests (usa tu util ya existente)
  await truncateAll();
});

describe('GET /api/user/:id (getUserById)', () => {
  it('200 - devuelve el usuario si existe', async () => {
    const u = await createUser({ email: uniqueEmail('byid') });

    const res = await request(app).get(`/api/user/${u.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', u.id);
    expect(res.body).toHaveProperty('email', u.email);
  });

  it('404 - si no existe', async () => {
    const res = await request(app).get('/api/user/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i); // "Usuario not found" en tu controller
  });
});

describe('GET /api/user/all (getAllUsers)', () => {
  it('200 - lista todos los usuarios', async () => {
    await createUser({ email: uniqueEmail('all1') });
    await createUser({ email: uniqueEmail('all2') });
    await createUser({ email: uniqueEmail('all3') });

    const res = await request(app).get('/api/user/all');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // al menos 3 (puede haber más si tu seed mete datos)
    expect(res.body.length).toBeGreaterThanOrEqual(3);
    // estructura mínima
    const any = res.body[0];
    expect(any).toHaveProperty('id');
    expect(any).toHaveProperty('email');
  });
});

describe('GET /api/user-customers (getCustomers)', () => {
  it('200 - pagina usuarios role=USER y calcula stats por usuario (count/sum/avg/lastOrder)', async () => {
    // Crea 3 USER y 1 ADMIN (que NO debe salir)
    const u1 = await createUser({ email: uniqueEmail('cust1'), role: 'USER' });
    const u2 = await createUser({ email: uniqueEmail('cust2'), role: 'USER' });
    const u3 = await createUser({ email: uniqueEmail('cust3'), role: 'USER' });
    await createUser({ email: uniqueEmail('admin'), role: 'ADMIN' });

    // Órdenes para u1 (2 órdenes), u2 (1 orden), u3 (0 órdenes)
    await createOrderForUser(u1.id, { totalAmount: 10, subtotal: 10 });
    await createOrderForUser(u1.id, { totalAmount: 30, subtotal: 30 });
    await createOrderForUser(u2.id, { totalAmount: 50, subtotal: 50 });

    const res = await request(app)
      .get('/api/user-customers')
      .query({ page: 1, limit: 10, search: '' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('meta');

    const { data, meta } = res.body;

    // Solo usuarios con role USER
    const ids = data.map(d => d.id);
    expect(ids).toEqual(expect.arrayContaining([u1.id, u2.id, u3.id]));
    // El admin no debe estar
    // (si quieres ser más estricto, puedes comprobar que NO aparezca ningún email 'admin_')
    expect(data.find(d => d.email.includes('admin_'))).toBeUndefined();

    // Stats por usuario
    const row1 = data.find(d => d.id === u1.id);
    expect(row1.totalOrders).toBe(2);
    expect(Number(row1.totalSpent)).toBe(40);
    expect(Number(row1.averageOrderValue)).toBeCloseTo(20, 5);
    // lastOrderDate puede ser Date o string — solo valida que exista o sea null
    expect(row1).toHaveProperty('lastOrderDate');

    const row2 = data.find(d => d.id === u2.id);
    expect(row2.totalOrders).toBe(1);
    expect(Number(row2.totalSpent)).toBe(50);
    expect(Number(row2.averageOrderValue)).toBeCloseTo(50, 5);

    const row3 = data.find(d => d.id === u3.id);
    expect(row3.totalOrders).toBe(0);
    expect(Number(row3.totalSpent)).toBe(0);
    expect(Number(row3.averageOrderValue)).toBe(0);

    // Meta de paginación coherente
    expect(meta).toMatchObject({
      currentPage: 1,
      perPage: 10,
      totalPages: expect.any(Number),
      totalItems: expect.any(Number),
    });
    // Debe contar solo USERS que matchean el filtro (3)
    expect(meta.totalItems).toBeGreaterThanOrEqual(3);
  });

  it('200 - aplica search por email o nombre (case-insensitive)', async () => {
    await createUser({ email: 'alice.customer@test.com', name: 'Alice', role: 'USER' });
    await createUser({ email: 'bob.customer@test.com',   name: 'Bob',   role: 'USER' });
    await createUser({ email: 'staff@test.com',          name: 'Staff', role: 'ADMIN' });

    const res = await request(app)
      .get('/api/user-customers')
      .query({ search: 'alice', page: 1, limit: 10 });

    expect(res.status).toBe(200);
    const emails = res.body.data.map(d => d.email);
    expect(emails).toEqual(expect.arrayContaining(['alice.customer@test.com']));
    expect(emails).not.toEqual(expect.arrayContaining(['staff@test.com']));
  });
});

describe('GET /api/user-stats (getUsersStats)', () => {
  it('200 - agrega totales: totalCustomers, totalOrders, totalRevenue, averages', async () => {
    // 2 clientes con órdenes
    const u1 = await createUser({ email: uniqueEmail('s1'), role: 'USER' });
    const u2 = await createUser({ email: uniqueEmail('s2'), role: 'USER' });
    await createOrderForUser(u1.id, { totalAmount: 10, subtotal: 10 });
    await createOrderForUser(u1.id, { totalAmount: 20, subtotal: 20 });
    await createOrderForUser(u2.id, { totalAmount: 30, subtotal: 30 });

    // Un staff con orden (sí cuenta en órdenes, pero no aporta a "clientes"?)
    // Tu implementación de totalCustomers usa distinct(userId) en Order (clientes reales),
    // así que si staff tiene orders con userId propio, contaría; normalmente no tendrían.
    // Creamos un staff SIN órdenes.
    await createUser({ email: uniqueEmail('staff'), role: 'ADMIN' });

    const res = await request(app).get('/api/user-stats');

    expect(res.status).toBe(200);
    const { totalCustomers, totalOrders, totalRevenue, averageOrdersPerCustomer, averageLifetimeSpend, averageOrderValue } = res.body;

    // u1 y u2 han hecho pedidos => 2 clientes
    expect(totalCustomers).toBe(2);
    // 3 órdenes en total
    expect(totalOrders).toBe(3);
    // 10 + 20 + 30 = 60
    expect(Number(totalRevenue)).toBe(60);

    // averages
    expect(Number(averageOrdersPerCustomer)).toBeCloseTo(3 / 2, 5);
    expect(Number(averageLifetimeSpend)).toBeCloseTo(60 / 2, 5); // 30
    expect(Number(averageOrderValue)).toBeCloseTo(60 / 3, 5);    // 20
  });
});

describe('GET /api/users/staff (getStaffUsers)', () => {
  it('200 - lista solo ADMIN/EMPLOYEE con paginación', async () => {
    const a1 = await createUser({ email: uniqueEmail('admin1'),   role: 'ADMIN',    name: 'Carl' });
    const e1 = await createUser({ email: uniqueEmail('empl1'),    role: 'EMPLOYEE', name: 'Ana' });
    await createUser({ email: uniqueEmail('customer'), role: 'USER', name: 'User' });

    const res = await request(app)
      .get('/api/users/staff')
      .query({ page: 1, limit: 10 });

    expect(res.status).toBe(200);
    const { data, meta } = res.body;

    const roles = data.map(u => u.role);
    expect(roles.every(r => r === 'ADMIN' || r === 'EMPLOYEE')).toBe(true);

    // Paginación
    expect(meta).toMatchObject({
      currentPage: 1,
      perPage: 10,
      totalPages: expect.any(Number),
      totalItems: expect.any(Number),
    });

    // El USER no debe estar
    const emails = data.map(u => u.email);
    expect(emails.find(e => e.includes('customer'))).toBeUndefined();
  });

  it('200 - aplica search por nombre (insensible)', async () => {
    await createUser({ email: uniqueEmail('aa'), role: 'ADMIN',    name: 'María Pérez' });
    await createUser({ email: uniqueEmail('bb'), role: 'EMPLOYEE', name: 'Juan López' });

    const res = await request(app)
      .get('/api/users/staff')
      .query({ search: 'maría' });

    expect(res.status).toBe(200);
    const names = res.body.data.map(u => u.name.toLowerCase());
    expect(names).toEqual(expect.arrayContaining(['maría pérez']));
  });
});
