// src/test/integration/options/optionValues.bulk-delete-by-name.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

// Ajusta este path si registraste la ruta con otro prefijo
const PATH = '/api/option-values/bulk-delete-by-name';

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/option-values/bulk-delete-by-name (bulkDeleteOptionValuesByName)', () => {
  it('200 - borra globalmente todas las OptionValue con name="purple" (case-insensitive) y limpia los pivotes', async () => {
    // Seed mínimo consistente con tu schema
    const cat = await prisma.category.create({
      data: {
        name: 'TestCat',
        imageUrl: 'x',
        shortDescription: 'x',
        longDescription: 'x',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'TestProduct',
        price: 10,
        categoryId: cat.id,
      },
    });

    const g1 = await prisma.optionGroup.create({
      data: { name: 'vdvd', minSelectable: 2, maxSelectable: 3 },
    });
    const g2 = await prisma.optionGroup.create({
      data: { name: 'nuew', minSelectable: 2, maxSelectable: 3 },
    });

    const po1 = await prisma.productOption.create({
      data: { productId: product.id, groupId: g1.id },
    });
    const po2 = await prisma.productOption.create({
      data: { productId: product.id, groupId: g2.id },
    });

    // Valores: uno “dsds” (queda), dos “purple” (se borran, con casing distinto)
    const ovOther = await prisma.optionValue.create({
      data: { groupId: g1.id, name: 'dsds', extraPrice: 0, description: 'x' },
    });
    const ovPurple1 = await prisma.optionValue.create({
      data: { groupId: g1.id, name: 'purple', extraPrice: 0, description: 'x' },
    });
    const ovPurple2 = await prisma.optionValue.create({
      data: { groupId: g2.id, name: 'PuRpLe', extraPrice: 0, description: 'x' },
    });

    // Pivotes que deben eliminarse también
    await prisma.productOptionValue.create({
      data: { productOptionId: po1.id, valueId: ovPurple1.id },
    });
    await prisma.productOptionValue.create({
      data: { productOptionId: po2.id, valueId: ovPurple2.id },
    });

    // Precondición
    const beforeCount = await prisma.optionValue.count({
      where: { name: { equals: 'purple', mode: 'insensitive' } },
    });
    expect(beforeCount).toBe(2);

    // Llamada al endpoint
    const res = await request(app).post(PATH).send({ name: 'purple' });

    expect(res.status).toBe(200);
    // La respuesta de tu handler exitoso trae "deleted"
    expect(res.body).toHaveProperty('deleted.optionValueCount', 2);
    expect(res.body).toHaveProperty('deleted.productOptionValueCount', 2);

    // Verificaciones en BD
    const afterCount = await prisma.optionValue.count({
      where: { name: { equals: 'purple', mode: 'insensitive' } },
    });
    expect(afterCount).toBe(0);

    const stillOther = await prisma.optionValue.findUnique({ where: { id: ovOther.id } });
    expect(stillOther).not.toBeNull();

    const pivotesRestantes = await prisma.productOptionValue.count({
      where: { valueId: { in: [ovPurple1.id, ovPurple2.id] } },
    });
    expect(pivotesRestantes).toBe(0);
  });

  it('200 - dryRun no borra, solo reporta', async () => {
    const g = await prisma.optionGroup.create({
      data: { name: 'G', minSelectable: 1, maxSelectable: 1 },
    });
    await prisma.optionValue.create({
      data: { groupId: g.id, name: 'purple', extraPrice: 0, description: '' },
    });

    const res = await request(app).post(PATH).send({ name: 'PuRple', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('dryRun', true);
    expect(res.body).toHaveProperty('wouldDelete.optionValueCount', 1);

    const stillThere = await prisma.optionValue.count({
      where: { name: { equals: 'purple', mode: 'insensitive' } },
    });
    expect(stillThere).toBe(1);
  });

  it('200 - sin matches devuelve count=0 y nota', async () => {
    const r = await request(app).post(PATH).send({ name: 'nope' });
    expect(r.status).toBe(200);
    // Tu handler devuelve { count: 0, note, matches: [] } cuando no hay candidatos
    expect(r.body).toHaveProperty('count', 0);
    expect(String(r.body.note || '')).toMatch(/no matches/i);
  });

  it('400 - valida parámetros (name faltante o vacío)', async () => {
    let r = await request(app).post(PATH).send({});
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/provide "name" string/i);

    r = await request(app).post(PATH).send({ name: '   ' });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/non-empty "name"/i);
  });
});
