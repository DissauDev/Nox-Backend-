// src/test/integration/analytics/salesTrends.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const {
  createCategory,
  createProduct,
  createOrderWithItem,
} = require('../../factories');

const app = buildApp();
jest.setTimeout(30000);

const PATH = '/api/analytics/sales-trend';

// Util para sumar
const sum = (arr) => arr.reduce((a, n) => a + Number(n || 0), 0);

// Forzar la sesión de Postgres a UTC como en performance.test
beforeAll(async () => {
  await prisma.$executeRawUnsafe(`SET TIME ZONE 'UTC'`);
});

beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/analytics/sales-trend (getSalesTrend)', () => {
  /**
   * Siembras controladas RELATIVAS al "now" real del proceso.
   * Devuelve el "manifest" de lo creado para calcular el esperado sin tocar la BD.
   * Estados deterministas (sin Math.random) para que el test sea estable.
   */
  async function seedRelative() {
    const now = new Date(); // mismo concepto de "now" que usa el handler
    const cat = await createCategory({ name: 'Trend Cat' });
    const prod = await createProduct({ categoryId: cat.id, name: 'Trend Prod', price: 10 });

    const created = [
      // --- Dentro de DAY (<< 24h) ---
      { amt: 50,  at: new Date(now.getTime() - 1 * 60 * 60 * 1000), status: 'PAID'      }, // -1h
      { amt: 75,  at: new Date(now.getTime() - 2 * 60 * 60 * 1000), status: 'COMPLETED' }, // -2h

      // CANCELLED dentro de DAY (no debe contar)
      { amt: 999, at: new Date(now.getTime() - 3 * 60 * 60 * 1000), status: 'CANCELLED' },

      // --- Dentro de WEEK / MONTH (pero fuera de DAY) ---
      { amt: 30,  at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), status: 'PAID'      }, // -3d
      { amt: 20,  at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), status: 'COMPLETED' }, // -5d

      // --- Dentro de 6 MONTHS / YEAR (fuera de Month) ---
      { amt: 200, at: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), status: 'PAID' },   // ~ -3 months
    ];

    for (const row of created) {
      await createOrderWithItem({
        status: row.status,
        productId: prod.id,
        quantity: 1,
        price: row.amt,
        totalAmount: row.amt,
        createdAt: row.at,
      });
    }

    return { now, created };
  }

  // Aplica la misma lógica de ventanas que el handler
  function periodStart(now, period) {
    const d = new Date(now);
    switch (period) {
      case 'Week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'Month':
        d.setMonth(d.getMonth() - 1);
        return d;
      case '6 Months':
        d.setMonth(d.getMonth() - 6);
        return d;
      case 'Year':
        d.setFullYear(d.getFullYear() - 1);
        return d;
      case 'All':
        return new Date(0);
      default: // Day
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  }

  // Calcula el esperado SOLO con lo sembrado (sin volver a consultar la BD)
  // Importante: ventana semi-abierta [start, now) para cuadrar con el handler.
  function expectedTotal(created, start, now) {
    return sum(
      created
        .filter(r => r.status === 'PAID' || r.status === 'COMPLETED') // solo válidos
        .filter(r => r.at >= start && r.at < now)                     // [start, now)
        .map(r => r.amt)
    );
  }

  async function assertPeriod(period) {
    const { now, created } = await seedRelative();
    const start = periodStart(now, period);
    const expected = expectedTotal(created, start, now);

    const qs = period ? `?period=${encodeURIComponent(period)}` : '';
    const res = await request(app).get(`${PATH}${qs}`).send();

    expect(res.status).toBe(200);
    expect(res.body.period).toBe(period || 'Day');
    expect(Array.isArray(res.body.data)).toBe(true);

    const apiSum = sum(res.body.data.map(r => r.sales));
    expect(apiSum).toBeCloseTo(expected, 2);

    // Smoke sobre formato de etiquetas
    if (res.body.data.length > 0) {
      expect(typeof res.body.data[0].time).toBe('string');
    }
  }

  it('200 - Day (default): suma coincide con lo sembrado en <24h', async () => {
    await assertPeriod(undefined);
  });

  it('200 - Week: suma coincide con lo sembrado en <7d', async () => {
    await assertPeriod('Week');
  });

  it('200 - Month: suma coincide con lo sembrado en <1 mes', async () => {
    await assertPeriod('Month');
  });

  it('200 - 6 Months: suma coincide con lo sembrado en <6 meses', async () => {
    await assertPeriod('6 Months');
  });

  it('200 - Year: suma coincide con lo sembrado en <1 año', async () => {
    await assertPeriod('Year');
  });

  it('200 - All: suma coincide con todo lo sembrado válido', async () => {
    await assertPeriod('All');
  });
});
