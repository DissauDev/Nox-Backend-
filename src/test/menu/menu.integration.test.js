// src/test/integration/menu/menu.integration.test.js
const request = require('supertest');
const { buildApp } = require('../../../app');
const { prisma, truncateAll } = require('../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

// helpers
function unique(str='menu'){ return `${str}_${Date.now()}_${Math.floor(Math.random()*1e6)}`; }

async function createCategory(data = {}) {
  const base = {
    name: unique('Cat'),
    imageUrl: 'https://img.com/cat.jpg',
    onCarousel: true,
    shortDescription: 'short',
    longDescription: 'long',
    status: 'AVAILABLE',     // importante para que entre al menú
    sortOrder: 0,
  };
  return prisma.category.create({ data: { ...base, ...data } });
}

async function createProduct(categoryId, data = {}) {
  const base = {
    name: unique('Prod'),
    description: 'desc',
    price: 10.0,
    sellPrice: null,
    status: 'AVAILABLE',     // importante para que entre al menú
    imageLeft: null,
    imageRight: null,
    type: 'REGULAR',
    isOptionItem: false,
    packOptionSurcharge: 0,
    categoryId,
  };
  return prisma.product.create({ data: { ...base, ...data } });
}

beforeEach(async () => {
  await truncateAll();
});

describe('GET /api/menu', () => {
  it('200 - devuelve categorías con sus productos (solo AVAILABLE) y filtra vacías', async () => {
    // Cat A (AVAILABLE, con productos)
    const catA = await createCategory({ name: 'Bebidas', sortOrder: 1 });
    const prodA1 = await createProduct(catA.id, { name: 'Coca-Cola', price: 3.5 });
    const prodA2 = await createProduct(catA.id, { name: 'Agua', price: 2.0 });

    // Cat B (AVAILABLE, SIN productos) -> NO debe aparecer
    const catB = await createCategory({ name: 'Vacía', sortOrder: 2 });
    // sin productos

    // Cat C (DISABLED, con productos) -> NO debe aparecer
    const catC = await createCategory({ name: 'Deshabilitada', status: 'DISABLED', sortOrder: 0 });
    await createProduct(catC.id, { name: 'Oculto', price: 9.9 });

    const res = await request(app).get('/api/menu').send();
    expect(res.status).toBe(200);

    // Estructura básica
    expect(Array.isArray(res.body)).toBe(true);

    // Solo debe venir Cat A (Bebidas) porque:
    // - Cat B no tiene items
    // - Cat C no está AVAILABLE
    const cats = res.body.map(c => c.category);
    expect(cats).toEqual(['Bebidas']);

    const bebidas = res.body[0];
    expect(bebidas).toHaveProperty('category', 'Bebidas');
    expect(Array.isArray(bebidas.items)).toBe(true);
    // Dos productos
    const itemNames = bebidas.items.map(i => i.name).sort();
    expect(itemNames).toEqual(['Agua', 'Coca-Cola']);

    // Campos mínimos por item
    const uno = bebidas.items.find(i => i.name === 'Coca-Cola');
    expect(uno).toMatchObject({
      id: prodA1.id,
      name: 'Coca-Cola',
      description: 'desc',
      price: 3.5,
      status: 'AVAILABLE',
      category: 'Bebidas',
    });

    // Sin opciones creadas => options = [] y hasRequiredOptions = false
    expect(Array.isArray(uno.options)).toBe(true);
    expect(uno.options.length).toBe(0);
    expect(uno.hasRequiredOptions).toBe(false);
  });

  it('200 - respeta orden de categorías por sortOrder, luego nombre', async () => {
    // sortOrder 0 => debería ir primero
    const c1 = await createCategory({ name: 'Alpha', sortOrder: 0 });
    await createProduct(c1.id, { name: 'ItemA' });

    // sortOrder 2 => tercero
    const c3 = await createCategory({ name: 'Zulu', sortOrder: 2 });
    await createProduct(c3.id, { name: 'ItemZ' });

    // sortOrder 1, dos categorías -> ordenadas por name dentro del mismo sortOrder
    const c2a = await createCategory({ name: 'Beta', sortOrder: 1 });
    const c2b = await createCategory({ name: 'Bravo', sortOrder: 1 });
    await createProduct(c2a.id, { name: 'ItemB1' });
    await createProduct(c2b.id, { name: 'ItemB2' });

    const res = await request(app).get('/api/menu').send();
    expect(res.status).toBe(200);

    const cats = res.body.map(c => c.category);
    // Esperamos: sortOrder 0 -> Alpha; sortOrder 1 -> Beta, Bravo (orden alfabético);
    // sortOrder 2 -> Zulu
    expect(cats).toEqual(['Alpha', 'Beta', 'Bravo', 'Zulu']);
  });
});
