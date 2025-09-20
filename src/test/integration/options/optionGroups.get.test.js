const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory, createProduct } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/option-group';

beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/option-group (getAllOptionGroups) & GET /api/option-group/:groupId (getOptionGroupById)', () => {
  it('200 - lista todos con _count y ordenados por nombre', async () => {
    // G1 con 2 valores
    const g1 = await prisma.optionGroup.create({
      data: {
        name: 'Add-ons',
        required: true,
        minSelectable: 0,
        maxSelectable: 3,
        showImages: false,
        OptionValue: {
          create: [
            { name: 'Bacon', extraPrice: 1.5 },
            { name: 'Cheese', extraPrice: 1.0 },
          ],
        },
      },
      include: { OptionValue: true },
    });

    // G2 con 1 valor
    const g2 = await prisma.optionGroup.create({
      data: {
        name: 'Sauces',
        required: false,
        minSelectable: 0,
        maxSelectable: 2,
        showImages: true,
        OptionValue: {
          create: [{ name: 'BBQ', extraPrice: 0.3 }],
        },
      },
      include: { OptionValue: true },
    });

    // Un productOption para g1
    const cat = await createCategory({ name: 'Burgers' });
    const prod = await createProduct({
      categoryId: cat.id,
      name: 'Cheese Burger',
      price: 9.99,
      status: 'AVAILABLE',
    });
    await prisma.productOption.create({
      data: { productId: prod.id, groupId: g1.id },
    });

    const res = await request(app).get(PATH).send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);

    // map por id para aserciones sin depender del orden
    const byId = Object.fromEntries(res.body.map(g => [g.id, g]));

    expect(byId[g1.id]).toBeTruthy();
    expect(byId[g1.id]._count.OptionValue).toBe(2);
    expect(byId[g1.id]._count.productOptions).toBe(1);

    expect(byId[g2.id]).toBeTruthy();
    expect(byId[g2.id]._count.OptionValue).toBe(1);
    expect(byId[g2.id]._count.productOptions).toBe(0);
  });

  it('200 - get by id incluye OptionValue y productOptions (select)', async () => {
    const g = await prisma.optionGroup.create({
      data: {
        name: 'Toppings',
        required: true,
        minSelectable: 0,
        maxSelectable: 2,
        showImages: false,
        OptionValue: {
          create: [
            { name: 'Onion', extraPrice: 0.2 },
            { name: 'Tomato', extraPrice: 0.25 },
          ],
        },
      },
      include: { OptionValue: true },
    });

    const cat = await createCategory({ name: 'Sandwiches' });
    const prod = await createProduct({
      categoryId: cat.id,
      name: 'BLT',
      price: 8.0,
      status: 'AVAILABLE',
    });
    const po = await prisma.productOption.create({
      data: { productId: prod.id, groupId: g.id },
    });

    const res = await request(app).get(`${PATH}/${encodeURIComponent(g.id)}`).send();
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(g.id);
    expect(Array.isArray(res.body.OptionValue)).toBe(true);
    expect(res.body.OptionValue.length).toBe(2);

    expect(Array.isArray(res.body.productOptions)).toBe(true);
    expect(res.body.productOptions.length).toBe(1);
    expect(res.body.productOptions[0].id).toBe(po.id);
    expect(res.body.productOptions[0].productId).toBe(prod.id);
  });

  it('404 - get by id devuelve 404 si no existe', async () => {
    const res = await request(app)
      .get(`${PATH}/00000000-0000-0000-0000-000000000000`)
      .send();
    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/option group not found/i);
  });
});
