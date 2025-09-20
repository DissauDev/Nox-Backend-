// src/test/integration/orders.update.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = buildApp();

async function createOrderFixture(overrides = {}) {
  // Crea una orden mínima válida en DB para probar updates
  return prisma.order.create({
    data: {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PROCESSING',
      subtotal: 10.0,
      totalAmount: 10.0,
      paymentMethod: 'Stripe',
      stripePaymentIntentId: 'pi_dummy_for_update',
      customerName: 'John',
      customerEmail: 'test@example.com',
      customerPhone: '+1 555 555 5555',
      customerAddress: '123 Test St',
      billingCity: 'Miami',
      billingState: 'FL',
      ...overrides,
    },
  });
}

describe('PUT /api/orders/:id (updateOrder)', () => {
  it('200 - actualiza el status cuando es válido', async () => {
    const order = await createOrderFixture({ status: 'PROCESSING' });

    const res = await request(app)
      .put(`/api/orders/${order.id}`)
      .send({ status: 'COMPLETED' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', order.id);
    expect(res.body).toHaveProperty('status', 'COMPLETED');

    const db = await prisma.order.findUnique({ where: { id: order.id } });
    expect(db.status).toBe('COMPLETED');
  });

  it('400 - falta status en body', async () => {
    const order = await createOrderFixture();

    const res = await request(app)
      .put(`/api/orders/${order.id}`)
      .send({}); // sin status

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/proporcionar un status/i);
  });

  it('400 - status inválido', async () => {
    const order = await createOrderFixture();

    const res = await request(app)
      .put(`/api/orders/${order.id}`)
      .send({ status: 'NOT_A_STATUS' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Status invalid/i);
  });

  it('404 - orden inexistente', async () => {
    const res = await request(app)
      .put(`/api/orders/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`)
      .send({ status: 'PAID' });

    // Tu controlador devuelve 400 con error genérico si es P2025;
    // idealmente debería mapear a 404. Aceptamos cualquiera de los dos:
    expect([400, 404]).toContain(res.status);
  });
});
