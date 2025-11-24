// Convierte un modelo de Prisma (desde Prisma.dmmf) a un schema OpenAPI sencillo.
// JS + CommonJS. No requiere TypeScript ni zod.

const { Prisma } = require('@prisma/client');

// Mapea tipos escalares de Prisma a OpenAPI
function scalarToOpenAPI(field) {
  const base = (() => {
    switch (field.type) {
      case 'String':   return { type: 'string' };
      case 'Int':      return { type: 'integer' };
      case 'Float':    return { type: 'number', format: 'float' };
      case 'Decimal':  return { type: 'string' }; // representar como string
      case 'BigInt':   return { type: 'string', format: 'bigint' };
      case 'Boolean':  return { type: 'boolean' };
      case 'DateTime': return { type: 'string', format: 'date-time' };
      case 'Bytes':    return { type: 'string', format: 'byte' };
      case 'Json':     return { oneOf: [{ type: 'object' }, { type: 'array' }] };
      default:         return { type: 'string' };
    }
  })();

  return field.isList ? { type: 'array', items: base } : base;
}

// Convierte un campo enum de Prisma a OpenAPI enum
function enumToOpenAPI(field) {
  const en = Prisma.dmmf.datamodel.enums.find(e => e.name === field.type);
  const values = en ? en.values.map(v => v.name) : [];
  const schema = { type: 'string', enum: values };
  return field.isList ? { type: 'array', items: schema } : schema;
}

// Para relaciones: representamos como ID (string) o lista de IDs (string[])
function relationToOpenAPI(field) {
  const idSchema = { type: 'string' };
  return field.isList ? { type: 'array', items: idSchema } : idSchema;
}

// Construye el schema OpenAPI para un modelo (por nombre)
function buildModelSchema(modelName, { omit = [], pick = null } = {}) {
  const model = Prisma.dmmf.datamodel.models.find(m => m.name === modelName);
  if (!model) {
    throw new Error(`Modelo Prisma no encontrado: ${modelName}`);
  }

  const properties = {};
  for (const field of model.fields) {
    if (omit.includes(field.name)) continue;
    if (pick && !pick.includes(field.name)) continue;

    let propSchema;
    if (field.kind === 'scalar') {
      propSchema = scalarToOpenAPI(field);
    } else if (field.kind === 'enum') {
      propSchema = enumToOpenAPI(field);
    } else if (field.kind === 'object') {
      // relación: lo documentamos como referencia por ID (string/array de string)
      propSchema = relationToOpenAPI(field);
    } else {
      propSchema = { type: 'string' };
    }

    properties[field.name] = propSchema;
  }

  // Required: solo campos escalares no nulos, no listas, sin default y no omitidos
  const required = model.fields
    .filter(f =>
      f.kind === 'scalar' &&
      !f.isNullable &&
      !f.isList &&
      !f.hasDefaultValue &&
      !omit.includes(f.name) &&
      (!pick || pick.includes(f.name))
    )
    .map(f => f.name);

  return {
    type: 'object',
    required: required.length ? required : undefined,
    properties,
  };
}

module.exports = { buildModelSchema };
