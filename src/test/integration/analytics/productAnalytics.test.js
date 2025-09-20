// src/test/integration/analytics/productAnalytics.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { truncateAll } = require('../../prisma.test.utils');
const {
  createCategory,
  createProduct,
  createOrderWithItem,
} = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

// 👇 Ajusta si tu ruta es distinta
const PATH = '/api/analytics/products';

beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/analytics/products (getProductAnalytics)', () => {
  async function seedData() {
    // Categorías y productos
    const catA = await createCategory({ name: 'Bebidas' });
    const catB = await createCategory({ name: 'Snacks' });

    const prodA = await createProduct({ name: 'Agua 600ml', categoryId: catA.id, price: 9.99 });
    const prodB = await createProduct({ name: 'Papas Onduladas', categoryId: catB.id, price: 12.49 });
    const prodC = await createProduct({ name: 'Galletas Vainilla', categoryId: catB.id, price: 6.99 });

    // Ventas válidas (PAID / COMPLETED)
    // A: 3 x $10 + 2 x $12 => totalSold=5, revenue=54
    await createOrderWithItem({
      status: 'PAID',
      productId: prodA.id,
      quantity: 3,
      price: 10,
      totalAmount: 30,
      createdAt: new Date('2025-01-02T10:00:00.000Z'),
    });
    await createOrderWithItem({
      status: 'COMPLETED',
      productId: prodA.id,
      quantity: 2,
      price: 12,
      totalAmount: 24,
      createdAt: new Date('2025-01-02T18:00:00.000Z'),
    });

    // B: 1 x $100 => totalSold=1, revenue=100
    await createOrderWithItem({
      status: 'PAID',
      productId: prodB.id,
      quantity: 1,
      price: 100,
      totalAmount: 100,
      createdAt: new Date('2025-01-02T12:00:00.000Z'),
    });

    // C: 4 x $5 => totalSold=4, revenue=20
    await createOrderWithItem({
      status: 'PAID',
      productId: prodC.id,
      quantity: 4,
      price: 5,
      totalAmount: 20,
      createdAt: new Date('2025-01-02T09:00:00.000Z'),
    });

    // Pedido que NO debe contar (por estado)
    await createOrderWithItem({
      status: 'CANCELLED', // o 'PENDING' según tu enum
      productId: prodC.id,
      quantity: 10,
      price: 5,
      totalAmount: 50,
      createdAt: new Date('2025-01-02T11:00:00.000Z'),
    });

    return { prodA, prodB, prodC, catA, catB };
  }

  const mapByName = (rows) =>
    rows.reduce((acc, r) => {
      acc[r.name] = r;
      return acc;
    }, {});

  it('200 - estructura y totales calculados correctamente', async () => {
    const { prodA, prodB, prodC } = await seedData();

    // sin sort => default 'highestSales'
    const res = await request(app).get(`${PATH}`).send();
    expect(res.status).toBe(200);

    const { sort, products } = res.body;
    expect(sort).toBe('highestSales');
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(3);

    // Estructura mínima por ítem
    for (const p of products) {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('image');     // puede ser null si no tienes imagen
      expect(p).toHaveProperty('category');
      expect(p).toHaveProperty('price');
      expect(p).toHaveProperty('totalSold');
      expect(p).toHaveProperty('revenue');
    }

    // Totales esperados por producto
    const byName = mapByName(products);
    expect(byName[prodA.name].totalSold).toBe(5);
    expect(byName[prodA.name].revenue).toBeCloseTo(54, 2);

    expect(byName[prodB.name].totalSold).toBe(1);
    expect(byName[prodB.name].revenue).toBeCloseTo(100, 2);

    expect(byName[prodC.name].totalSold).toBe(4);
    expect(byName[prodC.name].revenue).toBeCloseTo(20, 2);
  });

  it('ordenamiento: highestSales (default)', async () => {
    await seedData();

    const res = await request(app).get(`${PATH}`).send();
    expect(res.status).toBe(200);

    const names = res.body.products.map(p => p.name);
    // totalSold DESC: A(5), C(4), B(1)
    expect(names).toEqual(['Agua 600ml', 'Galletas Vainilla', 'Papas Onduladas']);
  });

  it('ordenamiento: lowestSales', async () => {
    await seedData();

    const res = await request(app).get(`${PATH}?sort=lowestSales`).send();
    expect(res.status).toBe(200);

    const names = res.body.products.map(p => p.name);
    // totalSold ASC: B(1), C(4), A(5)
    expect(names).toEqual(['Papas Onduladas', 'Galletas Vainilla', 'Agua 600ml']);
  });

  it('ordenamiento: highestEarnings', async () => {
    await seedData();

    const res = await request(app).get(`${PATH}?sort=highestEarnings`).send();
    expect(res.status).toBe(200);

    const names = res.body.products.map(p => p.name);
    // revenue DESC: B(100), A(54), C(20)
    expect(names).toEqual(['Papas Onduladas', 'Agua 600ml', 'Galletas Vainilla']);
  });

  it('ordenamiento: lowestEarnings', async () => {
    await seedData();

    const res = await request(app).get(`${PATH}?sort=lowestEarnings`).send();
    expect(res.status).toBe(200);

    const names = res.body.products.map(p => p.name);
    // revenue ASC: C(20), A(54), B(100)
    expect(names).toEqual(['Galletas Vainilla', 'Agua 600ml', 'Papas Onduladas']);
  });
});
