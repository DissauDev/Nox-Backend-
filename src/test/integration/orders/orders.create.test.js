const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma } = require('../../prisma.test.utils');

// Si ya tienes factories, úsalas. Si no, creamos la categoría y el producto aquí mismo:
jest.setTimeout(20000);

async function createCategory() {
  return prisma.category.create({
    data: {
      name: `Cat-${Date.now()}`,
      status: 'AVAILABLE',
      onCarousel: true,
      imageUrl: 'https://example.com/img.jpg',
      shortDescription: 'Short',
      longDescription: 'Long',
      sortOrder: 0
    }
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
      packOptionSurcharge: 0
    }
  });
}

describe('POST /api/orders (Stripe test key)', () => {
  const app = buildApp(); // Stripe real (modo test), gracias a .env.test

  it('crea una orden (PAID) con payment_intent de Stripe test', async () => {
    const product = await createProduct();

    const body = {
      items: [
        { productId: product.id, quantity: 2, price: 5.0, options: null }
      ],
      amount: 10.0,
      subtotal: 10.0,
      customerEmail: 'test@example.com',
      paymentMethodId: 'pm_card_visa',        // <- método de prueba de Stripe
      customerPhone: '+1 555 555 5555',
      customerAddress: '123 Test St',
      lastName: 'Doe',
      customerName: 'John',
      billingCity: 'San Jose',
      billingState: 'CA'
    };

    const res = await request(app).post('/api/orders').send(body);
    expect(res.status).toBe(201);

    const order = res.body;
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('PAID');
    expect(order.stripePaymentIntentId).toMatch(/^pi_/);
    expect(order.totalAmount).toBe(10.0);
    expect(order.items.length).toBe(1);
    expect(order.items[0].productId).toBe(product.id);
    expect(order.items[0].quantity).toBe(2);

    const dbOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true }
    });
    expect(dbOrder).toBeTruthy();
    expect(dbOrder.status).toBe('PAID');
  });
});
