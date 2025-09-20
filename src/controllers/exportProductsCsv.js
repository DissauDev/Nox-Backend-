// controllers/exportCsv.js
const { prisma } = require('../lib/prisma');

/** ===== Headers ===== **/
const PRODUCT_HEADERS = [
  'name',
  'description',
  'price',
  'sellPrice',
  'specifications',
  'options_json',
  'category',
  'imageLeftUrl',
  'imageRightUrl',
  'type',
  'status',
  'isOptionItem',
  'packOptionSurcharge',
  'packMaxItems',
];

const CATEGORY_HEADERS = [
  'name',
  'status',
  'onCarousel',
  'imageUrl',
  'shortDescription',
  'longDescription',
  'sortOrder',
  'createdAt',
];

/** ===== Helpers ===== **/
function safeJson(s) { try { return JSON.parse(s); } catch { return undefined; } }

function toDelimited(rows, { delimiter = ';', withBom = true } = {}) {
  const esc = (val) => {
    if (val == null) return '';
    const s = String(val);
    // Escapar comillas si usamos separador con comas/punto y coma
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const text = rows.map(r => r.map(esc).join(delimiter)).join('\n');
  return withBom ? '\uFEFF' + text : text; // BOM ayuda con Excel/Sheets
}

/** ===== Row mappers ===== **/
function productToRow(p) {
  const left  = typeof p.imageLeft  === 'string' ? safeJson(p.imageLeft)  : p.imageLeft;
  const right = typeof p.imageRight === 'string' ? safeJson(p.imageRight) : p.imageRight;

  const imageLeftUrl  = left?.url ?? '';
  const imageRightUrl = right?.url ?? '';
  const optionsJson   = JSON.stringify((p.options || []).map(o => o.groupId));

  return [
    p.name ?? '',
    p.description ?? '',
    Number(p.price ?? 0),
    p.sellPrice == null ? '' : Number(p.sellPrice),
    p.specifications ?? '',
    optionsJson,
    p.category?.name ?? '',
    imageLeftUrl,
    imageRightUrl,
    p.type ?? 'REGULAR',
    p.status ?? 'AVAILABLE',
    Boolean(p.isOptionItem),
    Number(p.packOptionSurcharge ?? 0),
    p.packMaxItems == null ? '' : Number(p.packMaxItems),
  ];
}

function categoryToRow(c) {
  return [
    c.name ?? '',
    c.status ?? 'AVAILABLE',
    Boolean(c.onCarousel),
    c.imageUrl ?? '',
    c.shortDescription ?? '',
    c.longDescription ?? '',
    Number(c.sortOrder ?? 0),
    c.createdAt?.toISOString?.() ?? '',
  ];
}

/** ===== Query builders ===== **/
async function buildProductRows({ status, categoryId, isOptionItem }) {
  const where = {};
  if (status && status !== 'ALL') where.status = status;
  if (categoryId) where.categoryId = String(categoryId);
  if (typeof isOptionItem === 'boolean') where.isOptionItem = !!isOptionItem;

  const products = await prisma.product.findMany({
    where,
    include: {
      category: { select: { id: true, name: true } },
      options:  { select: { groupId: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  return [PRODUCT_HEADERS, ...products.map(productToRow)];
}

async function buildCategoryRows({ status }) {
  const where = {};
  if (status && status !== 'ALL') where.status = status;

  const categories = await prisma.category.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  return [CATEGORY_HEADERS, ...categories.map(categoryToRow)];
}

/** ===== Single POST endpoint ===== **/
async function exportCsvPost(req, res) {
  try {
    const {
      entity = 'Product',                // "Product" | "Category"
      status = 'ALL',                    // "ALL" | "AVAILABLE" | "DISABLED" | "OUT_OF_STOCK"
      categoryId,                        // sólo Product
      isOptionItem,                      // sólo Product
      sep = ';',                         // ',' o ';'
    } = req.body || {};

    const delimiter = sep === ',' ? ',' : ';';
    const stamp = new Date().toISOString().slice(0, 10);

    let rows;
    if (entity === 'Category') {
      rows = await buildCategoryRows({ status });
    } else {
      rows = await buildProductRows({ status, categoryId, isOptionItem });
    }

    const text = toDelimited(rows, { delimiter });
    const baseName = entity.toLowerCase() + 's_export_' + stamp;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${baseName}.csv"`);
    return res.status(200).send(text);
  } catch (err) {
    console.error('exportCsvPost error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

module.exports = { exportCsvPost };
