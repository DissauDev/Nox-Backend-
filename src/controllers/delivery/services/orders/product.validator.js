const { prisma } = require("../../../../lib/prisma");
const { HttpError } = require("../errors/httpError");

async function assertProductsExist(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new HttpError(400, "INVALID_ITEMS", "Cart is empty or invalid items.");
  }

  for (const item of items) {
    const prod = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!prod) {
      throw new HttpError(400, "PRODUCT_NOT_FOUND", `Product not found: ${item.productId}`);
    }
  }
}

module.exports = { assertProductsExist };
