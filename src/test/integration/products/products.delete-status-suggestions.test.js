// src/test/integration/products/products.delete-status-suggestions.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const {
  createCategory,
  createProduct,
} = require('../../factories');

const app = buildApp();
jest.setTimeout(30000);

const BASE = '/api/products';

beforeEach(async () => {
  await truncateAll();
});

describe('Products API - delete, status, suggestions', () => {
  async function seedProductWithOptions() {
    const cat = await createCategory({ name: 'Meals' });

    // Producto base con opciones/valores asociados
    const prod = await createProduct({
      categoryId: cat.id,
      name: 'Burger Deluxe',
      price: 10,
      status: 'AVAILABLE',
    });

    // Grupos y valores
    const gSize = await prisma.optionGroup.create({ data: { name: 'Size' } });
    const gExtra = await prisma.optionGroup.create({ data: { name: 'Extras' } });

    await prisma.optionValue.createMany({
      data: [
        { name: 'Small', groupId: gSize.id, extraPrice: 0 },
        { name: 'Large', groupId: gSize.id, extraPrice: 2 },
        { name: 'Bacon', groupId: gExtra.id, extraPrice: 1.5 },
      ],
    });

    const vSmall = await prisma.optionValue.findFirst({ where: { name: 'Small' } });
    const vLarge = await prisma.optionValue.findFirst({ where: { name: 'Large' } });
    const vBacon = await prisma.optionValue.findFirst({ where: { name: 'Bacon' } });

    // Relación producto - grupos (ProductOption)
    const poSize = await prisma.productOption.create({
      data: { productId: prod.id, groupId: gSize.id },
    });
    const poExtra = await prisma.productOption.create({
      data: { productId: prod.id, groupId: gExtra.id },
    });

    // Relación producto-opción-valor (ProductOptionValue)
    await prisma.productOptionValue.createMany({
      data: [
        { productOptionId: poSize.id, valueId: vSmall.id },
        { productOptionId: poSize.id, valueId: vLarge.id },
        { productOptionId: poExtra.id, valueId: vBacon.id },
      ],
    });

    // Otro producto para comprobar que no se borra “de rebote”
    const other = await createProduct({
      categoryId: cat.id,
      name: 'Salad',
      price: 8,
      status: 'AVAILABLE',
    });

    return { prod, other, poSize, poExtra };
  }

  it('200 - DELETE /:id borra Product, ProductOption y ProductOptionValue (en ese orden lógico)', async () => {
    const { prod, other, poSize, poExtra } = await seedProductWithOptions();

    const res = await request(app).delete(`${BASE}/${prod.id}`).send();
    expect(res.status).toBe(200);
    expect(String(res.body.message || '')).toMatch(/eliminado/i);

    // Producto borrado
    const dbProd = await prisma.product.findUnique({ where: { id: prod.id } });
    expect(dbProd).toBeNull();

    // ProductOption borradas
    const poCount = await prisma.productOption.count({ where: { productId: prod.id } });
    expect(poCount).toBe(0);

    // ProductOptionValue borradas (a través de las PO borradas)
    const povCount = await prisma.productOptionValue.count({
      where: { productOptionId: { in: [poSize.id, poExtra.id] } },
    });
    expect(povCount).toBe(0);

    // El otro producto sigue ahí
    const dbOther = await prisma.product.findUnique({ where: { id: other.id } });
    expect(dbOther).not.toBeNull();
  });

  it('404 - DELETE /:id para un id inexistente', async () => {
    const res = await request(app).delete(`${BASE}/00000000-0000-0000-0000-000000000000`).send();
    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/not found/i);
  });

  it('200 - PATCH /:id/status actualiza el status', async () => {
    const cat = await createCategory({ name: 'Drinks' });
    const prod = await createProduct({
      categoryId: cat.id,
      name: 'Cola',
      price: 3,
      status: 'AVAILABLE',
    });

    const r = await request(app)
      .patch(`${BASE}/${prod.id}/status`)
      .send({ status: 'DISABLED' });

    expect(r.status).toBe(200);
    expect(r.body).toHaveProperty('id', prod.id);
    expect(r.body).toHaveProperty('status', 'DISABLED');

    const db = await prisma.product.findUnique({ where: { id: prod.id } });
    expect(db.status).toBe('DISABLED');
  });

  describe('GET /:id/suggestions', () => {
    it('200 - devuelve 2 sugerencias priorizando misma categoría', async () => {
      const catA = await createCategory({ name: 'Cat A' });
      const catB = await createCategory({ name: 'Cat B' });

      // Producto base
      const base = await createProduct({
        categoryId: catA.id,
        name: 'Base A',
        price: 10,
        status: 'AVAILABLE',
      });

      // Mismos categoría A (AVAILABLE)
      const a1 = await createProduct({ categoryId: catA.id, name: 'A1', price: 11, status: 'AVAILABLE' });
      const a2 = await createProduct({ categoryId: catA.id, name: 'A2', price: 12, status: 'AVAILABLE' });

      // Mismo categoría pero DISABLED (no debe salir)
      await createProduct({ categoryId: catA.id, name: 'A3-Disabled', price: 13, status: 'DISABLED' });

      // Otra categoría (candidatos de relleno)
      await createProduct({ categoryId: catB.id, name: 'B1', price: 14, status: 'AVAILABLE' });

      const r = await request(app).get(`${BASE}/${base.id}/suggestions`).send();
      expect(r.status).toBe(200);
      expect(Array.isArray(r.body)).toBe(true);
      expect(r.body.length).toBe(2);

      const ids = r.body.map(p => p.id).sort();
      const expected = [a1.id, a2.id].sort();
      expect(ids).toEqual(expected);
    });

    it('200 - si no hay suficientes en misma categoría, rellena con otras', async () => {
      const catA = await createCategory({ name: 'Cat A2' });
      const catB = await createCategory({ name: 'Cat B2' });

      // Base
      const base = await createProduct({
        categoryId: catA.id,
        name: 'Base A2',
        price: 10,
        status: 'AVAILABLE',
      });

      // Solo 1 en misma categoría
      const a1 = await createProduct({ categoryId: catA.id, name: 'A-only', price: 11, status: 'AVAILABLE' });

      // Candidatos de otras categorías
      const b1 = await createProduct({ categoryId: catB.id, name: 'B1', price: 12, status: 'AVAILABLE' });
      const b2 = await createProduct({ categoryId: catB.id, name: 'B2', price: 13, status: 'AVAILABLE' });

      const r = await request(app).get(`${BASE}/${base.id}/suggestions`).send();
      expect(r.status).toBe(200);
      expect(Array.isArray(r.body)).toBe(true);
      expect(r.body.length).toBe(2);

      // Debe incluir a1 y (b1 o b2), pero no al base
      const ids = r.body.map(p => p.id);
      expect(ids).toContain(a1.id);
      expect(ids).not.toContain(base.id);
      expect(ids.some(id => id === b1.id || id === b2.id)).toBe(true);

      // Todos AVAILABLE
      r.body.forEach(p => expect(p).toHaveProperty('id'));
    });

    it('404 - base no existe', async () => {
      const r = await request(app).get(`${BASE}/00000000-0000-0000-0000-000000000000/suggestions`).send();
      expect(r.status).toBe(404);
      expect(String(r.body.message || '')).toMatch(/not found/i);
    });
  });
});
