const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma } = require('../../prisma.test.utils');

jest.setTimeout(50000);

// Helpers
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

describe('POST /api/orders (Stripe test key)', () => {
  const app = buildApp(); // usa .env.test (Stripe test)

  it('crea una orden (PAID) con payment_intent de Stripe test', async () => {
    const product = await createProduct();

    const body = {
      items: [{ productId: product.id, quantity: 2, price: 5.0, options: null }],
      amount: 10.0,
      subtotal: 10.0,
      customerEmail: 'test@example.com',
      paymentMethodId: 'pm_card_visa', // método de prueba Stripe
      customerPhone: '+1 555 555 5555',

      // Dirección requerida + nuevos campos
      customerAddress: '123 Test St',
      apartment: 'Apt 4B',          // opcional
      company: 'Nox QA',            // opcional
      billingCity: 'San Jose',
      billingState: 'CA',
      zipcode: '95131',             // <-- requerido por el backend

      // Datos cliente
      lastName: 'Doe',
      customerName: 'John',
      specifications: 'No peanuts, please.',
    };

    const res = await request(app).post('/api/orders').send(body);
    expect(res.status).toBe(201);

    const order = res.body;

    // Campos básicos de la orden
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('PAID');
    expect(order.stripePaymentIntentId).toMatch(/^pi_/);
    expect(order.totalAmount).toBe(10.0);
    expect(order.subtotal).toBe(10.0);
    expect(order.paymentMethod).toBe('Stripe');

    // Items
    expect(Array.isArray(order.items)).toBe(true);
    expect(order.items.length).toBe(1);
    expect(order.items[0].productId).toBe(product.id);
    expect(order.items[0].quantity).toBe(2);

    // Dirección y datos nuevos
    expect(order.customerAddress).toBe(body.customerAddress);
    expect(order.apartment).toBe(body.apartment);
    expect(order.company).toBe(body.company);
    expect(order.billingCity).toBe(body.billingCity);
    expect(order.billingState).toBe(body.billingState);
    expect(order.zipcode).toBe(body.zipcode);

    // Datos de contacto
    expect(order.customerEmail).toBe(body.customerEmail);
    expect(order.customerPhone).toBe(body.customerPhone);
    expect(order.customerName).toBe(body.customerName);
    expect(order.customerLastname).toBe(body.lastName);

    // Verifica en DB
    const dbOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });
    expect(dbOrder).toBeTruthy();
    expect(dbOrder.status).toBe('PAID');
    expect(dbOrder.zipcode).toBe(body.zipcode);
    expect(dbOrder.items.length).toBe(1);
    expect(dbOrder.items[0].productId).toBe(product.id);
  });
});
