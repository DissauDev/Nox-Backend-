// src/test/integration/orders.refund.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = buildApp();

jest.setTimeout(30000); // 30s para cubrir Stripe en modo test

async function createCategory() {
  return prisma.category.create({
    data: {
      name: `Cat-${Date.now()}`,
      status: 'AVAILABLE',
      onCarousel: true,
      imageUrl: 'https://example.com/img.jpg',
      shortDescription: 'Short',
      longDescription: 'Long',
      sortOrder: 0,
    },
  });
}

async function createProduct(price = 5.0) {
  const cat = await createCategory();
  return prisma.product.create({
    data: {
      name: `Prod-${Date.now()}`,
      price,
      description: 'Test product',
      type: 'REGULAR',
      status: 'AVAILABLE',
      categoryId: cat.id,
      isOptionItem: false,
      packOptionSurcharge: 0,
    },
  });
}

async function createPaidOrderViaAPI() {
  const product = await createProduct(5.0);
  const body = {
    items: [
      { productId: product.id, quantity: 2, price: 5.0, options: null },
    ],
    amount: 10.0,
    subtotal: 10.0,
    customerEmail: 'refund@example.com',
    paymentMethodId: 'pm_card_visa',        // Stripe test
    customerPhone: '555-555',
    customerAddress: '123 Test St',
    lastName: 'Doe',
    customerName: 'John',
    billingCity: 'San Jose',
    billingState: 'CA',
  };
  const res = await request(app).post('/api/orders').send(body);
  if (res.status !== 201) {
    throw new Error(`Fallo crear orden para refund: ${res.status} ${JSON.stringify(res.body)}`);
  }
  return res.body; // orden completa
}

describe('POST /api/orders/:id/refund (refundOrder)', () => {
  it('200 - refund TOTAL: status REFUNDED y totalAmount=0', async () => {
    const order = await createPaidOrderViaAPI();

    const res = await request(app)
      .post(`/api/orders/${order.id}/refund`)
      .send({}); // sin totalAmount => total

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const updated = await prisma.order.findUnique({ where: { id: order.id } });
    expect(updated.status).toBe('REFUNDED');
    expect(updated.totalAmount).toBe(0); // total refund
    // Tu controlador pisa stripePaymentIntentId con el refund id (re_*)
    expect(updated.stripePaymentIntentId).toMatch(/^re_/);
  });

  it('200 - refund PARCIAL: resta el monto y queda pending restante', async () => {
    const order = await createPaidOrderViaAPI();

    const res = await request(app)
      .post(`/api/orders/${order.id}/refund`)
      .send({ totalAmount: 4.0 }); // $4.00 de refund

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const updated = await prisma.order.findUnique({ where: { id: order.id } });
    expect(updated.status).toBe('REFUNDED');      // tu lógica marca REFUNDED incluso parcial
    expect(updated.totalAmount).toBe(6.0);        // 10 - 4
    expect(updated.stripePaymentIntentId).toMatch(/^re_/);
  });

  it('404 - orden inexistente', async () => {
    const res = await request(app)
      .post('/api/orders/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/refund')
      .send({});
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/Orden not found/i);
  });
});
