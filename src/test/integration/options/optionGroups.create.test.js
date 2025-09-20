// src/test/integration/options/optionGroups.create.test.js
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

describe('POST /api/option-group (createOptionGroup)', () => {
  it('201 - crea grupo simple (sin categoría ni clon)', async () => {
    const body = {
      name: 'Sizes',
      required: true,
      categoryId: null,          // fuerza rama simple
      optionGroupIdToClone: null,
      maxSelectable: 2,
    };

    const res = await request(app).post(PATH).send(body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Sizes');
    expect(res.body.showImages).toBe(true);         // showImages hereda de required
    expect(typeof res.body.minSelectable).toBe('number');

    const og = await prisma.optionGroup.findUnique({ where: { id: res.body.id } });
    expect(og).not.toBeNull();
    expect(og.name).toBe('Sizes');
  });

  it('404 - clonar falla si el grupo original no tiene OptionValue', async () => {
    const original = await prisma.optionGroup.create({
      data: { name: 'Empty', required: false, minSelectable: 1, maxSelectable: 1, showImages: false },
    });

    const res = await request(app).post(PATH).send({
      optionGroupIdToClone: original.id,
      categoryId: null,
      name: 'Empty Copy',
      required: false,
    });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/no option values/i);
  });

  it('201 - clona desde otro grupo con valores', async () => {
    const base = await prisma.optionGroup.create({
      data: {
        name: 'Base',
        required: true,
        minSelectable: 1,
        maxSelectable: 3,
        showImages: true,
        OptionValue: {
          create: [
            { name: 'A', extraPrice: 0 },
            { name: 'B', extraPrice: 1.5, description: 'desc B' },
            { name: 'C', extraPrice: 2 },
          ],
        },
      },
    });

    const res = await request(app).post(PATH).send({
      optionGroupIdToClone: base.id,
      categoryId: null,
      name: 'Base Copy',
      required: false,
      showImages: false,
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Base Copy');

    const clonedValues = await prisma.optionValue.findMany({ where: { groupId: res.body.id } });
    expect(clonedValues.length).toBe(3);
    const names = clonedValues.map(v => v.name).sort();
    expect(names).toEqual(['A', 'B', 'C']);
  });

  it('404 - crear desde categoría falla si no hay productos válidos', async () => {
    const cat = await createCategory({ name: 'Cat No Items' });

    const res = await request(app).post(PATH).send({
      categoryId: cat.id,
      optionGroupIdToClone: null,
      name: 'From Cat',
      required: true,
    });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/no products found/i);
  });

  // ← AQUÍ: antes estaba "it.skip". Ahora activado.
  it('201 - crea grupo desde categoría con productos AVAILABLE + isOptionItem', async () => {
    const cat = await createCategory({ name: 'Combos' });

    const p1 = await createProduct({
      categoryId: cat.id,
      name: 'Burger',
      price: 10,
      isOptionItem: true,
      status: 'AVAILABLE',
      packOptionSurcharge: 1.25,
      imageLeft: { url: 'https://img/burger.jpg' },
      description: 'desc burger',
    });

    const p2 = await createProduct({
      categoryId: cat.id,
      name: 'Fries',
      price: 5,
      isOptionItem: true,
      status: 'AVAILABLE',
      packOptionSurcharge: 0.75,
      imageLeft: { url: 'https://img/fries.jpg' },
      description: 'desc fries',
    });

    const res = await request(app).post(PATH).send({
      categoryId: cat.id,
      optionGroupIdToClone: null,
      name: 'Combo Picker',
      required: true,
      showImages: true,
      // maxSelectable omitido → handler usa #productos válidos
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: 'Combo Picker',
      required: true,
      showImages: true,
    });

    // Verifica OptionValue creados
    const values = await prisma.optionValue.findMany({ where: { groupId: res.body.id } });
    expect(values.length).toBe(2);

    const byName = Object.fromEntries(values.map(v => [v.name, v]));
    expect(byName.Burger).toBeTruthy();
    expect(byName.Fries).toBeTruthy();

    expect(byName.Burger.extraPrice).toBeCloseTo(1.25, 2);
    expect(byName.Fries.extraPrice).toBeCloseTo(0.75, 2);

    expect(byName.Burger.productRefId).toBe(p1.id);
    expect(byName.Fries.productRefId).toBe(p2.id);
  });
});
