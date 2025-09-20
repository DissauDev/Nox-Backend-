// src/test/integration/categories/categories.integration.test.js
const request = require('supertest');
const { ProductStatus } = require('@prisma/client');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

// -------- Helpers (factories) --------
function uniqueName(prefix = 'Cat') {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

async function createCategory(data = {}) {
  const base = {
    name: uniqueName(),
    imageUrl: 'https://example.com/img.jpg',
    onCarousel: true,
    shortDescription: 'Short',
    longDescription: 'Long',
    status: ProductStatus.AVAILABLE,
    sortOrder: 0,
  };
  return prisma.category.create({ data: { ...base, ...data } });
}

async function createProduct(categoryId, price = 5.0, namePrefix = 'Prod') {
  return prisma.product.create({
    data: {
      name: `${namePrefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
      price,
      description: 'Test product',
      type: 'REGULAR',
      status: 'AVAILABLE',
      categoryId,
      isOptionItem: false,
      packOptionSurcharge: 0,
    },
  });
}

// Crea una orden con items para alimentar /categories-with-sales
async function createOrderWithItems(itemsSpec = []) {
  // Estructura mínima según tu esquema Order/OrderItem
  const subtotal = itemsSpec.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalAmount = subtotal;

  const order = await prisma.order.create({
    data: {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PAID',
      subtotal,
      totalAmount,
      paymentMethod: 'Stripe',
      stripePaymentIntentId: `pi_${Math.random().toString(36).slice(2)}`,
      customerName: 'John',
      customerEmail: `buyer_${Date.now()}@example.com`,
      customerPhone: '555-555',
      customerAddress: '123 Test St',
      customerLastname: 'Doe',
      billingState: 'CA',
      billingCity: 'San Jose',
      items: {
        create: itemsSpec.map(it => ({
          product: { connect: { id: it.productId } },
          quantity: it.quantity,
          price: it.price,
          chosenOptions: null,
        })),
      },
    },
    include: { items: true },
  });

  return order;
}

beforeEach(async () => {
  await truncateAll();
});

// ----------------- TESTS -----------------

describe('POST /api/categories (createCategory)', () => {
  it('201 - crea categoría válida', async () => {
    const payload = {
      name: uniqueName('CreateOK'),
      imageUrl: 'https://img.com/a.jpg',
      onCarousel: true,
      shortDescription: 'short',
      longDescription: 'long',
      status: ProductStatus.AVAILABLE,
      sortOrder: 2,
    };

    const res = await request(app).post('/api/categories').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(payload.name);

    const db = await prisma.category.findUnique({ where: { id: res.body.id } });
    expect(db).not.toBeNull();
  });

  it('400 - valida campos requeridos (ej: falta name)', async () => {
    const bad = {
      imageUrl: 'https://img.com/a.jpg',
      onCarousel: true,
      shortDescription: 'short',
      longDescription: 'long',
    };
    const res = await request(app).post('/api/categories').send(bad);
    expect(res.status).toBe(400);
    expect(Array.isArray(res.body.message)).toBe(true);
  });

  it('400 - nombre duplicado (P2002)', async () => {
    const name = uniqueName('Dup');
    await createCategory({ name });
    const res = await request(app).post('/api/categories').send({
      name,
      imageUrl: 'https://img.com/x.jpg',
      onCarousel: true,
      shortDescription: 'short',
      longDescription: 'long',
      status: ProductStatus.AVAILABLE,
    });
    expect(res.status).toBe(400);
    // Mensaje del controller:
    expect(res.body.message).toMatch(/already exists|already registered|already/i);
  });
});

describe('GET /api/categories (getCategories)', () => {
  it('200 - lista general ordenada por sortOrder, name', async () => {
    await createCategory({ name: 'B-cat', sortOrder: 1 });
    await createCategory({ name: 'A-cat', sortOrder: 0 });
    const res = await request(app).get('/api/categories').send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    // Debe venir A-cat (sortOrder 0) primero
    expect(res.body[0].name).toBe('A-cat');
  });

  it('200 - filtra por onCarousel=true', async () => {
    await createCategory({ onCarousel: true, name: 'On1' });
    await createCategory({ onCarousel: false, name: 'Off1' });

    const res = await request(app).get('/api/categories?onCarousel=true').send();
    expect(res.status).toBe(200);
    const names = res.body.map(c => c.name);
    expect(names).toContain('On1');
    expect(names).not.toContain('Off1');
  });
});

describe('GET /api/categories/:id (getCategoryById)', () => {
  it('200 - devuelve la categoría por id', async () => {
    const c = await createCategory({ name: 'FindMe' });
    const res = await request(app).get(`/api/categories/${c.id}`).send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', c.id);
  });

  it('404 - no existe', async () => {
    const res = await request(app).get('/api/categories/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});

describe('PUT /api/categories/:id (updateCategory)', () => {
  it('200 - actualiza campos válidos', async () => {
    const c = await createCategory({ name: 'ToUpdate' });
    const res = await request(app)
      .put(`/api/categories/${c.id}`)
      .send({ name: 'Updated', onCarousel: false });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated');
    expect(res.body.onCarousel).toBe(false);

    const db = await prisma.category.findUnique({ where: { id: c.id } });
    expect(db.name).toBe('Updated');
  });

  it('400 - validación: onCarousel debe ser boolean', async () => {
    const c = await createCategory();
    const res = await request(app)
      .put(`/api/categories/${c.id}`)
      .send({ onCarousel: 'not-bool' });
    expect(res.status).toBe(400);
  });

  it('404 - no existe (P2025)', async () => {
    const res = await request(app)
      .put('/api/categories/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
      .send({ name: 'NoOne' });
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it('400 - nombre duplicado (P2002)', async () => {
    const c1 = await createCategory({ name: 'Unique-1' });
    const c2 = await createCategory({ name: 'Unique-2' });

    const res = await request(app)
      .put(`/api/categories/${c2.id}`)
      .send({ name: 'Unique-1' });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists|already/i);
  });
});

describe('PATCH /api/categories/:id/status (updateCategoryStatus)', () => {
  it('200 - cambia status válido', async () => {
    const c = await createCategory({ status: ProductStatus.AVAILABLE });
    const res = await request(app)
      .patch(`/api/categories/${c.id}/status`)
      .send({ status: ProductStatus.DISABLED });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(ProductStatus.DISABLED);
  });

  it('400 - status inválido', async () => {
    const c = await createCategory();
    const res = await request(app)
      .patch(`/api/categories/${c.id}/status`)
      .send({ status: 'INVALID_STATUS' });
    expect(res.status).toBe(400);
  });

  it('404 - no existe', async () => {
    const res = await request(app)
      .patch('/api/categories/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/status')
      .send({ status: ProductStatus.AVAILABLE });
    expect(res.status).toBe(404);
  });
});

describe('GET /api/categories-available-carousel (getAvailableCarouselCategories)', () => {
  it('200 - solo AVAILABLE + onCarousel=true; ordenado por sortOrder, name', async () => {
    await createCategory({ name: 'ZZ', status: ProductStatus.AVAILABLE, onCarousel: true, sortOrder: 2 });
    await createCategory({ name: 'AA', status: ProductStatus.AVAILABLE, onCarousel: true, sortOrder: 1 });
    await createCategory({ name: 'BB', status: ProductStatus.DISABLED, onCarousel: true, sortOrder: 0 });
    await createCategory({ name: 'CC', status: ProductStatus.AVAILABLE, onCarousel: false, sortOrder: 0 });

    const res = await request(app).get('/api/categories-available-carousel').send();
    expect(res.status).toBe(200);
    const names = res.body.map(c => c.name);
    expect(names).toEqual(['AA', 'ZZ']); // por sortOrder asc luego name asc
  });
});

describe('GET /api/categories/available (getCategoriesAvailable)', () => {
  it('200 - solo AVAILABLE', async () => {
    await createCategory({ name: 'A', status: ProductStatus.AVAILABLE });
    await createCategory({ name: 'B', status: ProductStatus.DISABLED });
    const res = await request(app).get('/api/categories/available').send();
    expect(res.status).toBe(200);
    const names = res.body.map(c => c.name);
    expect(names).toContain('A');
    expect(names).not.toContain('B');
  });
});

describe('GET /api/categories-with-sales (getCategoriesWithSales)', () => {
  it('200 - incluye columna "accumulated" proveniente de OrderItem', async () => {
    // Cat 1 con 2 productos y ordenes
    const cat1 = await createCategory({ name: 'Sales-A' });
    const p1 = await createProduct(cat1.id, 10, 'P1');
    const p2 = await createProduct(cat1.id, 5, 'P2');

    // Cat 2 con 1 producto
    const cat2 = await createCategory({ name: 'Sales-B' });
    const p3 = await createProduct(cat2.id, 20, 'P3');

    // Ordenes: (p1 x2=20) + (p2 x3=15) => Cat1=35; (p3 x1=20) => Cat2=20
    await createOrderWithItems([
      { productId: p1.id, quantity: 2, price: 10 },
      { productId: p2.id, quantity: 3, price: 5 },
    ]);
    await createOrderWithItems([
      { productId: p3.id, quantity: 1, price: 20 },
    ]);

    const res = await request(app).get('/api/categories-with-sales').send();
    expect(res.status).toBe(200);

    // Mapa name->accumulated
    const map = Object.fromEntries(res.body.map(c => [c.name, c.accumulated]));
    // Tolerancia por float
    expect(map['Sales-A']).toBeCloseTo(35, 5);
    expect(map['Sales-B']).toBeCloseTo(20, 5);
  });
});

describe('DELETE /api/categories/:id (deleteCategory)', () => {
  it('204 - elimina existente', async () => {
    const c = await createCategory();
    const res = await request(app).delete(`/api/categories/${c.id}`).send();
    expect(res.status).toBe(204);

    const db = await prisma.category.findUnique({ where: { id: c.id } });
    expect(db).toBeNull();
  });

  it('404 - no existe (P2025)', async () => {
    const res = await request(app).delete('/api/categories/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
