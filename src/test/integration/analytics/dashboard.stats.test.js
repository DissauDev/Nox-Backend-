const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const {createCategory, createProduct, createUser, createOrderWithItem  } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);
const PATH = '/api/analytics/overview';


beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/analytics/overview (getDashboardStats)', () => {
  it('200 - Day: calcula métricas con datos en ventana actual vs previa', async () => {
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    const thirtySixHoursAgo = new Date(now.getTime() - 36 * 60 * 60 * 1000);

    const cat = await createCategory();
   const prod = await createProduct({ categoryId: cat.id, name: 'Cookie', price: 50 });
    await createUser({ createdAt: twelveHoursAgo });
    await createUser({ createdAt: twelveHoursAgo });
    await createUser({ createdAt: thirtySixHoursAgo });

    // 1 actual PAID (cuenta en orders y earnings/products)
    await createOrderWithItem({
      status: 'PAID',
      totalAmount: 100,
      createdAt: twelveHoursAgo,
      productId: prod.id,
      quantity: 2,
      price: 50,
    });

    // 1 actual PENDING (cuenta en orders, NO en earnings/products)
    await createOrderWithItem({
      status: 'PENDING',
      totalAmount: 999,
      createdAt: twelveHoursAgo,
      productId: prod.id,
      quantity: 1,
      price: 50,
    });

    // 1 previo PAID
    await createOrderWithItem({
      status: 'PAID',
      totalAmount: 50,
      createdAt: thirtySixHoursAgo,
      productId: prod.id,
      quantity: 1,
      price: 50,
    });

    const res = await request(app).get(`${PATH}?period=Day`).send();
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body.customers).toBe(2);  // 2 actuales vs 1 previo
    expect(body.orders).toBe(2);     // PAID + PENDING en ventana actual
    expect(body.earnings).toBe(100); // solo PAID/COMPLETED
    expect(body.productsSold).toBe(2);

    ['customersPctChange','ordersPctChange','earningsPctChange','productsPctChange']
      .forEach(k => expect(typeof body[k]).toBe('number'));
  });

  it('200 - ignora period inválido y usa Day por defecto', async () => {
    const res = await request(app).get(`${PATH}?period=NOT_VALID`).send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('customers');
  });

  it('200 - All: campos presentes y numéricos', async () => {
    const res = await request(app).get(`${PATH}?period=All`).send();
    expect(res.status).toBe(200);
    ['customers','orders','earnings','productsSold',
     'customersPctChange','ordersPctChange','earningsPctChange','productsPctChange']
     .forEach(k => expect(typeof res.body[k]).toBe('number'));
  });
});
