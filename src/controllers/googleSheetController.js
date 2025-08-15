import { PrismaClient } from '@prisma/client';
import {parse} from 'csv-parse/sync';
import { z } from 'zod';
import { generateImageData } from '../middlewares/generateImageData.js';

const prisma = new PrismaClient();





/** Utils */
const toNumber = (v) => Number(String(v ?? '').replace(',', '.'));
const toInt = (v) => parseInt(String(v ?? ''), 10);
const toBool = (v) => /^(1|true|sí|si|yes|y)$/i.test(String(v ?? '').trim());

const ProductTypeEnum = ['REGULAR', 'SEASONAL'] ;
const ProductStatusEnum = ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'];

const mapEnum = (val, allowed, def) => {
  const s = String(val ?? '').trim().toUpperCase();
  return (allowed).includes(s) ? (s) : def;
};

const urlRegex = /^https?:\/\/.+/i;

/** Esquema de validación por fila (valores crudos del CSV) */
const RowSchema = z.object({
  name: z.string().min(1, 'name requerido').transform(s => s.trim()),
  description: z.string().optional(),
  price: z.any().transform(toNumber).pipe(z.number().finite().nonnegative()),
  sellPrice: z.any().optional().transform(v => {
    if (v == null || String(v).trim() === '') return undefined;
    return toNumber(v);
  }).pipe(z.number().finite().nonnegative().optional()),
  specifications: z.string().optional(),
  options_json: z.string().optional(), // JSON array de groupIds
  category: z.string().min(1, 'category requerida').transform(s => s.trim()),
  imageLeftUrl: z.string().min(1, 'imageLeftUrl requerida').refine(v => urlRegex.test(v), 'imageLeftUrl inválida'),
  imageRightUrl: z.string().optional().refine(v => !v || urlRegex.test(v), 'imageRightUrl inválida'),
  type: z.string().optional(),
  status: z.string().optional(),
  isOptionItem: z.any().optional().transform(toBool).default(false),
  packOptionSurcharge: z.any().optional().transform(v => {
    if (v == null || String(v).trim() === '') return 0;
    return toNumber(v);
  }).pipe(z.number().finite().min(0)),
  packMaxItems: z.any().optional().transform(v => {
    if (v == null || String(v).trim() === '') return undefined;
    return toInt(v);
  }).pipe(z.number().int().positive().optional()),
});



/**
 * POST /api/imports/google-csv
 * body: { csvUrl: string, dryRun?: boolean }
 */
export async function importGoogleSheet(req, res) {
  try {
    const { csvUrl, dryRun } = req.body ;
  

    if (!csvUrl) {
      return res.status(400).json({ ok: false, error: 'csvUrl requerido' });
    }

    // 1) Descargar CSV
    const resp = await fetch(csvUrl);
  
    if (!resp.ok) {
      return res.status(400).json({ ok: false, error: `No se pudo leer CSV (${resp.status})` });
    }
    const csvText = await resp.text();

console.log('chars:', csvText.length);
console.log('lines:', csvText.split(/\r?\n/).length);
console.log('first 200:', JSON.stringify(csvText.slice(0, 200)));
    // 2) Parsear CSV a objetos por columnas
    const rows = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    

    const errors  = [];
    const skipped = [];
    let success = 0;
    const records = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });
console.log('rows:', records.length);
console.log('keys:', Object.keys(records[0] || {}));

    // 3) Procesar fila a fila
    for (let i = 0; i < rows.length; i++) {
      const raw = rows[i];

      // 3.1) Validar y normalizar
      const parsed = RowSchema.safeParse(raw);
      if (!parsed.success) {
        errors.push({ row: i + 2, type: 'validation', issues: parsed.error.flatten() });
        continue;
      }
      const r = parsed.data;

      // 3.2) Mapear enums (case-insensitive), defaults a REGULAR/AVAILABLE
      const typeMapped = mapEnum(r.type, ProductTypeEnum, 'REGULAR');
      const statusMapped = mapEnum(r.status, ProductStatusEnum, 'AVAILABLE');

      // 3.3) Regla de negocio opcional: sellPrice no mayor que price (si quieres)
      if (r.sellPrice != null && r.sellPrice > r.price) {
        errors.push({ row: i + 2, type: 'business', message: 'sellPrice no puede ser mayor que price' });
        continue;
      }

      // 3.4) Unicidad por name: si existe, saltar
      const duplicate = await prisma.product.findUnique({ where: { name: r.name } });
      if (duplicate) {
        skipped.push({ row: i + 2, reason: 'duplicate_name', name: r.name });
        continue;
      }

    const isUuid = (s) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(s || ''));

