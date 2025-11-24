// src/docs/merge.js
function mergeArraysUniqueBy(arrA = [], arrB = [], key = 'name') {
  const map = new Map();
  for (const item of arrA) map.set(item?.[key], item);
  for (const item of arrB) map.set(item?.[key], item);
  return Array.from(map.values()).filter(Boolean);
}

function mergeDeep(target = {}, source = {}) {
  const out = { ...target };

  for (const k of Object.keys(source)) {
    const sv = source[k];
    const tv = out[k];

    if (k === 'tags' && Array.isArray(sv)) {
      out[k] = mergeArraysUniqueBy(Array.isArray(tv) ? tv : [], sv, 'name');
      continue;
    }

    // components.schemas deep-merge específico
    if (
      k === 'components' &&
      sv &&
      typeof sv === 'object' &&
      !Array.isArray(sv)
    ) {
      out.components = out.components || {};
      out.components.schemas = {
        ...(out.components.schemas || {}),
        ...(sv.schemas || {}),
      };
      // otros subárboles de components (ej. securitySchemes) también:
      if (sv.securitySchemes) {
        out.components.securitySchemes = {
          ...(out.components.securitySchemes || {}),
          ...sv.securitySchemes,
        };
      }
      // copiar cualquier otro campo de components
      for (const sub of Object.keys(sv)) {
        if (sub === 'schemas' || sub === 'securitySchemes') continue;
        const prev = out.components[sub];
        const cur = sv[sub];
        if (prev && typeof prev === 'object' && !Array.isArray(prev) &&
            cur && typeof cur === 'object' && !Array.isArray(cur)) {
          out.components[sub] = mergeDeep(prev, cur);
        } else {
          out.components[sub] = cur;
        }
      }
      continue;
    }

    // paths: merge por clave
    if (k === 'paths' && sv && typeof sv === 'object' && !Array.isArray(sv)) {
      out.paths = { ...(out.paths || {}), ...sv };
      continue;
    }

    if (sv && typeof sv === 'object' && !Array.isArray(sv)) {
      out[k] = mergeDeep(tv || {}, sv);
    } else {
      out[k] = sv;
    }
  }

  return out;
}

module.exports = { mergeDeep };
