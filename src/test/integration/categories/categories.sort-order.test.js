// src/test/integration/categories/categories.sort-order.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

// Debe coincidir con tus rutas reales del backend
const BASE = '/api/categories';

// Helpers
async function seedCategories(n = 5) {
  const cats = [];
  for (let i = 0; i < n; i++) {
    // Tu factory debería encargarse de los campos requeridos (imageUrl, descripciones, etc.)
    const c = await createCategory({ name: `Cat ${i}`, sortOrder: i });
    cats.push(c);
  }
  return cats;
}

async function getBySortOrder(order) {
  return prisma.category.findFirst({
    where: { sortOrder: order },
    orderBy: { createdAt: 'asc' },
  });
}

async function sortedSnapshot() {
  const all = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  return all.map(c => ({ id: c.id, name: c.name, sortOrder: c.sortOrder }));
}

beforeEach(async () => {
  await truncateAll();
});

describe('PATCH /api/categories/:id/sort-order (updateCategorySortOrder)', () => {
  it('200 - mueve hacia abajo (j > i): (i, j] decrementan, movida queda en j', async () => {
    await seedCategories(5); // sortOrder: 0..4
    const moving = await getBySortOrder(1); // "Cat 1"
    const body = { newSortOrder: 3 };

    const res = await request(app)
      .patch(`${BASE}/${encodeURIComponent(moving.id)}/sort-order`)
      .send(body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', moving.id);
    expect(res.body).toHaveProperty('sortOrder', 3);

    const snap = await sortedSnapshot();
    // Esperado: 0,1,2,3,4 → mover 1 → 3
    // Resultado: Cat 0 (0), Cat 2 (1), Cat 3 (2), Cat 1 (3), Cat 4 (4)
    expect(snap.map(s => s.sortOrder)).toEqual([0, 1, 2, 3, 4]);
    // Únicos y contiguos
    const uniq = new Set(snap.map(s => s.sortOrder));
    expect(uniq.size).toBe(5);
  });

  it('200 - mueve hacia arriba (j < i): [j, i) incrementan, movida queda en j', async () => {
    await seedCategories(5); // 0..4
    const moving = await getBySortOrder(3); // "Cat 3"
    const body = { newSortOrder: 1 };

    const res = await request(app)
      .patch(`${BASE}/${encodeURIComponent(moving.id)}/sort-order`)
      .send(body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', moving.id);
    expect(res.body).toHaveProperty('sortOrder', 1);

    const snap = await sortedSnapshot();
    // Esperado: 0,1,2,3,4 → mover 3 → 1
    // Resultado: Cat 0 (0), Cat 3 (1), Cat 1 (2), Cat 2 (3), Cat 4 (4)
    expect(snap.map(s => s.sortOrder)).toEqual([0, 1, 2, 3, 4]);

    const uniq = new Set(snap.map(s => s.sortOrder));
    expect(uniq.size).toBe(5);
  });

  it('200 - no-op si newSortOrder === sortOrder actual', async () => {
    await seedCategories(3); // 0..2
    const moving = await getBySortOrder(2);

    const res = await request(app)
      .patch(`${BASE}/${encodeURIComponent(moving.id)}/sort-order`)
      .send({ newSortOrder: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', moving.id);
    expect(res.body).toHaveProperty('sortOrder', 2);

    const snap = await sortedSnapshot();
    expect(snap.map(s => s.sortOrder)).toEqual([0, 1, 2]);
  });

  it('404 - si la categoría no existe', async () => {
    const res = await request(app)
      .patch(`${BASE}/00000000-0000-0000-0000-000000000000/sort-order`)
      .send({ newSortOrder: 1 });

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/not found/i);
  });

  it('400 - valida newSortOrder (entero no-negativo)', async () => {
    const [c] = await seedCategories(1);

    // negativo
    const r1 = await request(app)
      .patch(`${BASE}/${encodeURIComponent(c.id)}/sort-order`)
      .send({ newSortOrder: -1 });
    expect(r1.status).toBe(400);

    // no numérico
    const r2 = await request(app)
      .patch(`${BASE}/${encodeURIComponent(c.id)}/sort-order`)
      .send({ newSortOrder: 'abc' });
    expect(r2.status).toBe(400);
  });
});
