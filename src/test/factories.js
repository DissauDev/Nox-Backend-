const { prisma } = require('./prisma.test.utils');

function uniqueSuffix() {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

async function createCategory(overrides = {}) {
  return prisma.category.create({
    data: {
      name: `Cat ${Date.now()}-${Math.random().toString(16).slice(2)}`,
      status: 'AVAILABLE',
      onCarousel: true,
      imageUrl: 'https://example.com/img.jpg',
      shortDescription: 'Short desc',
      longDescription: 'Long desc',
      sortOrder: 0,
      ...overrides,
    },
  });
}

async function createProduct(overrides = {}) {
  const category = overrides.categoryId
    ? null
    : await createCategory();

  return prisma.product.create({
    data: {
      name: `Prod ${Date.now()}-${Math.random().toString(16).slice(2)}`,
      price: 4.5, // Float según tu schema
      salePrice: null,
      specifications: null,
      description: 'Test product',
      imageLeft: null,
      imageRight: null,
      type: 'REGULAR',
      status: 'AVAILABLE',
      categoryId: overrides.categoryId || category.id,
      isOptionItem: false,
      packOptionSurcharge: 0,
      packMaxItems: null,
      ...overrides,
    },
  });
}

async function createUser(data = {}) {
    const base = {
      email: `u_${uniqueSuffix()}@example.com`,
      name: 'User',
      role: 'USER',
      password: 'x',
      createdAt: new Date(),
    };
    return prisma.user.create({ data: { ...base, ...data } });
  }

  async function createOrderWithItem({
    // requeridos/útiles
    productId,
    quantity = 1,
    price = 100,
    status = 'PAID',
    totalAmount,            // si no viene, se calcula qty*price
    createdAt = new Date(),
    userId = null,

    // campos de orden con defaults “seguros”
    paymentMethod = 'Stripe',
    customerName = 'John',
    customerLastname = 'Doe',
    customerEmail = 'buyer@example.com',
    customerPhone = '+1 555 555 5555',
    customerAddress = '123 Test St',
    billingCity = 'San Jose',
    billingState = 'CA',
    specifications = null,  // si tu columna no admite null, cámbialo por ''
    stripePaymentIntentId,
  } = {}) {
    if (!productId) throw new Error('productId is required');

    const amount = totalAmount ?? Number((quantity * price).toFixed(2));

    return prisma.order.create({
      data: {
        status,
        orderNumber: `ORD_${uniqueSuffix()}`,
        subtotal: amount,
        totalAmount: amount,
        paymentMethod,
        customerName,
        customerLastname,
        customerEmail,
        customerPhone,
        customerAddress,      // requerido en tu esquema
        billingCity,
        billingState,
        specifications,
        createdAt,
        stripePaymentIntentId:
          stripePaymentIntentId ??
          `pi_test_${uniqueSuffix()}`,
        ...(userId ? { user: { connect: { id: userId } } } : {}),
        items: {
          create: [
            {
              product: { connect: { id: productId } },
              quantity,
              price,
              chosenOptions: null,
            },
          ],
        },
      },
      include: { items: true },
    });
  }

module.exports = { createCategory, createProduct, createUser, createOrderWithItem };
