// src/test/integration/orders.delete.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = buildApp();

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

async function createProduct() {
  const cat = await createCategory();
  return prisma.product.create({
    data: {
      name: `Prod-${Date.now()}`,
      price: 5.0,
      description: 'Test product',
      type: 'REGULAR',
      status: 'AVAILABLE',
      categoryId: cat.id,
      isOptionItem: false,
      packOptionSurcharge: 0,
    },
  });
}

async function createOrderWithItems() {
  const product = await createProduct();
  const order = await prisma.order.create({
    data: {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PAID',
      subtotal: 10.0,
      totalAmount: 10.0,
      paymentMethod: 'Stripe',
      stripePaymentIntentId: 'pi_for_delete_test',
      customerName: 'John',
      customerEmail: 'john@example.com',
      customerPhone: '555-555',
      customerAddress: '123 Test St',
      billingCity: 'Miami',
      billingState: 'FL',
      items: {
        create: [
          { productId: product.id, quantity: 2, price: 5.0, chosenOptions: null },
        ],
      },
    },
    include: { items: true },
  });
  return order;
}

describe('DELETE /api/orders/:id (deleteOrder)', () => {
  it('200 - elimina orden e items relacionados', async () => {
    const order = await createOrderWithItems();

    const res = await request(app).delete(`/api/orders/${order.id}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const existsOrder = await prisma.order.findUnique({ where: { id: order.id } });
    expect(existsOrder).toBeNull();

    const items = await prisma.orderItem.findMany({ where: { orderId: order.id } });
    expect(items.length).toBe(0);
  });

  it('404 - orden no existe', async () => {
    const res = await request(app).delete('/api/orders/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/Order not found/i);
  });
});
