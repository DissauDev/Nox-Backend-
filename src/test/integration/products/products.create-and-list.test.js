// src/test/integration/products/products.create-and-list.test.js
jest.mock('../../../middlewares/generateImageData', () => ({
  generateImageData: jest.fn()
}));

const { generateImageData } = require('../../../middlewares/generateImageData');
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory } = require('../../factories');

const app = buildApp();
jest.setTimeout(30000);

const PATH = '/api/products';

const okImage = (url = 'https://cdn.test/img.jpg') => ({
  url,
  width: 800,
  height: 600,
  format: 'jpg',
  size: 123456
});

beforeEach(async () => {
  await truncateAll();
  generateImageData.mockReset();
  generateImageData.mockImplementation(async (url) => okImage(url));
});

describe('Products API', () => {
  it('201 - crea producto con imágenes y options (ids reales), luego aparece en GET', async () => {
    // Categoría válida
    const cat = await createCategory({ name: 'Burgers' });

    // 👇 Crea grupos de opciones REALES en DB (ajusta el nombre del modelo si difiere)
    const g1 = await prisma.optionGroup.create({ data: { name: 'Size' } });
    const g2 = await prisma.optionGroup.create({ data: { name: 'Extras' } });

    const body = {
      name: 'Cheese Burger',
      description: 'Rich & tasty',
      price: 12.5,
      sellPrice: 10.99,
      specifications: 'Spec text',
      category: 'Burgers',
      imageLeftUrl: 'https://cdn.test/left.jpg',
      imageRightUrl: 'https://cdn.test/right.jpg',
      isOptionItem: true,
      packOptionSurcharge: 2.5,
      packMaxItems: 3,
      // IMPORTANTÍSIMO: el endpoint espera IDs de grupos existentes
      options: JSON.stringify([g1.id, g2.id])
      // ❌ No enviamos `type` ni `status` para evitar enums inválidos en el test
    };

    const res = await request(app).post(PATH).send(body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(body.name);
    expect(res.body.price).toBeCloseTo(12.5, 2);
    expect(res.body.sellPrice).toBeCloseTo(10.99, 2);
    expect(res.body.isOptionItem).toBe(true);
    expect(res.body.packOptionSurcharge).toBe(2.5);
    expect(res.body.packMaxItems).toBe(3);

    // Verifica que las opciones quedaron
    const optionsInDb = await prisma.productOption.findMany({
      where: { productId: res.body.id },
      orderBy: { groupId: 'asc' }
    });
    const fromDbGroupIds = optionsInDb.map(o => o.groupId).sort();
    expect(fromDbGroupIds).toEqual([g1.id, g2.id].sort());

    // GET all
    const resGet = await request(app).get(PATH).send();
    expect(resGet.status).toBe(200);
    expect(Array.isArray(resGet.body)).toBe(true);
    expect(resGet.body.length).toBe(1);

    const p = resGet.body[0];
    expect(p.name).toBe(body.name);
    expect(p.category?.name).toBe('Burgers');
    const groupIds = (p.options || []).map(o => o.groupId).sort();
    expect(groupIds).toEqual([g1.id, g2.id].sort());
  });

  it('400 - rechaza nombre duplicado', async () => {
    await createCategory({ name: 'Drinks' });

    const r1 = await request(app).post(PATH).send({
      name: 'Coke',
      price: 5,
      category: 'Drinks',
      imageLeftUrl: 'https://cdn.test/left.jpg'
      // sin options y sin right -> ok
      // sin `type` / `status` para no romper enum
    });
    expect(r1.status).toBe(201);

    const r2 = await request(app).post(PATH).send({
      name: 'Coke',
      price: 5,
      category: 'Drinks',
      imageLeftUrl: 'https://cdn.test/left.jpg'
    });
    expect(r2.status).toBe(400);
    expect(String(r2.body.message || '')).toMatch(/same name/i);
  });

  it('400 - categoría inválida', async () => {
    const res = await request(app).post(PATH).send({
      name: 'Lemonade',
      price: 4,
      category: 'NoExiste',
      imageLeftUrl: 'https://cdn.test/left.jpg'
    });
    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/invalid category/i);
  });

  it('400 - error procesando left image', async () => {
    await createCategory({ name: 'Sides' });
    generateImageData.mockImplementationOnce(async () => null); // primera llamada (left) falla

    const res = await request(app).post(PATH).send({
      name: 'Fries',
      price: 3.5,
      category: 'Sides',
      imageLeftUrl: 'https://cdn.test/left.jpg'
    });

    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/left image/i);
  });

  it('400 - error procesando right image', async () => {
    await createCategory({ name: 'Desserts' });
    // left ok, right falla
    generateImageData
      .mockImplementationOnce(async (url) => okImage(url)) // left
      .mockImplementationOnce(async () => null);           // right

    const res = await request(app).post(PATH).send({
      name: 'Brownie',
      price: 6,
      category: 'Desserts',
      imageLeftUrl: 'https://cdn.test/left.jpg',
      imageRightUrl: 'https://cdn.test/right.jpg'
    });

    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/right image/i);
  });

  it('400 - options inválidas (JSON malformado)', async () => {
    await createCategory({ name: 'Pizzas' });

    const res = await request(app).post(PATH).send({
      name: 'Pepperoni',
      price: 9,
      category: 'Pizzas',
      imageLeftUrl: 'https://cdn.test/left.jpg',
      options: '{not: "valid json"' // roto adrede
    });

    expect(res.status).toBe(400);
    expect(String(res.body.message || '')).toMatch(/options.*valid.*json/i);
  });

  it('201 - crea sin options ni right image (mínimo)', async () => {
    await createCategory({ name: 'Salads' });

    const res = await request(app).post(PATH).send({
      name: 'Caesar',
      price: 7.99,
      category: 'Salads',
      imageLeftUrl: 'https://cdn.test/left.jpg'
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Caesar');

    const opts = await prisma.productOption.findMany({ where: { productId: res.body.id } });
    expect(opts.length).toBe(0);
  });

  it('GET /api/products devuelve [] cuando no hay productos', async () => {
    const res = await request(app).get(PATH).send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
