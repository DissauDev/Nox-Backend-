const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ⚠️ Ajusta la lista según tus migraciones reales. Usa CASCADE y RESTART IDENTITY.
async function truncateAll() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "CouponRedemption",
      "Coupon",
      "OrderItem",
      "Order",
      "ProductOptionValue",
      "ProductOption",
      "OptionValue",
      "OptionGroup",
      "Product",
      "Category",
      "Page",
      "User",
      "StoreConfig"
    RESTART IDENTITY CASCADE;
  `);
}

async function disconnect() {
  await prisma.$disconnect();
}

module.exports = { prisma, truncateAll, disconnect };
