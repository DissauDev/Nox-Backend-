const request = require('supertest');
const { buildApp } = require('../../../../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = buildApp();

// ---------- helpers (factories mínimas) ----------
async function createCategory(overrides = {}) {
  return prisma.category.create({
    data: {
      name: `Cat-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      status: 'AVAILABLE',
      onCarousel: true,
      imageUrl: 'https://example.com/img.jpg',
      shortDescription: 'Short',
      longDescription: 'Long',
      sortOrder: 0,
      ...overrides,
    },
  });
}

async function createProduct(overrides = {}) {
  const cat = overrides.categoryId ? null : await createCategory();
  return prisma.product.create({
    data: {
      name: `Prod-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      price: 5.0,
      description: 'Test product',
      type: 'REGULAR',
      status: 'AVAILABLE',
      categoryId: overrides.categoryId || cat.id,
      isOptionItem: false,
      packOptionSurcharge: 0,
      ...overrides,
    },
  });
}

async function createUser(overrides = {}) {
  return prisma.user.create({
    data: {
      email: `user_${Date.now()}@example.com`,
      name: 'Tester',
      password: 'hashed',
      role: 'USER',
      ...overrides,
    },
  });
}

async function createOrder(overrides = {}) {
  // por defecto sin items
  return prisma.order.create({
    data: {
      orderNumber: overrides.orderNumber || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: overrides.status || 'PROCESSING',
      subtotal: overrides.subtotal ?? 10.0,
      totalAmount: overrides.totalAmount ?? 10.0,
      paymentMethod: overrides.paymentMethod || 'Stripe',
      stripePaymentIntentId: overrides.stripePaymentIntentId || 'pi_dummy',
      customerName: overrides.customerName || 'John',
      customerEmail: overrides.customerEmail || 'john@example.com',
      customerPhone: overrides.customerPhone || '555-555',
      customerAddress: overrides.customerAddress || '123 Any St',
      customerLastname: overrides.customerLastname || 'Doe',
      billingState: overrides.billingState || 'CA',
      billingCity: overrides.billingCity || 'San Jose',
      createdAt: overrides.createdAt, // permite setear fecha
      user: overrides.userId ? { connect: { id: overrides.userId } } : undefined,
    },
    include: { items: true, user: true },
  });
}

async function createOrderWithItem(overrides = {}) {
  const product = await createProduct();
  return prisma.order.create({
    data: {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: overrides.status || 'PAID',
      subtotal: overrides.subtotal ?? 10.0,
      totalAmount: overrides.totalAmount ?? 10.0,
      paymentMethod: 'Stripe',
      stripePaymentIntentId: 'pi_item',
      customerName: 'Alice',
      customerEmail: overrides.customerEmail || 'alice@example.com',
      customerPhone: '555-000',
      customerAddress: overrides.customerAddress || '123 Test St',
      billingCity: 'Miami',
      billingState: 'FL',
      createdAt: overrides.createdAt,
      items: {
        create: [
          { productId: product.id, quantity: 2, price: 5.0, chosenOptions: null },
        ],
      },
    },
  });
}

// Dirección usada por tu filtro origin (pickup)
const PICKUP_ADDRESS = '422 E Campbell Ave, Campbell, CA 95008';

// -------------------------------------------------

describe('GET /api/orders (filtros y paginación)', () => {
  it('filtra por status (status=PAID)', async () => {
    await createOrder({ status: 'PAID' });
    await createOrder({ status: 'PROCESSING' });

    const res = await request(app).get('/api/orders?status=PAID');
    expect(res.status).toBe(200);
    expect(res.body.orders.length).toBeGreaterThan(0);
    expect(res.body.orders.every(o => o.status === 'PAID')).toBe(true);
  });

  it('filtra por customerType (registered/unregistered)', async () => {
    const user = await createUser();
    await createOrder({ userId: user.id });      // registered
    await createOrder({ userId: null });         // unregistered

    const resReg = await request(app).get('/api/orders?customerType=registered');
    expect(resReg.status).toBe(200);
    expect(resReg.body.orders.every(o => o.userId)).toBe(true);

    const resUnreg = await request(app).get('/api/orders?customerType=unregistered');
    expect(resUnreg.status).toBe(200);
    expect(resUnreg.body.orders.every(o => o.userId === null)).toBe(true);
  });

  it('filtra por orderNumber (contains, case-insensitive)', async () => {
    await createOrder({ orderNumber: 'ORD-7777' });
    await createOrder({ orderNumber: 'ORD-1234' });

    const res = await request(app).get('/api/orders?orderNumber=234');
    expect(res.status).toBe(200);
    // debería traer la 1234
    expect(res.body.orders.some(o => o.orderNumber === 'ORD-1234')).toBe(true);
  });

  it('filtra por dateFilter (today / this_week / this_month)', async () => {
    const now = new Date();
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const fortyDaysAgo = new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000);

    await createOrder({ createdAt: now, orderNumber: 'ORD-TODAY' });
    await createOrder({ createdAt: tenDaysAgo, orderNumber: 'ORD-10D' });
    await createOrder({ createdAt: fortyDaysAgo, orderNumber: 'ORD-40D' });

    const resWeek = await request(app).get('/api/orders?dateFilter=this_week');
    expect(resWeek.status).toBe(200);
    // this_week ~ últimos 7 días => debería contener la de hoy pero no la de 10/40 días
    expect(resWeek.body.orders.some(o => o.orderNumber === 'ORD-TODAY')).toBe(true);
    expect(resWeek.body.orders.some(o => o.orderNumber === 'ORD-10D')).toBe(false);

    const resMonth = await request(app).get('/api/orders?dateFilter=this_month');
    expect(resMonth.status).toBe(200);
    // depende del día del mes; al menos debería incluir ORD-TODAY
    expect(resMonth.body.orders.some(o => o.orderNumber === 'ORD-TODAY')).toBe(true);
  });

  it('filtra por origin (pickup/delivery)', async () => {
    await createOrder({ customerAddress: PICKUP_ADDRESS, orderNumber: 'ORD-PICKUP' });
    await createOrder({ customerAddress: 'Some Other Address', orderNumber: 'ORD-DELIVERY' });

    const resPickup = await request(app).get('/api/orders?origin=pickup');
    expect(resPickup.status).toBe(200);
    expect(resPickup.body.orders.every(o => o.customerAddress === PICKUP_ADDRESS)).toBe(true);

    const resDelivery = await request(app).get('/api/orders?origin=delivery');
    expect(resDelivery.status).toBe(200);
    expect(resDelivery.body.orders.every(o => o.customerAddress !== PICKUP_ADDRESS)).toBe(true);
  });

  it('paginación (page & perPage) y orden por createdAt desc', async () => {
    // 3 órdenes con timestamps distintos
    const now = new Date();
    const older = new Date(now.getTime() - 60 * 1000);
    const oldest = new Date(now.getTime() - 120 * 1000);

    const o1 = await createOrder({ createdAt: oldest, orderNumber: 'ORD-OLDest' });
    const o2 = await createOrder({ createdAt: older, orderNumber: 'ORD-OLD' });
    const o3 = await createOrder({ createdAt: now, orderNumber: 'ORD-NEW' });

    const res = await request(app).get('/api/orders?page=1&perPage=2');
    expect(res.status).toBe(200);
    expect(res.body.perPage).toBe(2);
    expect(res.body.page).toBe(1);
    // deberían ser las 2 más nuevas
    const numbers = res.body.orders.map(o => o.orderNumber);
    expect(numbers).toContain('ORD-NEW');
    expect(numbers).toContain('ORD-OLD');
  });
});

