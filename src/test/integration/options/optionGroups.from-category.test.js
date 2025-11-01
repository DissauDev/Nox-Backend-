// src/test/integration/options/optionGroups.from-category.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory, createProduct } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

// Ajusta si tu ruta real es distinta
const PATH = '/api/option-group/from-category';

beforeEach(async () => {
  await truncateAll();
});

describe('POST /api/option-group/from-category (createGroupFromCategory)', () => {
  it('201 - crea grupo con OptionValues a partir de productos elegibles', async () => {
    const cat = await createCategory({ name: 'Combos' });

    // Elegibles (AVAILABLE + isOptionItem)
    const p1 = await createProduct({
      categoryId: cat.id,
      name: 'Burger',
      price: 10,
      status: 'AVAILABLE',
      isOptionItem: true,
      packOptionSurcharge: 1.25,
      imageLeft: { url: 'https://img/burger.jpg' },
      description: 'desc burger',
    });
    const p2 = await createProduct({
      categoryId: cat.id,
      name: 'Fries',
      price: 5,
      status: 'AVAILABLE',
      isOptionItem: true,
      packOptionSurcharge: 0.75,
      imageLeft: { url: 'https://img/fries.jpg' },
      description: 'desc fries',
    });

    // No elegible
    await createProduct({
      categoryId: cat.id,
      name: 'Milkshake',
      price: 4,
      status: 'DISABLED',
      isOptionItem: true,
    });

    const body = {
      categoryId: cat.id,
      groupName: 'Combo Picker',
      required: true,
      // minSelectable omitido -> por defecto 1
      // maxSelectable omitido -> se calcula = productos elegibles (2)
      // showImages omitido -> se deriva de required (true)
    };

    const res = await request(app).post(PATH).send(body);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Combo Picker');

    // Verifica OptionValues creados
    const values = await prisma.optionValue.findMany({ where: { groupId: res.body.id } });
    expect(values.length).toBe(2);

    const byName = Object.fromEntries(values.map(v => [v.name, v]));
    expect(byName.Burger).toBeTruthy();
    expect(byName.Fries).toBeTruthy();

    // Deben conservar packOptionSurcharge → extraPrice
    expect(byName.Burger.extraPrice).toBeCloseTo(1.25, 2);
    expect(byName.Fries.extraPrice).toBeCloseTo(0.75, 2);

    // productRefId apuntando al producto real
    expect(byName.Burger.productRefId).toBe(p1.id);
    expect(byName.Fries.productRefId).toBe(p2.id);

    // Parámetros
    const og = await prisma.optionGroup.findUnique({ where: { id: res.body.id } });
    expect(og.required).toBe(true);
    expect(og.minSelectable).toBe(1);
    expect(og.maxSelectable).toBe(2);
    expect(og.showImages).toBe(true);
  });

  it('404 - si la categoría no existe o no tiene productos elegibles', async () => {
    const cat = await createCategory({ name: 'Empty' });
    // crea un producto no elegible
    await createProduct({
      categoryId: cat.id,
      name: 'Not Eligible',
      price: 3,
      status: 'AVAILABLE',
      isOptionItem: false, // <- no elegible
    });

    const res = await request(app).post(PATH).send({
      categoryId: cat.id,
      groupName: 'Should Fail',
    });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/no products found/i);
  });

  it('400 - valida que minSelectable ≤ maxSelectable si llegan ambos', async () => {
    const cat = await createCategory({ name: 'Valid' });
    await createProduct({
      categoryId: cat.id,
      name: 'A',
      price: 3,
      status: 'AVAILABLE',
      isOptionItem: true,
    });
    await createProduct({
      categoryId: cat.id,
      name: 'B',
      price: 4,
      status: 'AVAILABLE',
      isOptionItem: true,
    });

    const res = await request(app).post(PATH).send({
      categoryId: cat.id,
      groupName: 'Bad Range',
      minSelectable: 3,
      maxSelectable: 2,
    });

    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/minSelectable.*greater.*maxSelectable/i);
  });

  it('400 - categoryId es obligatorio', async () => {
    const res = await request(app).post(PATH).send({
      groupName: 'No Category',
    });
    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/categoryId.*required/i);
  });
});
