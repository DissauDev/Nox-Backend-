// src/utils/importCommon.js
const { z } = require('zod');

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

const isUuid = (s) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(s || ''));

// Schemas “builders” por si quieres sobreescribir algo desde fuera
const buildProductRowSchema = () =>
  z.object({
    name: z.string().min(1, 'name requerido').transform((s) => s.trim()),
    description: z.string().optional(),
    price: z.any().transform(toNumber).pipe(z.number().finite().nonnegative()),
    salePrice: z
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

const buildCategoryRowSchema = () =>
  z.object({
    name: z.string().min(1, 'name requerido').transform((s) => s.trim()),
    status: z.string().optional(), // AVAILABLE | DISABLED | OUT_OF_STOCK
    onCarousel: z.any().optional().transform(toBool).default(true),
    imageUrl: z
      .string()
      .min(1, 'imageUrl requerido')
      .refine((v) => urlRegex.test(v), 'imageUrl inválida'),
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

  // --- Reglas de columnas requeridas y opcionales ---
const PRODUCT_REQUIRED_KEYS = ['name', 'price', 'category', 'imageLeftUrl'];
const PRODUCT_OPTIONAL_KEYS = [
  'description', 'salePrice', 'specifications', 'options_json',
  'imageRightUrl', 'type', 'status', 'isOptionItem',
  'packOptionSurcharge', 'packMaxItems'
];

const CATEGORY_REQUIRED_KEYS = ['name', 'imageUrl'];
const CATEGORY_OPTIONAL_KEYS = [
  'status', 'onCarousel', 'shortDescription', 'longDescription', 'sortOrder'
];

// Normaliza a lowercase y sin espacios
function normalizeHeader(h) {
  return String(h || '').trim().toLowerCase();
}

// Detecta el tipo de hoja con base en headers
function detectSheetTypeByHeaders(headers = []) {
  const norm = new Set(headers.map(normalizeHeader));

  const reqProdMissing = PRODUCT_REQUIRED_KEYS.filter(k => !norm.has(k.toLowerCase()));
  const reqCatMissing  = CATEGORY_REQUIRED_KEYS.filter(k => !norm.has(k.toLowerCase()));

  // “Score” simple: cuántas requeridas cumple
  const prodScore = PRODUCT_REQUIRED_KEYS.length - reqProdMissing.length;
  const catScore  = CATEGORY_REQUIRED_KEYS.length - reqCatMissing.length;

  let detected = 'unknown';
  if (prodScore > 0 || catScore > 0) {
    if (prodScore > catScore) detected = 'product';
    else if (catScore > prodScore) detected = 'category';
    else {
      // empate: decide por más opcionales presentes
      const prodOptionalHit = PRODUCT_OPTIONAL_KEYS.filter(k => norm.has(k.toLowerCase())).length;
      const catOptionalHit  = CATEGORY_OPTIONAL_KEYS.filter(k => norm.has(k.toLowerCase())).length;
      detected = prodOptionalHit >= catOptionalHit ? 'product' : 'category';
    }
  }

  const missingRequired = detected === 'product' ? reqProdMissing : detected === 'category' ? reqCatMissing : [];
  return {
    detected,                // 'product' | 'category' | 'unknown'
    missingRequired,         // columnas requeridas faltantes según lo detectado
    headersNormalized: [...norm],
  };
}

module.exports = {
  z,
  toNumber,
  toInt,
  toBool,
  mapEnum,
  urlRegex,
  ProductTypeEnum,
  StatusEnum,
  isUuid,
  buildProductRowSchema,
  buildCategoryRowSchema,
    PRODUCT_REQUIRED_KEYS,
  PRODUCT_OPTIONAL_KEYS,
  CATEGORY_REQUIRED_KEYS,
  CATEGORY_OPTIONAL_KEYS,
  detectSheetTypeByHeaders,
};
