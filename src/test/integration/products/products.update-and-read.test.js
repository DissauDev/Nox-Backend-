// src/test/integration/products/products.update-and-read.test.js
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
const PATH_ID = (id) => `/api/products/${id}`;

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

describe('Products API - update & getById', () => {
  async function seedOptionGroups() {
    // Ajusta el nombre del modelo si en tu schema difiere (OptionGroup vs ProductOptionGroup)
    const g1 = await prisma.optionGroup.create({ data: { name: 'Size' } });
    const g2 = await prisma.optionGroup.create({ data: { name: 'Extras' } });

    // Valores (para que GET by id devuelva OptionValue)
    await prisma.optionValue.createMany({
      data: [
        { name: 'Small',  groupId: g1.id, extraPrice: 0 },
        { name: 'Large',  groupId: g1.id, extraPrice: 2 },
        { name: 'Bacon',  groupId: g2.id, extraPrice: 1.5 },
        { name: 'Cheese', groupId: g2.id, extraPrice: 1.0 },
      ]
    });

    return { g1, g2 };
  }

  async function createProductViaAPI({ name = 'Cheese Burger', categoryName = 'Burgers' } = {}) {
    const cat = await createCategory({ name: categoryName });

    const body = {
      name,
      price: 12.5,
      salePrice: 10.99,
      category: categoryName,
      imageLeftUrl: 'https://cdn.test/left.jpg'
      // No enviamos type/status para evitar enums inválidos
    };

    const res = await request(app).post(PATH).send(body);
    expect(res.status).toBe(201);
    return { product: res.body, category: cat };
  }

  it('404 - update de producto inexistente', async () => {
    const res = await request(app).put(PATH_ID('00000000-0000-0000-0000-000000000000')).send({
      name: 'Nope'
    });
    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/not found/i);
  });

  it('200 - actualiza campos básicos, cambia categoría, reemplaza options y devuelve correctamente con GET /:id', async () => {
    // Seed inicial
    const { product: p, category: cat1 } = await createProductViaAPI({ name: 'Cheese Burger', categoryName: 'Burgers' });
    const cat2 = await createCategory({ name: 'Sandwiches' });
    const { g1, g2 } = await seedOptionGroups();

    // Update: cambiamos nombre, categoría, precios, imágenes, flags y options (reemplazo)
    const updateBody = {
      name: 'Cheese Burger Deluxe',
      description: 'Upgraded burger',
      price: 14.25,
      salePrice: 11.99,
      specifications: 'Spec v2',
      category: 'Sandwiches',
      imageLeftUrl: 'https://cdn.test/left-v2.jpg',
      imageRightUrl: 'https://cdn.test/right-v2.jpg',
      isOptionItem: true,
      packOptionSurcharge: 1.5,
      packMaxItems: 4,
      // Reemplazamos opciones (deleteMany + create) → dejamos solo g2 asignado
      options: JSON.stringify([g2.id])
    };

    const rUp = await request(app).put(PATH_ID(p.id)).send(updateBody);
    expect(rUp.status).toBe(200);
    expect(rUp.body.name).toBe('Cheese Burger Deluxe');
    expect(Number(rUp.body.price)).toBeCloseTo(14.25, 2);
    expect(Number(rUp.body.salePrice)).toBeCloseTo(11.99, 2);
    expect(rUp.body.isOptionItem).toBe(true);
    expect(Number(rUp.body.packOptionSurcharge)).toBeCloseTo(1.5, 2);
    expect(rUp.body.packMaxItems).toBe(4);

    // Verifica relaciones de options (solo g2)
    const rel = await prisma.productOption.findMany({ where: { productId: p.id } });
    expect(rel.map(r => r.groupId).sort()).toEqual([g2.id]);

    // GET by ID (debe traer category + options.group + OptionValue)
    const rGet = await request(app).get(PATH_ID(p.id)).send();
    expect(rGet.status).toBe(200);

    const prod = rGet.body;
    expect(prod.id).toBe(p.id);
    expect(prod.category?.id).toBe(cat2.id);
    expect(prod.category?.name).toBe('Sandwiches');

    // Debe traer una sola opción (g2)
    expect(Array.isArray(prod.options)).toBe(true);
    expect(prod.options.length).toBe(1);
    expect(prod.options[0].group.id).toBe(g2.id);
    expect(prod.options[0].group.name).toBe('Extras');

    // Y los valores del grupo Extras
    const values = prod.options[0].group.OptionValue;
    expect(Array.isArray(values)).toBe(true);
    const valueNames = values.map(v => v.name).sort();
    expect(valueNames).toEqual(['Bacon', 'Cheese'].sort());
  });

  it('400 - update con nombre en uso (clash)', async () => {
    const { product: p1 } = await createProductViaAPI({ name: 'Product A', categoryName: 'Cats' });
    const { product: p2 } = await createProductViaAPI({ name: 'Product B', categoryName: 'Dogs' });

    const r = await request(app).put(PATH_ID(p2.id)).send({ name: 'Product A' });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/same name/i);
  });

  it('400 - update con categoría inválida', async () => {
    const { product: p } = await createProductViaAPI({ name: 'Solo', categoryName: 'Valid' });
    const r = await request(app).put(PATH_ID(p.id)).send({ category: 'NoExiste' });
    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/invalid category/i);
  });

  it('400 - update falla si imageLeftUrl no se puede procesar', async () => {
    const { product: p } = await createProductViaAPI({ name: 'ImgTest', categoryName: 'Pics' });

    // Primera llamada a generateImageData devolverá null
    generateImageData
      .mockImplementationOnce(async () => null);

    const r = await request(app).put(PATH_ID(p.id)).send({
      imageLeftUrl: 'https://cdn.test/broken-left.jpg'
    });

    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/imageLeft/i);
  });

  it('400 - update falla si imageRightUrl no se puede procesar', async () => {
    const { product: p } = await createProductViaAPI({ name: 'ImgTest2', categoryName: 'Pics' });

    // left OK (primera), right falla (segunda)
    generateImageData
      .mockImplementationOnce(async () => null);          // right

    const r = await request(app).put(PATH_ID(p.id)).send({
      imageRightUrl: 'https://cdn.test/broken-right.jpg'
    });

    expect(r.status).toBe(400);
    expect(String(r.body.message || '')).toMatch(/image right/i);
  });

  it('404 - getProductById inexistente', async () => {
    const r = await request(app).get(PATH_ID('00000000-0000-0000-0000-000000000000')).send();
    expect(r.status).toBe(404);
    expect(String(r.body.message || '')).toMatch(/not found/i);
  });
});
