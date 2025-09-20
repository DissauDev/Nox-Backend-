// src/test/integration/options/optionValues.bulk-status.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/option-values/bulk-status';

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/option-values/bulk-status (bulkUpdateOptionValuesStatus)', () => {
  it('200 - actualiza por nombre (case-insensitive + trim) en múltiples grupos', async () => {
    // Grupos
    const g1 = await prisma.optionGroup.create({ data: { name: 'Toppings' } });
    const g2 = await prisma.optionGroup.create({ data: { name: 'Extras' } });

    // Valores: cuidado con espacios y mayúsculas
    const v1 = await prisma.optionValue.create({ data: { groupId: g1.id, name: '  Bacon  ', extraPrice: 1, isAvailable: true }});
    const v2 = await prisma.optionValue.create({ data: { groupId: g1.id, name: 'Cheese',    extraPrice: 1, isAvailable: true }});
    const v3 = await prisma.optionValue.create({ data: { groupId: g2.id, name: 'bacon',     extraPrice: 1, isAvailable: true }});
    const v4 = await prisma.optionValue.create({ data: { groupId: g2.id, name: 'Onion',     extraPrice: 0.5, isAvailable: true }});

    // Update: Bacon (con espacios) y Onion -> deberían impactar v1, v3 y v4
    const res = await request(app).post(PATH).send({
      isAvailable: false,
      name: ['  Bacon  ', 'Onion'],
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('count', 3);

    // Verifica en BD
    const [nv1, nv2, nv3, nv4] = await Promise.all([
      prisma.optionValue.findUnique({ where: { id: v1.id } }),
      prisma.optionValue.findUnique({ where: { id: v2.id } }),
      prisma.optionValue.findUnique({ where: { id: v3.id } }),
      prisma.optionValue.findUnique({ where: { id: v4.id } }),
    ]);

    expect(nv1.isAvailable).toBe(false); // Bacon
    expect(nv3.isAvailable).toBe(false); // bacon
    expect(nv4.isAvailable).toBe(false); // Onion
    expect(nv2.isAvailable).toBe(true);  // Cheese sin tocar
  });

  it('200 - acepta string único y devuelve count', async () => {
    const g = await prisma.optionGroup.create({ data: { name: 'G' } });
    const v = await prisma.optionValue.create({ data: { groupId: g.id, name: 'Garlic', extraPrice: 0.2, isAvailable: true }});

    const r = await request(app).post(PATH).send({ isAvailable: false, name: 'garlic' });
    expect(r.status).toBe(200);
    expect(r.body.count).toBe(1);

    const nv = await prisma.optionValue.findUnique({ where: { id: v.id } });
    expect(nv.isAvailable).toBe(false);
  });

  it('200 - sin matches devuelve count=0 y nota', async () => {
    const r = await request(app).post(PATH).send({ isAvailable: true, name: 'nope' });
    expect(r.status).toBe(200);
    expect(r.body.count).toBe(0);
    expect(String(r.body.note || '')).toMatch(/no matches/i);
  });

  it('400 - valida tipos y presencia de parámetros', async () => {
    // isAvailable no boolean
    let r = await request(app).post(PATH).send({ isAvailable: 'yes', name: 'x' });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/boolean/i);

    // falta name
    r = await request(app).post(PATH).send({ isAvailable: true });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/provide name/i);

    // name array vacío
    r = await request(app).post(PATH).send({ isAvailable: true, name: [] });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/provide name/i);
  });
});
