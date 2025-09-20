// src/test/integration/options/optionValues.create.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/option-group';

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/option-group/:groupId/values (createOptionValue)', () => {
  it('201 - crea un OptionValue básico con extraPrice por defecto (=0)', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Sizes', required: true, minSelectable: 1, maxSelectable: 3, showImages: true },
    });

    const body = { name: 'Small' }; // sin extraPrice → 0
    const res = await request(app)
      .post(`${PATH}/${group.id}/values`)
      .send(body);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Small');
    expect(res.body.groupId).toBe(group.id);
    expect(Number(res.body.extraPrice)).toBeCloseTo(0, 2);

    // Sanity en BD
    const inDb = await prisma.optionValue.findUnique({ where: { id: res.body.id } });
    expect(inDb).not.toBeNull();
    expect(inDb.name).toBe('Small');
    expect(inDb.groupId).toBe(group.id);
    expect(Number(inDb.extraPrice)).toBeCloseTo(0, 2);
  });

  it('201 - acepta extraPrice como string numérico y lo castea', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Drinks', required: false, minSelectable: 0, maxSelectable: 5, showImages: false },
    });

    const res = await request(app)
      .post(`${PATH}/${group.id}/values`)
      .send({ name: 'Large', extraPrice: '1.25', description: 'big cup' });

    expect(res.status).toBe(201);
    expect(Number(res.body.extraPrice)).toBeCloseTo(1.25, 2);
    expect(res.body.description).toBe('big cup');
  });

  it('400 - falta name', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Extras', required: true, minSelectable: 0, maxSelectable: 3, showImages: false },
    });

    const res = await request(app)
      .post(`${PATH}/${group.id}/values`)
      .send({ extraPrice: 1 });

    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/name is required/i);
  });

  it('400 - extraPrice inválido o negativo', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Sauces', required: false, minSelectable: 0, maxSelectable: 5, showImages: false },
    });

    const r1 = await request(app)
      .post(`${PATH}/${group.id}/values`)
      .send({ name: 'BBQ', extraPrice: 'abc' });
    expect(r1.status).toBe(400);
    expect(String(r1.body.message || '')).toMatch(/extraPrice/i);

    const r2 = await request(app)
      .post(`${PATH}/${group.id}/values`)
      .send({ name: 'Ketchup', extraPrice: -1 });
    expect(r2.status).toBe(400);
    expect(String(r2.body.message || '')).toMatch(/extraPrice/i);
  });

  it('404 - grupo inexistente', async () => {
    const res = await request(app)
      .post(`${PATH}/00000000-0000-0000-0000-000000000000/values`)
      .send({ name: 'Ghost', extraPrice: 0 });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/option group not found/i);
  });

  it('409 - nombre duplicado dentro del mismo grupo', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Toppings', required: false, minSelectable: 0, maxSelectable: 10, showImages: true },
    });

    const body = { name: 'Cheese', extraPrice: 0.5 };

    const r1 = await request(app).post(`${PATH}/${group.id}/values`).send(body);
    expect(r1.status).toBe(201);

    const r2 = await request(app).post(`${PATH}/${group.id}/values`).send(body);
    expect(r2.status).toBe(409);
    expect(String(r2.body.message || '')).toMatch(/already exists/i);
  });
});
