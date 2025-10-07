// src/utils/categoryImport.util.js
const { prisma } = require('../../lib/prisma');
const {
  mapEnum,
  buildCategoryRowSchema,
  StatusEnum,
} = require('./importCommon');

const CategoryRowSchema = buildCategoryRowSchema();

function validateCategoryRow(raw) {
  return CategoryRowSchema.safeParse(raw);
}

async function processCategoryRow(r, i, { dryRun, errors, skipped }) {
  // 1) map status
  const statusMapped = mapEnum(r.status, StatusEnum, 'AVAILABLE');

  // 2) duplicado por name
  const duplicate = await prisma.category.findUnique({ where: { name: r.name } });
  if (duplicate) {
    skipped.push({ row: i + 2, reason: 'duplicate_name', name: r.name });
    return false;
  }

  const data = {
    name: r.name,
    status: statusMapped,
    onCarousel: r.onCarousel ?? true,
    imageUrl: r.imageUrl,
    shortDescription: r.shortDescription || '',
    longDescription: r.longDescription || '',
    sortOrder: r.sortOrder ?? 0,
  };

  if (dryRun) return true;

  await prisma.category.create({ data });
  return true;
}

module.exports = {
  validateCategoryRow,
  processCategoryRow,
};
