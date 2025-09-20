// src/test/integration/options/optionValues.update-delete.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory, createProduct } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

const BASE = '/api/option-group';

beforeEach(async () => {
  await truncateAll();
});

describe('OptionValue: update & delete', () => {
  describe('PUT /api/option-group/:groupId/values/:valueId (updateOptionValue)', () => {
    it('200 - actualiza name/extraPrice/imageUrl/description/isAvailable', async () => {
      const group = await prisma.optionGroup.create({
        data: { name: 'Sauces', required: true, minSelectable: 1, maxSelectable: 2, showImages: true },
      });
      const value = await prisma.optionValue.create({
        data: { groupId: group.id, name: 'Ketchup', extraPrice: 0, description: '' },
      });

      const body = {
        name: 'Ketchup Zero',
        extraPrice: 0.5,
        imageUrl: 'https://cdn.test/ketchup.png',
        description: 'no sugar',
        isAvailable: false,
      };

      const res = await request(app)
        .put(`${BASE}/${encodeURIComponent(group.id)}/values/${encodeURIComponent(value.id)}`)
        .send(body);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: value.id,
        name: 'Ketchup Zero',
        imageUrl: 'https://cdn.test/ketchup.png',
        description: 'no sugar',
        isAvailable: false,
      });
      expect(res.body.extraPrice).toBeCloseTo(0.5, 2);

      const inDb = await prisma.optionValue.findUnique({ where: { id: value.id } });
      expect(inDb.name).toBe('Ketchup Zero');
      expect(inDb.extraPrice).toBeCloseTo(0.5, 2);
      expect(inDb.isAvailable).toBe(false);
    });

    it('400 - valida extraPrice no negativo', async () => {
      const group = await prisma.optionGroup.create({
        data: { name: 'Sizes', required: true, minSelectable: 1, maxSelectable: 3, showImages: false },
      });
      const value = await prisma.optionValue.create({
        data: { groupId: group.id, name: 'Large', extraPrice: 1.5 },
      });

      const res = await request(app)
        .put(`${BASE}/${encodeURIComponent(group.id)}/values/${encodeURIComponent(value.id)}`)
        .send({ extraPrice: -1 });

      expect(res.status).toBe(400);
      expect(String(res.body.message || '')).toMatch(/non-negative|extraPrice/i);
    });

    it('404 - devuelve 404 si el valueId no existe', async () => {
      const group = await prisma.optionGroup.create({
        data: { name: 'Dummy', required: false, minSelectable: 0, maxSelectable: 1, showImages: false },
      });

      const res = await request(app)
        .put(`${BASE}/${encodeURIComponent(group.id)}/values/00000000-0000-0000-0000-000000000000`)
        .send({ name: 'Nope' });

      expect(res.status).toBe(404);
      expect(String(res.body.message || '')).toMatch(/not found/i);
    });

    // Descomenta si añadiste @@unique([groupId, name]) en OptionValue
    // it('409 - conflicto si se intenta duplicar nombre dentro del mismo grupo', async () => {
    //   const group = await prisma.optionGroup.create({
    //     data: { name: 'Toppings', required: true, minSelectable: 0, maxSelectable: 3, showImages: false },
    //   });
    //   const a = await prisma.optionValue.create({ data: { groupId: group.id, name: 'Bacon', extraPrice: 1 } });
    //   const b = await prisma.optionValue.create({ data: { groupId: group.id, name: 'Cheese', extraPrice: 0.5 } });
    //
    //   const res = await request(app)
    //     .put(`${BASE}/${encodeURIComponent(group.id)}/values/${encodeURIComponent(b.id)}`)
    //     .send({ name: 'Bacon' });
    //
    //   expect(res.status).toBe(409);
    //   expect(String(res.body.message || '')).toMatch(/exists|unique|conflict/i);
    // });
  });

  describe('DELETE /api/option-group/:groupId/values/:valueId (deleteOptionValue)', () => {
    it('204 - borra el value y sus dependencias (ProductOptionValue)', async () => {
      // Grupo + value
      const group = await prisma.optionGroup.create({
        data: { name: 'Extras', required: false, minSelectable: 0, maxSelectable: 3, showImages: false },
      });
      const value = await prisma.optionValue.create({
        data: { groupId: group.id, name: 'Bacon', extraPrice: 1.5 },
      });

      // Producto + ProductOption + ProductOptionValue apuntando al value
      const cat = await createCategory({ name: 'Burgers' });
      const prod = await createProduct({ categoryId: cat.id, name: 'Cheese Burger', price: 9.99, status: 'AVAILABLE' });

      const pOption = await prisma.productOption.create({
        data: { productId: prod.id, groupId: group.id },
      });

      await prisma.productOptionValue.create({
        data: { productOptionId: pOption.id, valueId: value.id },
      });

      // Sanity pre
      const preCounts = await Promise.all([
        prisma.optionValue.count({ where: { id: value.id } }),
        prisma.productOptionValue.count({ where: { valueId: value.id } }),
      ]);
      expect(preCounts).toEqual([1, 1]);

      // DELETE
      const res = await request(app)
        .delete(`${BASE}/${encodeURIComponent(group.id)}/values/${encodeURIComponent(value.id)}`)
        .send();

      expect(res.status).toBe(204);

      // Post: value y sus vínculos deben desaparecer
      const postCounts = await Promise.all([
        prisma.optionValue.count({ where: { id: value.id } }),
        prisma.productOptionValue.count({ where: { valueId: value.id } }),
      ]);
      expect(postCounts).toEqual([0, 0]);

      // El product y la relación ProductOption (del grupo) siguen existiendo
      const stillProduct = await prisma.product.findUnique({ where: { id: prod.id } });
      expect(stillProduct).not.toBeNull();

      const stillPOption = await prisma.productOption.findUnique({ where: { id: pOption.id } });
      expect(stillPOption).not.toBeNull();
    });

    it('404 - si el valueId no existe', async () => {
      const group = await prisma.optionGroup.create({
        data: { name: 'Ghost', required: false, minSelectable: 0, maxSelectable: 1, showImages: false },
      });

      const res = await request(app)
        .delete(`${BASE}/${encodeURIComponent(group.id)}/values/00000000-0000-0000-0000-000000000000`)
        .send();

      expect(res.status).toBe(404);
      expect(String(res.body.message || '')).toMatch(/not found/i);
    });
  });
});
