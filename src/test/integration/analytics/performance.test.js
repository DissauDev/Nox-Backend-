// src/test/integration/analytics/performance.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils'); // <- importa prisma para fijar TZ
const {
  createCategory,
  createProduct,
  createOrderWithItem,
} = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/analytics/performance';

// Helpers
const iso = (d) => new Date(d).toISOString();

// Forzar la sesión de Postgres a UTC para que [start,end) case EXACTO
beforeAll(async () => {
  await prisma.$executeRawUnsafe(`SET TIME ZONE 'UTC'`);
});

beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/analytics/performance (getPerformance)', () => {
  it('400 - si faltan parámetros', async () => {
    const res = await request(app).get(`${PATH}?start=2024-01-01`).send();
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/missing date range/i);
  });

  it('400 - fechas inválidas', async () => {
    const qs = `start=not-a-date&end=also-bad&compareStart=foo&compareEnd=bar`;
    const res = await request(app).get(`${PATH}?${qs}`).send();
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid date/i);
  });

  it('200 - agrega métricas y tendencias entre ventana actual vs previa', async () => {
    // Ventanas fijas en UTC (semi-abiertas [start, end))
    const prevStart = new Date('2025-01-01T00:00:00.000Z');
    const prevEnd   = new Date('2025-01-02T00:00:00.000Z'); // exclusivo
    const start     = new Date('2025-01-02T00:00:00.000Z');
    const end       = new Date('2025-01-03T00:00:00.000Z'); // exclusivo

    // Datos base
    const cat  = await createCategory({ name: 'Perf Cat' });
    const prod = await createProduct({ categoryId: cat.id, name: 'Perf Prod', price: 50 });

    // Órdenes ACTUALES (cuentan PAID/COMPLETED)
    await createOrderWithItem({
      status: 'PAID',
      createdAt: new Date('2025-01-02T06:00:00.000Z'), // dentro de [start,end)
      productId: prod.id,
      quantity: 2,
      price: 60,
      totalAmount: 120,
    });
    await createOrderWithItem({
      status: 'PAID',
      createdAt: new Date('2025-01-02T22:00:00.000Z'), // dentro de [start,end)
      productId: prod.id,
      quantity: 2,
      price: 40,
      totalAmount: 80,
    });

    // Órdenes PREVIAS
    await createOrderWithItem({
      status: 'PAID',
      createdAt: new Date('2025-01-01T21:00:00.000Z'), // dentro de [prevStart,prevEnd)
      productId: prod.id,
      quantity: 3,
      price: 25,
      totalAmount: 75,
    });
    await createOrderWithItem({
      status: 'COMPLETED',
      createdAt: new Date('2025-01-01T02:00:00.000Z'), // dentro de [prevStart,prevEnd)
      productId: prod.id,
      quantity: 1,
      price: 50,
      totalAmount: 50,
    });

    // (Opcional) sanity check directo a BD para detectar drift de fechas
    const sumCur = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ['PAID','COMPLETED'] }, createdAt: { gte: start, lt: end } },
    });
    const sumPrev = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ['PAID','COMPLETED'] }, createdAt: { gte: prevStart, lt: prevEnd } },
    });
    expect(Number(sumCur._sum.totalAmount || 0)).toBeCloseTo(200, 2);
    expect(Number(sumPrev._sum.totalAmount || 0)).toBeCloseTo(125, 2);

    const q = [
      `start=${iso(start)}`,
      `end=${iso(end)}`,
      `compareStart=${iso(prevStart)}`,
      `compareEnd=${iso(prevEnd)}`,
    ].join('&');

    const res = await request(app).get(`${PATH}?${q}`).send();
    expect(res.status).toBe(200);

    const body = res.body;

    // Estructura
    expect(body).toHaveProperty('totalSales');
    expect(body).toHaveProperty('orders');
    expect(body).toHaveProperty('productsSold');
    expect(body).toHaveProperty('variationsSold');
    expect(body).toHaveProperty('trends');
    expect(body.trends).toHaveProperty('sales');
    expect(body.trends).toHaveProperty('orders');

    // Totales esperados
    expect(body.totalSales.current).toBeCloseTo(200, 2);
    expect(body.totalSales.previous).toBeCloseTo(125, 2);
    expect(body.orders.current).toBe(2);
    expect(body.orders.previous).toBe(2);
    expect(body.productsSold.current).toBe(4);
    expect(body.productsSold.previous).toBe(4);
    expect(body.variationsSold.current).toBe(0);
    expect(body.variationsSold.previous).toBe(0);

    // PctChange son números
    ['pctChange'].forEach(k => {
      expect(typeof body.totalSales[k]).toBe('number');
      expect(typeof body.orders[k]).toBe('number');
      expect(typeof body.productsSold[k]).toBe('number');
      expect(typeof body.variationsSold[k]).toBe('number');
    });

    // Tendencias suman los totales
    const sumTrend = (arr, key) => arr.reduce((acc, p) => acc + Number(p[key] || 0), 0);
    expect(sumTrend(body.trends.sales,  'current')).toBeCloseTo(200, 2);
    expect(sumTrend(body.trends.sales,  'compare')).toBeCloseTo(125, 2);
    expect(sumTrend(body.trends.orders, 'current')).toBeCloseTo(2, 2);
    expect(sumTrend(body.trends.orders, 'compare')).toBeCloseTo(2, 2);
  });
});
