// src/docs/swagger.js
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const { loadAllDocs } = require('./load-all');
const { mergeDeep } = require('./merge');

// 1) Base
const openapiDefinition = {
  openapi: '3.0.3',
  info: { title: 'API – Nox / Backend', version: '1.0.0' },
  servers: [{ url: process.env.API_BASE_URL || 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        required: ['code', 'message'],
        properties: {
          code: { type: 'string', example: 'VALIDATION_ERROR' },
          message: { type: 'string', example: 'Email is required' },
          details: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

// 2) Swagger-JSDoc para comentarios @openapi en rutas/controladores
const swaggerOptions = {
  definition: openapiDefinition,
  apis: [
    path.resolve(process.cwd(), 'src/routes/**/*.js'),
    path.resolve(process.cwd(), 'src/controllers/**/*.js'),
  ],
};
const routesSpec = swaggerJSDoc(swaggerOptions);

// 3) Cargar y fusionar TODOS los *.docs.js del directorio
const modules = loadAllDocs(__dirname);
const extras = modules.reduce((acc, mod) => {
  if (!mod) return acc;
  if (mod.tags) acc = mergeDeep(acc, { tags: mod.tags });
  if (mod.components) acc = mergeDeep(acc, { components: mod.components });
  if (mod.paths) acc = mergeDeep(acc, { paths: mod.paths });
  return acc;
}, {});

// 4) Resultado final
const swaggerSpec = mergeDeep(routesSpec, extras);
module.exports = { swaggerSpec };
