// src/controllers/importGoogleSheet.js
const { parse } = require('csv-parse/sync');
const { prisma } = require('../lib/prisma');

const {
  validateProductRow,
  processProductRow,
} = require('../utils/googleSheet/productImport.util');

const {
  validateCategoryRow,
  processCategoryRow,
} = require('../utils/googleSheet/categoryImport.util');

const {
  detectSheetTypeByHeaders,
  PRODUCT_REQUIRED_KEYS,
  CATEGORY_REQUIRED_KEYS,
} = require('../utils/googleSheet/importCommon');



// Empty/undefined/null guard (after CSV parse)
const isEmpty = (v) =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// Enforce required fields are present and not empty
function assertRequiredFields(type, rowIndex, rowObj, requiredKeys, errors) {
  const missing = [];
  for (const k of requiredKeys) {
    if (!(k in rowObj) || isEmpty(rowObj[k])) {
      missing.push(k);
    }
  }
  if (missing.length) {
    errors.push({
      row: rowIndex + 2, // +1 header, +1 1-based
      type: 'missing_required',
      message: `Missing required field(s): ${missing.join(', ')}`,
    });
    return false;
  }
  return true;
}

// Additional business rules for products only
function assertProductBusinessRules(rowIndex, parsedData, errors) {
  // price must be > 0
  if (typeof parsedData.price !== 'number' || !Number.isFinite(parsedData.price)) {
    errors.push({
      row: rowIndex + 2,
      type: 'type',
      message: `Field "price" must be a valid number.`,
    });
    return false;
  }
  if (parsedData.price <= 0) {
    errors.push({
      row: rowIndex + 2,
      type: 'business',
      message: `Field "price" must be greater than zero.`,
    });
    return false;
  }

  // salePrice if present: must be number > 0 and <= price
  if (parsedData.salePrice !== undefined) {
    if (typeof parsedData.salePrice !== 'number' || !Number.isFinite(parsedData.salePrice)) {
      errors.push({
        row: rowIndex + 2,
        type: 'type',
        message: `Field "salePrice" must be a valid number when provided.`,
      });
      return false;
    }
    if (parsedData.salePrice <= 0) {
      errors.push({
        row: rowIndex + 2,
        type: 'business',
        message: `Field "salePrice" must be greater than zero when provided.`,
      });
      return false;
    }
    if (parsedData.salePrice > parsedData.price) {
      errors.push({
        row: rowIndex + 2,
        type: 'business',
        message: `Field "salePrice" cannot be greater than "price".`,
      });
      return false;
    }
  }

  // string-typed fields (post-CSV they should be strings; we also accept empty optional strings)
  const stringFields = ['name', 'category'];
  for (const f of stringFields) {
    if (parsedData[f] !== undefined && parsedData[f] !== null && typeof parsedData[f] !== 'string') {
      errors.push({
        row: rowIndex + 2,
        type: 'type',
        message: `Field "${f}" must be a string.`,
      });
      return false;
    }
  }

  return true;
}

// For categories: required strings + types
function assertCategoryTypeRules(rowIndex, parsedData, errors) {
  // name, imageUrl must be strings
  const mustBeString = ['name', 'imageUrl'];
  for (const f of mustBeString) {
    if (parsedData[f] === undefined || parsedData[f] === null || typeof parsedData[f] !== 'string' || parsedData[f].trim() === '') {
      errors.push({
        row: rowIndex + 2,
        type: 'type',
        message: `Field "${f}" must be a non-empty string.`,
      });
      return false;
    }
  }
  // sortOrder if present must be int (product util already coerces; this is an extra guard)
  if (parsedData.sortOrder !== undefined && parsedData.sortOrder !== null) {
    if (typeof parsedData.sortOrder !== 'number' || !Number.isInteger(parsedData.sortOrder)) {
      errors.push({
        row: rowIndex + 2,
        type: 'type',
        message: `Field "sortOrder" must be an integer when provided.`,
      });
      return false;
    }
  }
  return true;
}

/** ---------------------- Controller ---------------------- **/

