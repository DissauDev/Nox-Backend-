// src/test/integration/settings/tax.settings.test.js
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma } = require('../../prisma.test.utils'); // o '../lib/prisma' si prefieres
jest.setTimeout(15000);

const app = buildApp();

async function resetConfig() {
  // Como solo hay un registro con id=1, es suficiente un deleteMany
  await prisma.storeConfig.deleteMany({});
}

async function getDbConfig() {
  return prisma.storeConfig.findUnique({ where: { id: 1 } });
}

beforeEach(async () => {
  await resetConfig();
});

describe('GET /api/settings/tax (getStoreConfig)', () => {
  it('404 - no hay config aún', async () => {
    const res = await request(app).get('/api/settings/tax').send();
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/config not found/i);
  });

  it('200 - devuelve la config existente', async () => {
    await prisma.storeConfig.create({
      data: { id: 1, taxEnabled: true, taxPercent: 8.25, taxFixed: 0.5, taxLabel: "My fee" }
    });

    const res = await request(app).get('/api/settings/tax').send();
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      taxEnabled: true,
      taxPercent: 8.25,
      taxFixed: 0.5,
      taxLabel: "My fee"
    });
  });
});

describe('POST /api/settings/tax (createStoreConfig)', () => {
  it('400 - faltan campos requeridos', async () => {
    const res = await request(app).post('/api/settings/tax').send({
      taxEnabled: true,
      // falta taxPercent / taxFixed
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/taxfixed,taxpercent & taxenabled are required/i);
  });

  it('201 - crea config válida', async () => {
    const res = await request(app).post('/api/settings/tax').send({
      taxEnabled: false,  // ojo: false es válido con la nueva validación
      taxPercent: 0,
      taxFixed: 1.25,
      taxLabel: "Service Fee"
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1, // si tu esquema default=1, Prisma lo pone en create
      taxEnabled: false,
      taxPercent: 0,
      taxFixed: 1.25,
      taxLabel: "Service Fee"
    });

    const db = await getDbConfig();
    expect(db).toMatchObject({
      id: 1,
      taxEnabled: false,
      taxPercent: 0,
      taxFixed: 1.25,
      taxLabel: "Service Fee"
    });
  });

  it('409/500 - (opcional) crear dos veces puede fallar por PK única', async () => {
    await request(app).post('/api/settings/tax').send({
      taxEnabled: true, taxPercent: 7.5, taxFixed: 0.3, taxLabel: "VAT"
    });
    const res2 = await request(app).post('/api/settings/tax').send({
      taxEnabled: true, taxPercent: 7.5, taxFixed: 0.3, taxLabel: "VAT"
    });
    // Dependiendo de cómo manejes el error, podría ser 500.
    // Este test es opcional si no vas a permitir múltiples POST.
    expect([409, 500]).toContain(res2.status);
  });
});

describe('PUT /api/settings/tax (updateStoreConfig)', () => {
  it('200 - upsert: crea si no existe (con el controller actualizado)', async () => {
    const res = await request(app).put('/api/settings/tax').send({
      taxEnabled: true,
      taxPercent: 8.5,
      taxFixed: 0.75,
      taxLabel: "Sales Tax"
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      taxEnabled: true,
      taxPercent: 8.5,
      taxFixed: 0.75,
      taxLabel: "Sales Tax"
    });

    const db = await getDbConfig();
    expect(db).toMatchObject({
      id: 1,
      taxEnabled: true,
      taxPercent: 8.5,
      taxFixed: 0.75,
      taxLabel: "Sales Tax"
    });
  });

  it('200 - actualiza si ya existe', async () => {
    await prisma.storeConfig.create({
      data: { id: 1, taxEnabled: false, taxPercent: 5, taxFixed: 0.2, taxLabel: "Old Tax" }
    });

    const res = await request(app).put('/api/settings/tax').send({
      taxEnabled: true,
      taxPercent: 9.99,
      taxFixed: 1.0,
      taxLabel: "Updated Tax"
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      taxEnabled: true,
      taxPercent: 9.99,
      taxFixed: 1.0,
      taxLabel: "Updated Tax"
    });

    const db = await getDbConfig();
    expect(db).toMatchObject({
      id: 1,
      taxEnabled: true,
      taxPercent: 9.99,
      taxFixed: 1.0,
      taxLabel: "Updated Tax"
    });
  });
});
