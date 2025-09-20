const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma, truncateAll } = require('../../prisma.test.utils');

const app = buildApp();
jest.setTimeout(20000);

const PATH = '/api/option-group';

beforeEach(async () => {
  await truncateAll();
});

describe('GET option values (lista y detalle)', () => {
  it('200 - lista valores del grupo (ordenados) y no mezcla con otros', async () => {
    const g1 = await prisma.optionGroup.create({
      data: {
        name: 'Sauces',
        required: false,
        minSelectable: 0,
        maxSelectable: 3,
        showImages: false,
        OptionValue: {
          create: [
            { name: 'Ketchup', extraPrice: 0 },
            { name: 'BBQ',     extraPrice: 0.2 },
            { name: 'Aioli',   extraPrice: 0.3 },
          ],
        },
      },
      include: { OptionValue: true },
    });

    // Otro grupo con un valor (no debe aparecer cuando pedimos g1)
    await prisma.optionGroup.create({
      data: {
        name: 'Dressings',
        required: false,
        minSelectable: 0,
        maxSelectable: 2,
        showImages: false,
        OptionValue: { create: [{ name: 'Mayo', extraPrice: 0.1 }] },
      },
    });

    const res = await request(app)
      .get(`${PATH}/${encodeURIComponent(g1.id)}/values`)
      .send();

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
    expect(res.body.map(v => v.name)).toEqual(['Aioli', 'BBQ', 'Ketchup']);
    res.body.forEach(v => expect(v.groupId).toBe(g1.id));
  });

  it('200 - soporta filtro onlyAvailable=true', async () => {
    const g = await prisma.optionGroup.create({
      data: {
        name: 'Toppings',
        required: false,
        minSelectable: 0,
        maxSelectable: 3,
        showImages: false,
      },
    });

    const [a, b, c] = await prisma.$transaction([
      prisma.optionValue.create({ data: { groupId: g.id, name: 'Onion',  extraPrice: 0.2, isAvailable: true  } }),
      prisma.optionValue.create({ data: { groupId: g.id, name: 'Bacon',  extraPrice: 1.5, isAvailable: true  } }),
      prisma.optionValue.create({ data: { groupId: g.id, name: 'Olives', extraPrice: 0.5, isAvailable: false } }),
    ]);

    const resAll = await request(app).get(`${PATH}/${encodeURIComponent(g.id)}/values`).send();
    expect(resAll.status).toBe(200);
    expect(resAll.body.length).toBe(3);

    const resOnly = await request(app)
      .get(`${PATH}/${encodeURIComponent(g.id)}/values?onlyAvailable=true`)
      .send();
    expect(resOnly.status).toBe(200);
    expect(resOnly.body.length).toBe(2);
    const names = resOnly.body.map(v => v.name).sort();
    expect(names).toEqual(['Bacon', 'Onion']);
  });

  it('200 - lista de un grupo inexistente devuelve []', async () => {
    const badGroupId = '00000000-0000-0000-0000-000000000000';
    const res = await request(app).get(`${PATH}/${badGroupId}/values`).send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('200 - detalle por id devuelve el OptionValue', async () => {
    const g = await prisma.optionGroup.create({
      data: { name: 'Cheeses', required: false, minSelectable: 0, maxSelectable: 2, showImages: false },
    });
    const val = await prisma.optionValue.create({
      data: { groupId: g.id, name: 'Cheddar', extraPrice: 0.4, description: 'Yellow cheese' },
    });

    const res = await request(app)
      .get(`${PATH}/${encodeURIComponent(g.id)}/values/${encodeURIComponent(val.id)}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(val.id);
    expect(res.body.groupId).toBe(g.id);
    expect(res.body.name).toBe('Cheddar');
  });

  it('404 - detalle devuelve 404 si no existe (P2025)', async () => {
    const g = await prisma.optionGroup.create({
      data: { name: 'Dummy', required: false, minSelectable: 0, maxSelectable: 1, showImages: false },
    });

    const badValueId = '00000000-0000-0000-0000-000000000000';
    const res = await request(app)
      .get(`${PATH}/${encodeURIComponent(g.id)}/values/${badValueId}`)
      .send();

    expect(res.status).toBe(404);
    expect(String(res.body.message || '')).toMatch(/option value not found/i);
  });
});