async function importGoogleSheet(req, res) {
  try {
    const { csvUrl, dryRun, type = 'Product' } = req.body || {};
    if (!csvUrl) {
      return res.status(400).json({ ok: false, error: 'csvUrl is required.' });
    }

    // 1) Fetch CSV
    const resp = await fetch(csvUrl);
    if (!resp.ok) {
      return res.status(400).json({ ok: false, error: `Unable to fetch CSV (${resp.status}).` });
    }
    const csvText = await resp.text();

    // 2) Parse CSV
    const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });
    if (!rows.length) {
      return res.status(400).json({
        ok: false,
        error: 'The CSV file is empty.',
        hint: 'Export from Google Sheets as CSV with the first row containing headers.',
      });
    }

    // 2.1) Detect sheet type by headers
    const headers = Object.keys(rows[0] || {});
    const detection = detectSheetTypeByHeaders(headers);
    const isCategoryRequest = String(type).toLowerCase() === 'category';

    // Mismatched upload → clear message
    if (detection.detected === 'product' && isCategoryRequest) {
      return res.status(400).json({
        ok: false,
        error: 'It looks like you uploaded a PRODUCTS file in the CATEGORIES section.',
        expectedType: 'Category',
        detectedType: 'Product',
        missingColumnsInExpected: CATEGORY_REQUIRED_KEYS.filter(k =>
          !headers.map(h => h.toLowerCase()).includes(k.toLowerCase())
        ),
        hint: `For CATEGORIES, please include at least: ${CATEGORY_REQUIRED_KEYS.join(', ')}.`,
        sampleHeaders: headers,
      });
    }
    if (detection.detected === 'category' && !isCategoryRequest) {
      return res.status(400).json({
        ok: false,
        error: 'It looks like you uploaded a CATEGORIES file in the PRODUCTS section.',
        expectedType: 'Product',
        detectedType: 'Category',
        missingColumnsInExpected: PRODUCT_REQUIRED_KEYS.filter(k =>
          !headers.map(h => h.toLowerCase()).includes(k.toLowerCase())
        ),
        hint: `For PRODUCTS, please include at least: ${PRODUCT_REQUIRED_KEYS.join(', ')}.`,
        sampleHeaders: headers,
      });
    }
    if (detection.detected === 'unknown') {
      return res.status(400).json({
        ok: false,
        error: 'We could not identify the file type from its columns.',
        expectedType: isCategoryRequest ? 'Category' : 'Product',
        hint: isCategoryRequest
          ? `For CATEGORIES, include at least: ${CATEGORY_REQUIRED_KEYS.join(', ')}.`
          : `For PRODUCTS, include at least: ${PRODUCT_REQUIRED_KEYS.join(', ')}.`,
        sampleHeaders: headers,
      });
    }

    // 3) Process rows
    const errors = [];
    const skipped = [];
    let success = 0;

    for (let i = 0; i < rows.length; i++) {
      const raw = rows[i];

      if (isCategoryRequest) {
        // Hard guard: required fields not undefined/empty
        const requiredOk = assertRequiredFields('Category', i, raw, CATEGORY_REQUIRED_KEYS, errors);
        if (!requiredOk) continue;

        // Zod validation
        const parsed = validateCategoryRow(raw);
        if (!parsed.success) {
          errors.push({ row: i + 2, type: 'validation', issues: parsed.error.flatten() });
          continue;
        }

        // Type/content rules (post-parse)
        if (!assertCategoryTypeRules(i, parsed.data, errors)) continue;

        const ok = await processCategoryRow(parsed.data, i, { dryRun, errors, skipped });
        if (ok) success++;
      } else {
        // Hard guard: required fields not undefined/empty
        const requiredOk = assertRequiredFields('Product', i, raw, PRODUCT_REQUIRED_KEYS, errors);
        if (!requiredOk) continue;

        // Zod validation
        const parsed = validateProductRow(raw);
        if (!parsed.success) {
          errors.push({ row: i + 2, type: 'validation', issues: parsed.error.flatten() });
          continue;
        }

        // Product business rules and types
        if (!assertProductBusinessRules(i, parsed.data, errors)) continue;

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
