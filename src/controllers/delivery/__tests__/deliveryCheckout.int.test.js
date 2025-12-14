/**
 * Integration tests:
 * - POST /delivery/accept
 * - Mocks:
 *   - DoorDash: nock
 *   - Stripe: jest.mock('stripe')
 * - DB:
 *   - Prisma with test DATABASE_URL (sqlite file)
 */

const request = require("supertest");
const nock = require("nock");
const { prisma } = require("../../../lib/prisma");

// ⚠️ Ajusta este import al entrypoint real de tu Express app
// Ej: const app = require("../../../app");
const app = require("../../../app");

// -----------------------
// Stripe mock
// -----------------------
let stripeMockState = {
  createStatus: "requires_capture",
  captureShouldFail: false,
};

jest.mock("stripe", () => {
  return () => ({
    paymentIntents: {
      create: jest.fn(async () => ({
        id: "pi_test_123",
        status: stripeMockState.createStatus,
      })),
      cancel: jest.fn(async () => ({ id: "pi_test_123", status: "canceled" })),
      capture: jest.fn(async () => {
        if (stripeMockState.captureShouldFail) {
          const err = new Error("Capture failed");
          err.type = "StripeError";
          throw err;
        }
        return { id: "pi_test_123", status: "succeeded" };
      }),
    },
  });
});

// -----------------------
// Helpers
// -----------------------
async function seedProduct() {
  // Ajusta el modelo/fields según tu schema real
  return prisma.product.create({
    data: {
      id: "prod_test_1",
      name: "Cookie",
      price: 0.1,
      // ... agrega campos requeridos por tu schema
    },
  });
}

function basePayload(overrides = {}) {
  return {
    checkoutRequestId: "b08cb08b-1dfc-4fdd-8d29-21cdb921ff54",
    items: [
      {
        productId: "prod_test_1",
        quantity: 2,
        price: 0.1,
        options: [],
        specifications: "",
      },
    ],

    amount: 10.5,
    subtotal: 0.2,

    customerEmail: "test@example.com",
    customerPhone: "+14085550000",
    customerName: "John",
    lastName: "Doe",

    customerAddress: "400 W San Carlos",
    apartment: null,
    company: null,

    billingCity: "San Jose",
    billingState: "CA",
    zipcode: "95112",

    paymentMethodId: "pm_test_123",

    externalDeliveryId: "quote_123",
    tip: 200,

    sendEmail: false,

    ...overrides,
  };
}

beforeAll(async () => {
  // Limpia DB
  await prisma.delivery.deleteMany();
  await prisma.orderItem.deleteMany?.(); // si existe
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await seedProduct();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  nock.cleanAll();
  stripeMockState.createStatus = "requires_capture";
  stripeMockState.captureShouldFail = false;

  // Limpia tablas relevantes para cada test
  await prisma.delivery.deleteMany();
  await prisma.orderItem?.deleteMany?.();
  await prisma.order.deleteMany();
});

afterEach(() => {
  expect(nock.isDone()).toBe(true);
});

// -----------------------
// Tests
// -----------------------
describe("Delivery checkout flow", () => {
  test("HAPPY PATH: authorize -> accept quote -> create order+delivery -> capture -> returns PAID", async () => {
    // DoorDash accept mock
    nock("https://openapi.doordash.com")
      .post("/drive/v2/quotes/quote_123/accept", (body) => {
        // body should contain tip sometimes
        return body && typeof body === "object";
      })
      .reply(200, {
        external_delivery_id: "quote_123",
        delivery_id: "dd_del_1",
        delivery_status: "DASHER_CONFIRMED",
        fee: 500,
        tip: 200,
        currency: "USD",
        tracking_url: "https://tracking.example.com",
      });

    const res = await request(app)
      .post("/delivery/accept") // ajusta a tu ruta real
      .send(basePayload())
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.order).toBeTruthy();
    expect(res.body.delivery).toBeTruthy();

    // ✅ Esto es lo importante: NO debe ser AUTHORIZED si el endpoint hace checkout completo
    expect(res.body.order.status).toBe("PAID");
    expect(res.body.delivery.externalDeliveryId).toBe("quote_123");
  });

  test("QUOTE EXPIRED: cancels Stripe authorization and returns 409, no PAID order", async () => {
    nock("https://openapi.doordash.com")
      .post("/drive/v2/quotes/quote_123/accept")
      .reply(400, { code: "validation_error", message: "Quote Expired" });

    const res = await request(app)
      .post("/delivery/accept")
      .send(basePayload())
      .expect(409);

    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe("QUOTE_EXPIRED");

    const orders = await prisma.order.findMany();
    // Depende de tu estrategia:
    // - si NO creas orden hasta después de doordash accept => 0
    // - si creas PENDING antes => debe quedar FAILED/CANCELLED, pero nunca PAID
    expect(orders.find((o) => o.status === "PAID")).toBeFalsy();
  });

  test("CAPTURE FAIL: marks PAYMENT_CAPTURE_FAILED and returns 502", async () => {
    stripeMockState.captureShouldFail = true;

    nock("https://openapi.doordash.com")
      .post("/drive/v2/quotes/quote_123/accept")
      .reply(200, {
        external_delivery_id: "quote_123",
        delivery_id: "dd_del_1",
        delivery_status: "DASHER_CONFIRMED",
        fee: 500,
        tip: 200,
        currency: "USD",
      });

    const res = await request(app)
      .post("/delivery/accept")
      .send(basePayload())
      .expect(502);

    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe("PAYMENT_CAPTURE_FAILED");

    const order = await prisma.order.findFirst();
    expect(order).toBeTruthy();
    expect(order.status).toBe("PAYMENT_CAPTURE_FAILED");
  });

  test("IDEMPOTENCY: same checkoutRequestId does not create duplicates", async () => {
    nock("https://openapi.doordash.com")
      .post("/drive/v2/quotes/quote_123/accept")
      .reply(200, {
        external_delivery_id: "quote_123",
        delivery_id: "dd_del_1",
        delivery_status: "DASHER_CONFIRMED",
        fee: 500,
        tip: 200,
        currency: "USD",
      });

    await request(app).post("/delivery/accept").send(basePayload()).expect(201);

    // Second call: depending on your implementation
    // - should return 200 alreadyProcessed true
    // - and should not create new order rows
    const res2 = await request(app).post("/delivery/accept").send(basePayload()).expect((r) => {
      expect([200, 201]).toContain(r.status);
    });

    const orders = await prisma.order.findMany({
      where: { checkoutRequestId: basePayload().checkoutRequestId },
    });
    expect(orders.length).toBe(1);

    // If you expose alreadyProcessed
    if (res2.body.alreadyProcessed != null) {
      expect(typeof res2.body.alreadyProcessed).toBe("boolean");
    }
  });
});
