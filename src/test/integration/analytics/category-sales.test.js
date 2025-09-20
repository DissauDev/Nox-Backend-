// src/test/integration/analytics/category-sales.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { truncateAll } = require('../../prisma.test.utils');
const {
  createCategory,
  createProduct,
  createOrderWithItem,
  createUser,
} = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/analytics/categories-sales'; // <-- ajusta si tu ruta difiere

beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/analytics/category-sales (getCategorySales)', () => {
  it('200 - Day: agrega ventas por categoría, mantiene categorías sin ventas y ordena por ventas desc', async () => {
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000); // dentro de Day
    const thirtySixHoursAgo = new Date(now.getTime() - 36 * 60 * 60 * 1000); // fuera de Day

    // 3 categorías
    const catA = await createCategory({ name: 'Cat A' });
    const catB = await createCategory({ name: 'Cat B' });
    const catC = await createCategory({ name: 'Cat C' }); // sin ventas

    // productos
    const prodA = await createProduct({ categoryId: catA.id, name: 'Prod A' });
    const prodB = await createProduct({ categoryId: catB.id, name: 'Prod B' });

    // usuarios (no afectan el agregado pero simulan contexto)
    await createUser({ createdAt: twelveHoursAgo });
    await createUser({ createdAt: thirtySixHoursAgo });

    // Ventas actuales (dentro de Day):
    // Cat A: qty=2, price=50 => 100
    await createOrderWithItem({
      status: 'PAID',
      createdAt: twelveHoursAgo,
      productId: prodA.id,
      quantity: 2,
      price: 50,
    });

    // Cat B: qty=3, price=20 => 60
    await createOrderWithItem({
      status: 'PAID',
      createdAt: twelveHoursAgo,
      productId: prodB.id,
      quantity: 3,
      price: 20,
    });

    // Orden PENDING (no suma sales/items)
    await createOrderWithItem({
      status: 'PENDING',
      createdAt: twelveHoursAgo,
      productId: prodA.id,
      quantity: 5,
      price: 100,
    });

    // Orden anterior (fuera de Day), no debe contar
    await createOrderWithItem({
      status: 'PAID',
      createdAt: thirtySixHoursAgo,
      productId: prodA.id,
      quantity: 10,
      price: 10,
    });

    const res = await request(app).get(`${PATH}?period=Day`).send();
    expect(res.status).toBe(200);

    const body = res.body;
    expect(body).toHaveProperty('period', 'Day');
    expect(typeof body.totalAll).toBe('number');
    expect(Array.isArray(body.categories)).toBe(true);

    // Deben venir las 3 categorías (incluida la sin ventas)
    const byName = Object.fromEntries(body.categories.map(c => [c.name, c]));
    expect(byName['Cat A']).toBeTruthy();
    expect(byName['Cat B']).toBeTruthy();
    expect(byName['Cat C']).toBeTruthy();

    // Totales esperados
    // Cat A: 100, Cat B: 60, Cat C: 0 => totalAll = 160
    expect(body.totalAll).toBeCloseTo(160, 2);

    // Cat A
    expect(byName['Cat A'].sales).toBeCloseTo(100, 2);
    expect(byName['Cat A'].itemsSold).toBe(2);
    expect(byName['Cat A'].percentage).toBeCloseTo((100 / 160) * 100, 2); // 62.5

    // Cat B
    expect(byName['Cat B'].sales).toBeCloseTo(60, 2);
    expect(byName['Cat B'].itemsSold).toBe(3);
    expect(byName['Cat B'].percentage).toBeCloseTo((60 / 160) * 100, 2); // 37.5

    // Cat C (sin ventas)
    expect(byName['Cat C'].sales).toBeCloseTo(0, 2);
    expect(byName['Cat C'].itemsSold).toBe(0);
    expect(byName['Cat C'].percentage).toBe(0);

    // Orden descendente por ventas: Cat A (100) > Cat B (60) > Cat C (0)
    const namesOrdered = body.categories.map(c => c.name);
    expect(namesOrdered.slice(0, 3)).toEqual(['Cat A', 'Cat B', 'Cat C']);
  });

  it('200 - period inválido cae a Day por defecto', async () => {
    // Sin datos, solo valida que responde y trae estructura
    const res = await request(app).get(`${PATH}?period=NOPE`).send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('period', 'Day');
    expect(res.body).toHaveProperty('totalAll');
    expect(Array.isArray(res.body.categories)).toBe(true);
  });
});
