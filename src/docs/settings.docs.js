// src/docs/settings.docs.js
module.exports = {
  tags: [
    {
      name: 'Settings',
      description: 'Configuración global de la tienda (impuestos/tasas)',
    },
  ],

  components: {
    schemas: {
      StoreConfig: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1, description: 'Siempre 1 (registro único)' },
          taxEnabled: { type: 'boolean', example: true },
          taxPercent: { type: 'number', example: 2.9, description: 'Porcentaje (0–100)' },
          taxFixed: { type: 'number', example: 0.3, description: 'Monto fijo por transacción' },
          taxLabel: { type: 'string', example: 'Card fees' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },

      StoreConfigCreateInput: {
        type: 'object',
        required: ['taxEnabled', 'taxPercent', 'taxFixed', 'taxLabel'],
        properties: {
          taxEnabled: { type: 'boolean', example: true },
          taxPercent: { type: 'number', example: 2.9 },
          taxFixed: { type: 'number', example: 0.3 },
          taxLabel: { type: 'string', example: 'Card fees' },
        },
      },

      StoreConfigUpdateInput: {
        type: 'object',
        properties: {
          taxEnabled: { type: 'boolean' },
          taxPercent: { type: 'number' },
          taxFixed: { type: 'number' },
          taxLabel: { type: 'string' },
        },
        example: { taxEnabled: true, taxPercent: 3.1, taxLabel: 'Processing fee' },
      },
    },
  },

  paths: {
    '/api/settings/tax': {
      get: {
        tags: ['Settings'],
        summary: 'Obtiene la configuración de impuestos/tasas (registro único)',
        responses: {
          200: {
            description: 'Configuración encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StoreConfig' },
              },
            },
          },
          404: { description: 'Config not found' },
          500: { description: 'Server error' },
        },
      },

      post: {
        tags: ['Settings'],
        summary: 'Crea la configuración (solo una vez)',
        description:
          'Crea el registro único. Si ya existe, devuelve 409 (constraint Prisma P2002 sobre id).',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/StoreConfigCreateInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StoreConfig' },
              },
            },
          },
          400: { description: 'Faltan campos requeridos' },
          409: { description: 'Config already exists' },
          500: { description: 'Server error' },
        },
      },

      put: {
        tags: ['Settings'],
        summary: 'Actualiza la configuración (upsert)',
        description:
          'Hace **upsert** sobre `id = 1`. Si no existe, lo crea; si existe, lo actualiza.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/StoreConfigUpdateInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'Actualizado/Creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StoreConfig' },
              },
            },
          },
          500: { description: 'Server error' },
        },
      },
    },
  },
};
