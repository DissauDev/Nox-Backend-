// src/utils/productImport.util.js
const { prisma } = require('../../lib/prisma');
const { generateImageData } = require('../../middlewares/generateImageData');
const {
  mapEnum,
  isUuid,
  buildProductRowSchema,
  ProductTypeEnum,
  StatusEnum,
} = require('./importCommon');

const ProductRowSchema = buildProductRowSchema();

function validateProductRow(raw) {
  return ProductRowSchema.safeParse(raw);
}

async function processProductRow(r, i, { dryRun, errors, skipped }) {
  // 1) enums + reglas
  const typeMapped = mapEnum(r.type, ProductTypeEnum, 'REGULAR');
  const statusMapped = mapEnum(r.status, StatusEnum, 'AVAILABLE');
  if (r.salePrice != null && r.salePrice > r.price) {
    errors.push({ row: i + 2, type: 'business', message: 'salePrice no puede ser mayor que price' });
    return false;
  }

  // 2) duplicados por name
  const duplicate = await prisma.product.findUnique({ where: { name: r.name } });
  if (duplicate) {
    skipped.push({ row: i + 2, reason: 'duplicate_name', name: r.name });
    return false;
  }

  // 3) categoría por id o nombre
  const rawCat = String(r.category ?? '').trim();
  if (!rawCat) {
    errors.push({ row: i + 2, type: 'foreign_key', message: 'Missing category' });
    return false;
  }
  let cat = null;
  if (isUuid(rawCat)) {
    cat = await prisma.category.findUnique({ where: { id: rawCat } });
    if (!cat) cat = await prisma.category.findUnique({ where: { name: rawCat } });
  } else {
    cat = await prisma.category.findUnique({ where: { name: rawCat } });
    if (!cat && isUuid(rawCat)) cat = await prisma.category.findUnique({ where: { id: rawCat } });
  }
  if (!cat) {
    errors.push({ row: i + 2, type: 'foreign_key', message: `Category not found: ${rawCat}` });
    return false;
  }

  // 4) imágenes
  const imageLeft = await generateImageData(r.imageLeftUrl);
  if (!imageLeft) {
    errors.push({ row: i + 2, type: 'image', message: 'Error procesando imageLeftUrl' });
    return false;
  }
  let imageRight = undefined;
  if (r.imageRightUrl) {
    const right = await generateImageData(r.imageRightUrl);
    if (!right) {
      errors.push({ row: i + 2, type: 'image', message: 'Error procesando imageRightUrl' });
      return false;
    }
    imageRight = right;
  }

  // 5) options_json
  let optionGroupIds = [];
  if (r.options_json && r.options_json.trim() !== '') {
    try {
      const tmp = JSON.parse(r.options_json);
      if (!Array.isArray(tmp)) throw new Error('options_json debe ser un array de strings');
      optionGroupIds = [...new Set(tmp.map(String).map((s) => s.trim()).filter(Boolean))];
    } catch (e) {
      errors.push({ row: i + 2, type: 'options_json', message: e.message || 'options_json inválido' });
      return false;
    }
    if (optionGroupIds.length > 0) {
      const groups = await prisma.optionGroup.findMany({
        where: { id: { in: optionGroupIds } },
        select: { id: true },
      });
      const found = new Set(groups.map((g) => g.id));
      const missing = optionGroupIds.filter((id) => !found.has(id));
      if (missing.length) {
        errors.push({ row: i + 2, type: 'options_json', message: `OptionGroup inexistente: ${missing.join(', ')}` });
        return false;
      }
    }
  }

  const data = {
    name: r.name,
    price: r.price,
    salePrice: r.salePrice ?? undefined,
    specifications: r.specifications || undefined,
    description: r.description || undefined,
    imageLeft,
    imageRight,
    type: typeMapped, // ProductType
    status: statusMapped, // ProductStatus
    category: { connect: { id: cat.id } },
    isOptionItem: r.isOptionItem || false,
    packOptionSurcharge: r.packOptionSurcharge ?? 0,
    packMaxItems: r.packMaxItems ?? undefined,
  };

  if (dryRun) return true;

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({ data });
    if (optionGroupIds.length > 0) {
      await tx.productOption.createMany({
        data: optionGroupIds.map((groupId) => ({ productId: product.id, groupId })),
        skipDuplicates: true,
      });
    }
  });

  return true;
}

module.exports = {
  validateProductRow,
  processProductRow,
};