describe('PATCh /api/orders/:id/status (updateOrderStatus)', () => {
  // ⚠️ Si tu ruta real es PATCH /api/orders/:id, cambia la URL de abajo
  it('200 - cambia status válido y retorna { success, order }', async () => {
    const order = await createOrder({ status: 'PENDING' });

    const res = await request(app)
      .patch(`/api/orders/${order.id}/status`)
      .send({ status: 'PROCESSING' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.order.id).toBe(order.id);
    expect(res.body.order.status).toBe('PROCESSING');
  });

  it('400 - falta status', async () => {
    const order = await createOrder();

    const res = await request(app)
      .patch(`/api/orders/${order.id}/status`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Field Status is requiered/i);
  });

  it('400 - status inválido', async () => {
    const order = await createOrder();

    const res = await request(app)
      .patch(`/api/orders/${order.id}/status`)
      .send({ status: 'NOT_A_STATUS' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Status invalid/i);
  });

  it('404 - orden inexistente', async () => {
    const res = await request(app)
      .patch('/api/orders/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/status')
      .send({ status: 'PAID' });

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/Order not found/i);
  });
});

describe('GET /api/orders/:id (getOrderById)', () => {
  it('200 - retorna la orden con items y relaciones mínimas', async () => {
    const created = await createOrderWithItem();
    const res = await request(app).get(`/api/orders/${created.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.id);
    expect(Array.isArray(res.body.items)).toBe(true);
    // el include del controlador trae product y category dentro
    if (res.body.items.length > 0) {
      const it = res.body.items[0];
      expect(it.product).toBeTruthy();
      expect(it.product.category).toBeTruthy();
      expect(it.product.category).toHaveProperty('name');
    }
  });

  it('404 - no existe', async () => {
    const res = await request(app).get('/api/orders/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/Orden not found/i);
  });
});

describe('GET /api/orders/user/:email (getUserOrders)', () => {
  it('200 - resume correcto con órdenes', async () => {
    const email = `buyer_${Date.now()}@example.com`;
    await createOrder({ customerEmail: email, totalAmount: 10.0 });
    await createOrder({ customerEmail: email, totalAmount: 20.0 });

    const res = await request(app).get(`/api/orders/user/${encodeURIComponent(email)}`);
    expect(res.status).toBe(200);

    expect(Array.isArray(res.body.orders)).toBe(true);
    expect(res.body.resume.count).toBe(2);
    expect(res.body.resume.totalSpent).toBe(30.0);
    expect(res.body.resume.average).toBe(15.0);
  });

  it('200 - sin órdenes devuelve resume en cero', async () => {
    const email = `no_orders_${Date.now()}@example.com`;
    const res = await request(app).get(`/api/orders/user/${encodeURIComponent(email)}`);

    expect(res.status).toBe(200);
    expect(res.body.orders.length).toBe(0);
    expect(res.body.resume.count).toBe(0);
    expect(res.body.resume.totalSpent).toBe(0);
    expect(res.body.resume.average).toBe(0);
  });
});
