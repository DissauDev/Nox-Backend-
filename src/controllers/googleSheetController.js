// controllers/importGoogleSheet.js
const { parse } = require('csv-parse/sync');
const { z } = require('zod');
const { generateImageData } = require('../middlewares/generateImageData.js');
const { prisma } = require('../lib/prisma');

/** Utils */
const toNumber = (v) => Number(String(v ?? '').replace(',', '.'));
const toInt = (v) => parseInt(String(v ?? ''), 10);
const toBool = (v) => /^(1|true|sí|si|yes|y)$/i.test(String(v ?? '').trim());
const mapEnum = (val, allowed, def) => {
  const s = String(val ?? '').trim().toUpperCase();
  return allowed.includes(s) ? s : def;
};
const urlRegex = /^https?:\/\/.+/i;

const ProductTypeEnum = ['REGULAR', 'SEASONAL'];
const StatusEnum = ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'];

/** ====== SCHEMAS ====== **/

// Producto (igual que el tuyo, renombrado)
const ProductRowSchema = z.object({
  name: z.string().min(1, 'name requerido').transform((s) => s.trim()),
  description: z.string().optional(),
  price: z.any().transform(toNumber).pipe(z.number().finite().nonnegative()),
  sellPrice: z
    .any()
    .optional()
    .transform((v) => {
      if (v == null || String(v).trim() === '') return undefined;
      return toNumber(v);
    })
    .pipe(z.number().finite().nonnegative().optional()),
  specifications: z.string().optional(),
  options_json: z.string().optional(), // JSON array de groupIds
  category: z.string().min(1, 'category requerida').transform((s) => s.trim()),
  imageLeftUrl: z
    .string()
    .min(1, 'imageLeftUrl requerida')
    .refine((v) => urlRegex.test(v), 'imageLeftUrl inválida'),
  imageRightUrl: z.string().optional().refine((v) => !v || urlRegex.test(v), 'imageRightUrl inválida'),
  type: z.string().optional(),
  status: z.string().optional(),
  isOptionItem: z.any().optional().transform(toBool).default(false),
  packOptionSurcharge: z
    .any()
    .optional()
    .transform((v) => {
      if (v == null || String(v).trim() === '') return 0;
      return toNumber(v);
    })
    .pipe(z.number().finite().min(0)),
  packMaxItems: z
    .any()
    .optional()
    .transform((v) => {
      if (v == null || String(v).trim() === '') return undefined;
      return toInt(v);
    })
    .pipe(z.number().int().positive().optional()),
});

// Categoría (nuevo)
const CategoryRowSchema = z.object({
  name: z.string().min(1, 'name requerido').transform((s) => s.trim()),
  status: z.string().optional(),                 // AVAILABLE | DISABLED | OUT_OF_STOCK
  onCarousel: z.any().optional().transform(toBool).default(true),
  imageUrl: z.string().min(1, 'imageUrl requerido').refine((v) => urlRegex.test(v), 'imageUrl inválida'),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  sortOrder: z
    .any()
    .optional()
    .transform((v) => {
      if (v == null || String(v).trim() === '') return 0;
      return toInt(v);
    })
    .pipe(z.number().int()),
});

/** ====== HELPERS ====== **/
const isUuid = (s) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(s || ''));

async function processProductRow(r, i, { dryRun, errors, skipped }) {
  // 1) enums + reglas
  const typeMapped = mapEnum(r.type, ProductTypeEnum, 'REGULAR');
  const statusMapped = mapEnum(r.status, StatusEnum, 'AVAILABLE');
  if (r.sellPrice != null && r.sellPrice > r.price) {
    errors.push({ row: i + 2, type: 'business', message: 'sellPrice no puede ser mayor que price' });
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
    sellPrice: r.sellPrice ?? undefined,
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
    status: statusMapped,           // ProductStatus enum en tu Category
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

/** ====== MAIN CONTROLLER ====== **/
async function importGoogleSheet(req, res) {
  try {
    const { csvUrl, dryRun, type = 'Product' } = req.body || {};

    if (!csvUrl) {
      return res.status(400).json({ ok: false, error: 'csvUrl requerido' });
    }

    // 1) Descargar CSV
    const resp = await fetch(csvUrl);
    if (!resp.ok) {
      return res.status(400).json({ ok: false, error: `No se pudo leer CSV (${resp.status})` });
    }
    const csvText = await resp.text();

    // 2) Parsear CSV a objetos por columnas
    const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });

    const errors = [];
    const skipped = [];
    let success = 0;

    // 3) Procesar fila a fila
    for (let i = 0; i < rows.length; i++) {
      const raw = rows[i];

      if (String(type).toLowerCase() === 'category') {
        // Validar Category
        const parsed = CategoryRowSchema.safeParse(raw);
        if (!parsed.success) {
          errors.push({ row: i + 2, type: 'validation', issues: parsed.error.flatten() });
          continue;
        }
        const ok = await processCategoryRow(parsed.data, i, { dryRun, errors, skipped });
        if (ok) success++;
      } else {
        // Validar Product
        const parsed = ProductRowSchema.safeParse(raw);
        if (!parsed.success) {
          errors.push({ row: i + 2, type: 'validation', issues: parsed.error.flatten() });
          continue;
        }
        const ok = await processProductRow(parsed.data, i, { dryRun, errors, skipped });
        if (ok) success++;
      }
    }

    return res.json({
      ok: true,
      type,
      total: rows.length,
      success,
      failed: errors.length,
      skipped: skipped.length,
      skippedRows: skipped,
      errors,
      dryRun: !!dryRun,
    });
  } catch (e) {
    console.error('Import error:', e);
    return res.status(500).json({ ok: false, error: e.message || 'Internal server error' });
  }
}

module.exports = { importGoogleSheet };
