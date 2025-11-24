// src/docs/category.docs.js
module.exports = {
  tags: [
    {
      name: 'Categories',
      description: 'Gestión de categorías y reportes relacionados',
    },
  ],

  components: {
    schemas: {
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'cat_123' },
          name: { type: 'string', example: 'Cookies' },
          imageUrl: {
            type: 'string',
            example: 'https://cdn.nox/img/cookies.jpg',
          },
          shortDescription: {
            type: 'string',
            example: 'Crunchy and chewy favorites',
          },
          longDescription: {
            type: 'string',
            example:
              'Our cookie collection features classic and seasonal flavors...',
          },
          status: {
            type: 'string',
            enum: ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
            example: 'AVAILABLE',
          },
          onCarousel: { type: 'boolean', example: true },
          sortOrder: { type: 'integer', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },

      CategoryCreateInput: {
        type: 'object',
        required: ['name', 'imageUrl', 'shortDescription', 'longDescription'],
        properties: {
          name: { type: 'string', example: 'Cookies' },
          imageUrl: {
            type: 'string',
            example: 'https://cdn.nox/img/cookies.jpg',
          },
          shortDescription: {
            type: 'string',
            example: 'Crunchy and chewy favorites',
          },
          longDescription: {
            type: 'string',
            example:
              'Our cookie collection features classic and seasonal flavors...',
          },
          status: {
            type: 'string',
            enum: ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
            description: 'Por defecto AVAILABLE',
          },
          onCarousel: { type: 'boolean', example: true },
          sortOrder: { type: 'integer', example: 1 },
        },
      },

      CategoryUpdateInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          imageUrl: { type: 'string' },
          shortDescription: { type: 'string' },
          longDescription: { type: 'string' },
          status: {
            type: 'string',
            enum: ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
          },
          onCarousel: { type: 'boolean' },
          sortOrder: { type: 'integer' },
        },
      },

      CategoryStatusUpdate: {
        type: 'object',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            enum: ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
            example: 'AVAILABLE',
          },
        },
      },

      CategorySortOrderUpdate: {
        type: 'object',
        required: ['sortOrder'],
        properties: {
          sortOrder: { type: 'integer', example: 3 },
        },
      },
    },
  },

  paths: {
    '/api/categories': {
      post: {
        tags: ['Categories'],
        summary: 'Crea una categoría',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CategoryCreateInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Creada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          400: { description: 'Error de validación' },
        },
      },
      get: {
        tags: ['Categories'],
        summary: 'Lista todas las categorías',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Category' },
                },
              },
            },
          },
        },
      },
    },

    '/api/categories/available': {
      get: {
        tags: ['Categories'],
        summary: 'Lista categorías disponibles (status AVAILABLE)',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Category' },
                },
              },
            },
          },
        },
      },
    },

    '/api/categories-with-sales': {
      get: {
        tags: ['Categories'],
        summary: 'Lista categorías con métricas de ventas',
        description:
          'Devuelve categorías con campos agregados de ventas (dependiendo de la lógica del controlador).',
        responses: {
          200: { description: 'OK' },
          500: { description: 'Error interno del servidor' },
        },
      },
    },

    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Obtiene una categoría por ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          404: { description: 'No encontrada' },
        },
      },
      put: {
        tags: ['Categories'],
        summary: 'Actualiza una categoría',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CategoryUpdateInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          404: { description: 'No encontrada' },
        },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Elimina una categoría',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          204: { description: 'Eliminada' },
          404: { description: 'No encontrada' },
        },
      },
    },

    '/api/categories/{id}/status': {
      patch: {
        tags: ['Categories'],
        summary: 'Actualiza el estado de una categoría',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CategoryStatusUpdate' },
            },
          },
        },
        responses: {
          200: { description: 'OK' },
          404: { description: 'No encontrada' },
        },
      },
    },

    '/api/categories/{id}/sort-order': {
      patch: {
        tags: ['Categories'],
        summary: 'Actualiza el orden de una categoría',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CategorySortOrderUpdate' },
            },
          },
        },
        responses: {
          200: { description: 'OK' },
          404: { description: 'No encontrada' },
        },
      },
    },

    '/api/categories-available-carousel': {
      get: {
        tags: ['Categories'],
        summary: 'Categorías disponibles para carrusel',
        description: 'Retorna categorías con `onCarousel = true` y visibles.',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Category' },
                },
              },
            },
          },
        },
      },
    },
  },
};
