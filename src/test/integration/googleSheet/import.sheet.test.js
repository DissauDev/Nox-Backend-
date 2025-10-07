/**
 * src/test/integration/import/import.sheet.test.js
 */
const request = require('supertest');
const { buildApp } = require('../../../../app');
const { prisma } = require('../../prisma.test.utils');

jest.setTimeout(30000);

// --- Mocks globales ---
beforeAll(() => {
  // Mock global fetch para devolver CSVs controlados en cada test
  global.fetch = jest.fn();
});

// Mock del generador de imágenes usado por el import de productos
// (coincide con el path que usa el controlador/útiles)
jest.mock('../../../../src/middlewares/generateImageData', () => ({
  generateImageData: jest.fn(async (url) => {
    if (!/^https?:\/\//i.test(url)) return null; // fuerza fallo si no es URL
    // Devuelve un objeto mínimo "válido" para insertar en la DB (tipo JSON)
    return { src: url, w: 100, h: 100, alt: 'mock' };
  }),
}));

const app = buildApp();
const BaseUrl = "/api/googleSheet/import"
// Helpers CSV
const csvJoin = (headers, rows) => {
  const head = headers.join(',');
  const lines = rows.map(r => headers.map(h => r[h] ?? '').join(','));
  return [head, ...lines].join('\n');
};

const H_PROD = [
  'name','price','category','imageLeftUrl',
  'salePrice','description','imageRightUrl','type','status','isOptionItem','packOptionSurcharge','packMaxItems','options_json','specifications'
];

const H_CAT = [
  'name','imageUrl','status','onCarousel','shortDescription','longDescription','sortOrder'
];

beforeEach(async () => {
  // Limpia tablas básicas implicadas (ajusta si necesitas más)
  await prisma.productOption.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
});

afterAll(async () => {
  jest.resetAllMocks();
});

describe(`POST ${BaseUrl}`, () => {
  it('imports CATEGORIES happy path (2 rows)', async () => {
    const rows = [
      {
        name: 'Brownies', imageUrl: 'https://example.com/cat1.jpg',
        status: 'AVAILABLE', onCarousel: 'true', shortDescription: 'Short 1', longDescription: 'Long 1', sortOrder: '1'
      },
      {
        name: 'Cookies', imageUrl: 'https://example.com/cat2.jpg',
        status: 'DISABLED', onCarousel: 'false', shortDescription: 'Short 2', longDescription: 'Long 2', sortOrder: '2'
      },
    ];
    const csv = csvJoin(H_CAT, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/cat.csv', type: 'Category', dryRun: false });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.type).toBe('Category');
    expect(res.body.total).toBe(2);
    expect(res.body.success).toBe(2);
    expect(res.body.failed).toBe(0);

    const cats = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
    expect(cats.length).toBe(2);
    expect(cats[0].name).toBe('Brownies');
    expect(cats[1].status).toBe('DISABLED');
  });

  it('imports PRODUCTS happy path (1 row) linking by existing category, with dryRun=false (creates product)', async () => {
    // Prepara categoría esperada por el CSV
    const cat = await prisma.category.create({
      data: {
        name: 'Cakes',
        status: 'AVAILABLE',
        onCarousel: true,
        imageUrl: 'https://example.com/cakes.jpg',
        shortDescription: 'Cakes',
        longDescription: 'All cakes',
        sortOrder: 0,
      }
    });

    const rows = [
      {
        name: 'Cheesecake',
        price: '12.50',
        category: cat.name,                     // vincula por nombre
        imageLeftUrl: 'https://example.com/cheese-left.jpg',
        salePrice: '9.99',                      // válido: >0 y <= price
        description: 'Creamy',
        imageRightUrl: 'https://example.com/cheese-right.jpg',
        type: 'REGULAR',
        status: 'AVAILABLE',
        isOptionItem: 'false',
        packOptionSurcharge: '0',
        packMaxItems: '',
        options_json: '',
        specifications: 'Keep cold',
      },
    ];
    const csv = csvJoin(H_PROD, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/prod.csv', type: 'Product', dryRun: false });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.type).toBe('Product');
    expect(res.body.total).toBe(1);
    expect(res.body.success).toBe(1);
    expect(res.body.failed).toBe(0);

    const prods = await prisma.product.findMany({ include: { category: true } });
    expect(prods.length).toBe(1);
    expect(prods[0].name).toBe('Cheesecake');
    expect(prods[0].price).toBe(12.5);
    expect(prods[0].salePrice).toBe(9.99);
    expect(prods[0].categoryId).toBe(cat.id);
  });

  it('dryRun=true: validates but does NOT create records', async () => {
    const catCsv = csvJoin(H_CAT, [{
      name: 'Bars', imageUrl: 'https://example.com/bars.jpg', status: 'AVAILABLE', onCarousel: 'true', shortDescription: '', longDescription: '', sortOrder: '0'
    }]);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => catCsv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/cat.csv', type: 'Category', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.success).toBe(1);

    const cats = await prisma.category.findMany();
    expect(cats.length).toBe(0); // no crea
  });

  it('mismatched upload: Category CSV uploaded as Product → 400 with clear message', async () => {
    const csv = csvJoin(H_CAT, [{
      name: 'Muffins', imageUrl: 'https://example.com/muf.jpg', status: 'AVAILABLE', onCarousel: 'true', shortDescription: '', longDescription: '', sortOrder: '0'
    }]);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/wrong.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.detectedType).toBe('Category');
    expect(res.body.expectedType).toBe('Product');
    expect(Array.isArray(res.body.missingColumnsInExpected)).toBe(true);
  });

  it('mismatched upload: Product CSV uploaded as Category → 400 with clear message', async () => {
    const prodCsv = csvJoin(H_PROD, [{
      name: 'Cupcake', price: '3.00', category: 'Cakes', imageLeftUrl: 'https://example.com/left.jpg'
    }]);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => prodCsv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/wrong.csv', type: 'Category', dryRun: true });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.detectedType).toBe('Product');
    expect(res.body.expectedType).toBe('Category');
  });

  it('unknown headers → 400 with guidance', async () => {
    const headers = ['foo','bar','baz'];
    const csv = csvJoin(headers, [{ foo: 'x', bar: 'y', baz: 'z' }]);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/unknown.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/could not identify/i);
    expect(Array.isArray(res.body.sampleHeaders)).toBe(true);
  });

  it('empty CSV → 400 with hint', async () => {
    // Solo headers sin filas produce [] con columns:true? -> depende; aseguramos vacío
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => '' });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/empty.csv', type: 'Category', dryRun: true });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/empty/i);
  });

  it('Product: missing required fields (price empty) → counted as failed', async () => {
    // Prepara categoría existente
    await prisma.category.create({
      data: {
        name: 'Pies',
        status: 'AVAILABLE',
        onCarousel: true,
        imageUrl: 'https://example.com/c.jpg',
        shortDescription: '',
        longDescription: '',
        sortOrder: 0,
      }
    });

    const rows = [{
      name: 'Apple Pie',
      price: '', // <-- requerido faltante
      category: 'Pies',
      imageLeftUrl: 'https://example.com/left.jpg'
    }];
    const csv = csvJoin(H_PROD, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/missing.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.total).toBe(1);
    expect(res.body.success).toBe(0);
    expect(res.body.failed).toBe(1);
    const miss = res.body.errors.find(e => e.type === 'missing_required');
    expect(miss).toBeTruthy();
    expect(miss.message).toMatch(/price/);
  });

  it('Product: business rule - price <= 0 → failed', async () => {
    await prisma.category.create({
      data: {
        name: 'Candy',
        status: 'AVAILABLE',
        onCarousel: true,
        imageUrl: 'https://example.com/c.jpg',
        shortDescription: '',
        longDescription: '',
        sortOrder: 0,
      }
    });

    const rows = [{
      name: 'Lollipop',
      price: '0', // <-- no puede ser 0
      category: 'Candy',
      imageLeftUrl: 'https://example.com/left.jpg'
    }];
    const csv = csvJoin(H_PROD, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/biz.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(0);
    const err = res.body.errors.find(e => e.type === 'business');
    expect(err.message).toMatch(/price.*greater than zero/i);
  });

  it('Product: salePrice > price → failed', async () => {
    await prisma.category.create({
      data: {
        name: 'Tarts',
        status: 'AVAILABLE',
        onCarousel: true,
        imageUrl: 'https://example.com/c.jpg',
        shortDescription: '',
        longDescription: '',
        sortOrder: 0,
      }
    });

    const rows = [{
      name: 'Fruit Tart',
      price: '5.00',
      salePrice: '6.00',                // <-- mayor que price
      category: 'Tarts',
      imageLeftUrl: 'https://example.com/left.jpg'
    }];
    const csv = csvJoin(H_PROD, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/biz2.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(0);
    const err = res.body.errors.find(e => e.type === 'business');
    expect(err.message).toMatch(/salePrice.*cannot be greater/i);
  });

  it('Product: salePrice = 0 (present) → failed', async () => {
    await prisma.category.create({
      data: {
        name: 'Ice Cream',
        status: 'AVAILABLE',
        onCarousel: true,
        imageUrl: 'https://example.com/c.jpg',
        shortDescription: '',
        longDescription: '',
        sortOrder: 0,
      }
    });

    const rows = [{
      name: 'Vanilla',
      price: '4.00',
      salePrice: '0',                    // <-- no puede ser 0 si viene
      category: 'Ice Cream',
      imageLeftUrl: 'https://example.com/left.jpg'
    }];
    const csv = csvJoin(H_PROD, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/biz3.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(0);
    const err = res.body.errors.find(e => e.type === 'business');
    expect(err.message).toMatch(/salePrice.*greater than zero/i);
  });

  it('Product: invalid imageLeftUrl → validation fails', async () => {
    await prisma.category.create({
      data: {
        name: 'Bread',
        status: 'AVAILABLE',
        onCarousel: true,
        imageUrl: 'https://example.com/c.jpg',
        shortDescription: '',
        longDescription: '',
        sortOrder: 0,
      }
    });

    const rows = [{
      name: 'Baguette',
      price: '3.00',
      category: 'Bread',
      imageLeftUrl: 'not-a-url' // <-- inválido
    }];
    const csv = csvJoin(H_PROD, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/invalidimg.csv', type: 'Product', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(0);
    const err = res.body.errors.find(e => e.type === 'validation');
    expect(err).toBeTruthy();
  });

  it('Category: required string fields must be non-empty → failed', async () => {
    const rows = [{
      name: '', imageUrl: 'https://example.com/c.jpg'
    }];
    const csv = csvJoin(H_CAT, rows);
    global.fetch.mockResolvedValueOnce({ ok: true, status: 200, text: async () => csv });

    const res = await request(app)
      .post(`${BaseUrl}`)
      .send({ csvUrl: 'https://fake.local/cat-missing.csv', type: 'Category', dryRun: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(0);
    const m = res.body.errors.find(e => e.type === 'missing_required' || e.type === 'type');
    expect(m).toBeTruthy();
  });
});
