const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');
const { createCategory, createProduct } = require('../../factories');

const app = buildApp();
jest.setTimeout(20000);

// Debe corresponder al prefijo real de tus rutas
const PATH = '/api/option-group';

beforeEach(async () => {
  await truncateAll();
});

describe('OptionGroup: update & delete', () => {
  describe('PUT /api/option-group/:groupId (updateOptionGroup)', () => {
    it('200 - actualiza campos permitidos y devuelve el objeto', async () => {
      const group = await prisma.optionGroup.create({
        data: { name: 'Extras', required: true, minSelectable: 1, maxSelectable: 3, showImages: true },
      });

      const body = {
        name: 'Extras v2',
        required: false,
        showImages: false,
        minSelectable: 1,
        maxSelectable: 2,
      };

      const res = await request(app).put(`${PATH}/${encodeURIComponent(group.id)}`).send(body);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: group.id,
        name: 'Extras v2',
        required: false,
        showImages: false,
        minSelectable: 1,
        maxSelectable: 2,
      });

      const inDb = await prisma.optionGroup.findUnique({ where: { id: group.id } });
      expect(inDb.name).toBe('Extras v2');
      expect(inDb.required).toBe(false);
      expect(inDb.showImages).toBe(false);
      expect(inDb.minSelectable).toBe(1);
      expect(inDb.maxSelectable).toBe(2);
    });

    it('400 - rechaza si minSelectable > maxSelectable cuando llegan ambos', async () => {
      const group = await prisma.optionGroup.create({
        data: { name: 'Sizes', required: true, minSelectable: 1, maxSelectable: 3, showImages: true },
      });

      const res = await request(app)
        .put(`${PATH}/${encodeURIComponent(group.id)}`)
        .send({ minSelectable: 5, maxSelectable: 2 });

      expect(res.status).toBe(400);
      expect(String(res.body.message || '')).toMatch(/minSelectable/i);
    });

    it('404 - devuelve 404 si el grupo no existe', async () => {
      const res = await request(app)
        .put(`${PATH}/00000000-0000-0000-0000-000000000000`)
        .send({ name: 'Nope' });

      expect(res.status).toBe(404);
      expect(String(res.body.message || '')).toMatch(/not found/i);
    });
  });

  describe('DELETE /api/option-group/:groupId (deleteOptionGroup)', () => {
    it('200 - borra el grupo y TODAS sus dependencias (joins y valores)', async () => {
      // 1) Grupo + valores
      const group = await prisma.optionGroup.create({
        data: {
          name: 'Toppings',
          required: true,
          minSelectable: 0,
          maxSelectable: 3,
          showImages: false,
          OptionValue: {
            create: [
              { name: 'Bacon',  extraPrice: 1.5 },
              { name: 'Cheese', extraPrice: 1.0 },
            ],
          },
        },
        include: { OptionValue: true },
      });

     // 2) Producto + join ProductOption + un valor elegido (creación ANIDADA)
const cat = await createCategory({ name: 'Burgers' });
const prod = await createProduct({
  categoryId: cat.id,
  name: 'Cheese Burger',
  price: 9.99,
  status: 'AVAILABLE',
});

// coge el OptionValue "Bacon" del grupo
const bacon = group.OptionValue.find(v => v.name === 'Bacon');

// crea ProductOption y, dentro, su ProductOptionValue
const pOption = await prisma.productOption.create({
  data: {
    productId: prod.id,
    groupId: group.id,
    values: {
      create: [
        { valueId: bacon.id },
      ],
    },
  },
  include: { values: true },
});
   // Sanity pre
      const preCounts = await Promise.all([
        prisma.optionGroup.count({ where: { id: group.id } }),
        prisma.optionValue.count({ where: { groupId: group.id } }),
        prisma.productOption.count({ where: { groupId: group.id } }),
        prisma.productOptionValue.count({ where: { productOption: { groupId: group.id } } }),
      ]);
      expect(preCounts).toEqual([1, 2, 1, 1]);

      // DELETE
      const res = await request(app).delete(`${PATH}/${encodeURIComponent(group.id)}`).send();
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ success: true });

      // Post: todo lo relacionado debe desaparecer
      const postCounts = await Promise.all([
        prisma.optionGroup.count({ where: { id: group.id } }),
        prisma.optionValue.count({ where: { groupId: group.id } }),
        prisma.productOption.count({ where: { groupId: group.id } }),
        prisma.productOptionValue.count({ where: { productOption: { groupId: group.id } } }),
      ]);
      expect(postCounts).toEqual([0, 0, 0, 0]);

      // El producto original sigue existiendo
      const stillThere = await prisma.product.findUnique({ where: { id: prod.id } });
      expect(stillThere).not.toBeNull();
    });

    it('404 - si el grupo no existe', async () => {
      const res = await request(app)
        .delete(`${PATH}/00000000-0000-0000-0000-000000000000`)
        .send();
      expect(res.status).toBe(404);
      expect(String(res.body.message || '')).toMatch(/not found/i);
    });
  });
});