const rawCat = String(r.category ?? '').trim();
if (!rawCat) {
  errors.push({ row: i + 2, type: 'foreign_key', message: 'Missing category' });
  continue;
}


let cat = null;

if (isUuid(rawCat)) {
  cat = await prisma.category.findUnique({ where: { id: rawCat } });
  if (!cat) cat = await prisma.category.findUnique({ where: { name: rawCat } });
} else {
  cat = await prisma.category.findUnique({ where: { name: rawCat } });
  // opcional: si no está y parece UUID “disfrazado”, intenta por id:
  if (!cat && isUuid(rawCat)) {
    cat = await prisma.category.findUnique({ where: { id: rawCat } });
  }
}

if (!cat) {
  errors.push({ row: i + 2, type: 'foreign_key', message: `Category not found: ${rawCat}` });
  continue;
}



      // 3.6) Procesar imágenes
      const imageLeft = await generateImageData(r.imageLeftUrl);
      if (!imageLeft) {
        errors.push({ row: i + 2, type: 'image', message: 'Error procesando imageLeftUrl' });
        continue;
      }
      let imageRight = undefined;
      if (r.imageRightUrl) {
        const right = await generateImageData(r.imageRightUrl);
        if (!right) {
          errors.push({ row: i + 2, type: 'image', message: 'Error procesando imageRightUrl' });
          continue;
        }
        imageRight = right;
      }

      // 3.7) Parsear options_json (array de groupIds) y validar existencia
      let optionGroupIds = [];
      if (r.options_json && r.options_json.trim() !== '') {
        try {
          const tmp = JSON.parse(r.options_json);
          if (!Array.isArray(tmp)) throw new Error('options_json debe ser un array de strings');
          optionGroupIds = [...new Set(tmp.map(String).map(s => s.trim()).filter(Boolean))];
        } catch (e) {
          
          errors.push({ row: i + 2, type: 'options_json', message: e.message || 'options_json inválido' });
          continue;
        }

        // Verificar que existan todos los grupos
        if (optionGroupIds.length > 0) {
          const groups = await prisma.optionGroup.findMany({
            where: { id: { in: optionGroupIds } },
            select: { id: true },
          });
          const found = new Set(groups.map(g => g.id));
          const missing = optionGroupIds.filter(id => !found.has(id));
          if (missing.length) {
            errors.push({ row: i + 2, type: 'options_json', message: `OptionGroup inexistente: ${missing.join(', ')}` });
            continue;
          }
        }
      }

      // 3.8) Construir payload para Product
      const data = {
        name: r.name,
        price: r.price,
        sellPrice: r.sellPrice ?? undefined,
        specifications: r.specifications || undefined,
        description: r.description || undefined,
        imageLeft,
        imageRight,
        type: typeMapped,            // ProductType
        status: statusMapped,        // ProductStatus
        category: { connect: { id: cat.id } },
        isOptionItem: r.isOptionItem || false,
        packOptionSurcharge: r.packOptionSurcharge ?? 0,
        packMaxItems: r.packMaxItems ?? undefined,
      };

      if (dryRun) {
        // Solo validar; no crear
        success++; // cuenta como válido
        continue;
      }

      // 3.9) Transacción por fila (producto + sus ProductOption)
      try {
        await prisma.$transaction(async (tx) => {
          const product = await tx.product.create({ data });

          if (optionGroupIds.length > 0) {
            await tx.productOption.createMany({
              data: optionGroupIds.map((groupId) => ({
                productId: product.id,
                groupId,
              })),
              skipDuplicates: true,
            });
          }
        });
        success++;
      } catch (e) {
        errors.push({ row: i + 2, type: 'db', message: e.message || 'Error to insert' });
        continue;
      }
    }

    return res.json({
      ok: true,
      total: rows.length,
      success,
      failed: errors.length,
      skipped: skipped.length,
      skippedRows: skipped, // [{row, reason, name}]
      errors,               // [{row, type, ...}]
      dryRun: !!dryRun,
    });
  } catch (e) {
    console.error('Import error:', e);
    return res.status(500).json({ ok: false, error: e.message || 'Internal server error' });
  }
};

