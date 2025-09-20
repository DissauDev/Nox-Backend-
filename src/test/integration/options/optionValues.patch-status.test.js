// src/test/integration/options/optionValues.patch-status.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

// Ajusta si tu ruta real es distinta
const PATH = '/api/option-values';

beforeEach(async () => {
  await truncateAll();
});

describe('PATCH /api/option-values/:valueId/status (patchOptionValueStatus)', () => {
  it('200 - actualiza isAvailable correctamente', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Sauces', required: true, minSelectable: 1, maxSelectable: 2, showImages: true },
    });
    const value = await prisma.optionValue.create({
      data: { groupId: group.id, name: 'Ketchup', extraPrice: 0, isAvailable: true },
    });

    const res = await request(app)
      .patch(`${PATH}/${encodeURIComponent(value.id)}/status`)
      .send({ isAvailable: false });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: value.id, isAvailable: false });

    const inDb = await prisma.optionValue.findUnique({ where: { id: value.id } });
    expect(inDb.isAvailable).toBe(false);
  });

  it('400 - isAvailable debe ser boolean', async () => {
    const group = await prisma.optionGroup.create({
      data: { name: 'Sizes', required: true, minSelectable: 1, maxSelectable: 3, showImages: false },
    });
    const value = await prisma.optionValue.create({
      data: { groupId: group.id, name: 'Large', extraPrice: 1.5, isAvailable: true },
    });

    const res = await request(app)
      .patch(`${PATH}/${encodeURIComponent(value.id)}/status`)
      .send({ isAvailable: 'yes' });

    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/must be boolean/i);
  });

  it('404 - devuelve 404 si el option value no existe', async () => {
    const res = await request(app)
      .patch(`${PATH}/00000000-0000-0000-0000-000000000000/status`)
      .send({ isAvailable: true });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/not found/i);
  });
});
