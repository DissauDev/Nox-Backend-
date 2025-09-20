// src/test/integration/options/optionValues.bulk-clone.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory, createProduct } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/option-values/bulk-clone';

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/option-values/bulk-clone (bulkCloneOptionValue)', () => {
  it('200 - modo A (sourceValueId): crea en múltiples grupos, luego salta y luego sobreescribe', async () => {
    const g1 = await prisma.optionGroup.create({ data: { name: 'G1' } });
    const g2 = await prisma.optionGroup.create({ data: { name: 'G2' } });
    const sourceGroup = await prisma.optionGroup.create({ data: { name: 'SRC' } });

    const src = await prisma.optionValue.create({
      data: { groupId: sourceGroup.id, name: 'Basil', extraPrice: 0.3, description: 'fresh' },
    });

    // 1) Primera vez: no hay conflicto → created=2
    let r = await request(app).post(PATH).send({
      sourceValueId: src.id,
      targetGroupIds: [g1.id, g2.id],
    });
    expect(r.status).toBe(200);
    expect(r.body.created).toBe(2);
    expect(r.body.updated).toBe(0);
    expect(r.body.skipped).toBe(0);

    // 2) Segunda vez: ya existen por nombre → skipped=2
    r = await request(app).post(PATH).send({
      sourceValueId: src.id,
      targetGroupIds: [g1.id, g2.id],
      onConflict: 'skip',
    });
    expect(r.status).toBe(200);
    expect(r.body.skipped).toBe(2);

    // 3) Overwrite: cambia algo en la fuente y aplica
    await prisma.optionValue.update({
      where: { id: src.id },
      data: { extraPrice: 0.9, description: 'very fresh' },
    });
    r = await request(app).post(PATH).send({
      sourceValueId: src.id,
      targetGroupIds: [g1.id, g2.id],
      onConflict: 'overwrite',
    });
    expect(r.status).toBe(200);
    expect(r.body.updated).toBe(2);

    // Verifica que extraPrice cambió en g1 y g2
    const check = await prisma.optionValue.findMany({
      where: { groupId: { in: [g1.id, g2.id] }, name: { equals: 'Basil', mode: 'insensitive' } },
    });
    expect(check.length).toBe(2);
    check.forEach(v => {
      expect(v.extraPrice).toBeCloseTo(0.9, 2);
      expect(v.isAvailable).toBe(true);
    });
  });

  it('200 - modo B (template): crea desde plantilla', async () => {
    const g1 = await prisma.optionGroup.create({ data: { name: 'G1' } });

    const r = await request(app).post(PATH).send({
      template: { name: 'Garlic', extraPrice: 0.5, description: 'clove' },
      targetGroupIds: [g1.id],
    });

    expect(r.status).toBe(200);
    expect(r.body.created).toBe(1);
    expect(r.body.results[0].action).toBe('created');

    const v = await prisma.optionValue.findFirst({
      where: { groupId: g1.id, name: { equals: 'Garlic', mode: 'insensitive' } },
    });
    expect(v).not.toBeNull();
    expect(v.extraPrice).toBeCloseTo(0.5, 2);
  });

  it('200 - matchBy=productRefId: salta si ya existe por productRefId, y con overwrite actualiza', async () => {
    const cat = await createCategory({ name: 'Sauces' });
    const product = await createProduct({ categoryId: cat.id, name: 'Aioli', price: 2, status: 'AVAILABLE' });

    const srcGroup = await prisma.optionGroup.create({ data: { name: 'SRC' } });
    const src = await prisma.optionValue.create({
      data: { groupId: srcGroup.id, name: 'Aioli', productRefId: product.id, extraPrice: 0.2, description: 'orig' },
    });

    const g = await prisma.optionGroup.create({
      data: {
        name: 'Target',
        OptionValue: {
          create: [{ name: 'Different Name', productRefId: product.id, extraPrice: 0.1, description: 'old' }],
        },
      },
      include: { OptionValue: true },
    });

    // 1) matchBy productRefId → ya existe en g, así que skip
    let r = await request(app).post(PATH).send({
      sourceValueId: src.id,
      targetGroupIds: [g.id],
      matchBy: 'productRefId',
      onConflict: 'skip',
    });
    expect(r.status).toBe(200);
    expect(r.body.skipped).toBe(1);

    // 2) overwrite → debe actualizar extraPrice/description, conservando productRefId
    r = await request(app).post(PATH).send({
      sourceValueId: src.id,
      targetGroupIds: [g.id],
      matchBy: 'productRefId',
      onConflict: 'overwrite',
    });
    expect(r.status).toBe(200);
    expect(r.body.updated).toBe(1);

    const after = await prisma.optionValue.findFirst({
      where: { groupId: g.id, productRefId: product.id },
    });
    expect(after.extraPrice).toBeCloseTo(0.2, 2);
    expect(after.description).toBe('orig');
  });

  it('400/404 - validaciones varias', async () => {
    // Falta targetGroupIds
    let r = await request(app).post(PATH).send({
      sourceValueId: 'x',
    });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/targetGroupIds/i);

    // Falta sourceValueId y template.name
    r = await request(app).post(PATH).send({
      targetGroupIds: ['x'],
    });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/Provide either sourceValueId/i);

    // sourceValueId inexistente -> 404
    r = await request(app).post(PATH).send({
      sourceValueId: '00000000-0000-0000-0000-000000000000',
      targetGroupIds: ['11111111-1111-1111-1111-111111111111'],
    });
    expect(r.status).toBe(404);

    // onConflict inválido
    const g = await prisma.optionGroup.create({ data: { name: 'X' } });
    r = await request(app).post(PATH).send({
      template: { name: 'Chili' },
      targetGroupIds: [g.id],
      onConflict: 'replace',
    });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/onConflict/i);

    // matchBy inválido
    r = await request(app).post(PATH).send({
      template: { name: 'Chili' },
      targetGroupIds: [g.id],
      matchBy: 'sku',
    });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/matchBy/i);
  });
});
