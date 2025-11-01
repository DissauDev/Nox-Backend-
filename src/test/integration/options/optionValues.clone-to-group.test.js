// src/test/integration/options/optionValues.clone-to-group.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory, createProduct } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

const BASE = '/api/option-values'; // ajusta si tu router usa otro prefijo

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/option-values/:valueId/clone-to-group (cloneOptionValueToGroup)', () => {
  it('201 - clona el OptionValue a otro grupo, preserva productRefId y permite override', async () => {
    // Grupo fuente y destino
    const gSrc = await prisma.optionGroup.create({ data: { name: 'Source Group', required: true } });
    const gDst = await prisma.optionGroup.create({ data: { name: 'Target Group', required: false } });

    // Creamos un producto para referenciarlo desde el OptionValue
    const cat = await createCategory({ name: 'Sauces' });
    const prod = await createProduct({
      categoryId: cat.id,
      name: 'Aioli',
      price: 2.5,
      status: 'AVAILABLE',
    });

    // OptionValue fuente
    const src = await prisma.optionValue.create({
      data: {
        groupId: gSrc.id,
        name: 'Garlic Mayo',
        extraPrice: 0.4,
        imageUrl: 'https://img/garlic.jpg',
        description: 'original',
        productRefId: prod.id,
        isAvailable: true,
      },
    });

    // Clon con overrides parciales
    const body = {
      targetGroupId: gDst.id,
      override: {
        name: 'Garlic Mayo (clone)',
        extraPrice: 0.75,
        // imageUrl omitido -> hereda de source
        description: 'better',
      },
    };

    const res = await request(app)
      .post(`${BASE}/${encodeURIComponent(src.id)}/clone-to-group`)
      .send(body);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.groupId).toBe(gDst.id);
    expect(res.body.name).toBe('Garlic Mayo (clone)');
    expect(res.body.extraPrice).toBeCloseTo(0.75, 2);
    expect(res.body.imageUrl).toBe('https://img/garlic.jpg'); // heredado
    expect(res.body.description).toBe('better');
    expect(res.body.productRefId).toBe(prod.id);
    expect(res.body.isAvailable).toBe(true);

    // Sanity en BD
    const inDb = await prisma.optionValue.findUnique({ where: { id: res.body.id } });
    expect(inDb).not.toBeNull();
    expect(inDb.groupId).toBe(gDst.id);
  });

  it('404 - si el OptionValue fuente no existe', async () => {
    const gDst = await prisma.optionGroup.create({ data: { name: 'Target' } });

    const res = await request(app)
      .post(`${BASE}/00000000-0000-0000-0000-000000000000/clone-to-group`)
      .send({ targetGroupId: gDst.id });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/source optionvalue not found/i);
  });

  it('404 - si el grupo destino no existe', async () => {
    const gSrc = await prisma.optionGroup.create({ data: { name: 'Source' } });
    const src = await prisma.optionValue.create({
      data: { groupId: gSrc.id, name: 'Chili', extraPrice: 0.2 },
    });

    const res = await request(app)
      .post(`${BASE}/${encodeURIComponent(src.id)}/clone-to-group`)
      .send({ targetGroupId: '00000000-0000-0000-0000-000000000000' });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/target group not found/i);
  });

  it('400 - valida body: falta targetGroupId, override debe ser objeto', async () => {
    const gSrc = await prisma.optionGroup.create({ data: { name: 'SRC' } });
    const src = await prisma.optionValue.create({
      data: { groupId: gSrc.id, name: 'BBQ', extraPrice: 0.3 },
    });

    // Falta targetGroupId
    let r = await request(app)
      .post(`${BASE}/${encodeURIComponent(src.id)}/clone-to-group`)
      .send({});
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/targetgroupid.*required/i);

    // override no es objeto
    r = await request(app)
      .post(`${BASE}/${encodeURIComponent(src.id)}/clone-to-group`)
      .send({ targetGroupId: gSrc.id, override: 'not-an-object' });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/override.*object/i);
  });

  it('201 - si no hay override, hereda todo del source (incluye image/description/extraPrice)', async () => {
    const g1 = await prisma.optionGroup.create({ data: { name: 'G1' } });
    const g2 = await prisma.optionGroup.create({ data: { name: 'G2' } });

    const src = await prisma.optionValue.create({
      data: {
        groupId: g1.id,
        name: 'Herb',
        extraPrice: 0.15,
        imageUrl: 'https://img/herb.png',
        description: 'herb desc',
        isAvailable: false, // el clon fuerza true en el handler
      },
    });

    const res = await request(app)
      .post(`${BASE}/${encodeURIComponent(src.id)}/clone-to-group`)
      .send({ targetGroupId: g2.id });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Herb');
    expect(res.body.extraPrice).toBeCloseTo(0.15, 2);
    expect(res.body.imageUrl).toBe('https://img/herb.png');
    expect(res.body.description).toBe('herb desc');
    expect(res.body.isAvailable).toBe(true);
  });
});
