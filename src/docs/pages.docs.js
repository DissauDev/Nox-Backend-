// src/docs/pages.docs.js
module.exports = {
  tags: [
    {
      name: 'Pages',
      description: 'Gestión de páginas (CMS ligero): listar, consultar por slug, crear, actualizar y eliminar',
    },
  ],

  components: {
    schemas: {
      PageSort:
        { type: 'string', enum: ['newest', 'oldest'], example: 'newest' },

      PageMeta: {
        type: 'object',
        properties: {
          totalItems: { type: 'integer', example: 128 },
          currentPage: { type: 'integer', example: 1 },
          perPage: { type: 'integer', example: 10 },
          totalPages: { type: 'integer', example: 13 },
        },
      },

      PageSummary: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'pg_01HZYQK6W6ZQ9ZP8Z6W0Q3' },
          title: { type: 'string', example: 'Home' },
          slug: { type: 'string', example: 'home' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-11-01T12:20:11.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-11-11T18:02:45.000Z' },
        },
      },

      Page: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'pg_01HZYQK6W6ZQ9ZP8Z6W0Q3' },
          title: { type: 'string', example: 'Home' },
          slug: { type: 'string', example: 'home' },
          layout: {
            description: 'Estructura/JSON de la página (libre según frontend)',
            example: {
              hero: { title: 'Welcome to Nox', subtitle: 'Fresh baked daily', image: '/cdn/hero.jpg' },
              sections: [
                { type: 'grid', items: [{ title: 'Cookies' }, { title: 'Ice Cream' }] },
              ],
            },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },

      PageCreateInput: {
        type: 'object',
        required: ['title', 'slug', 'layout'],
        properties: {
          title: { type: 'string', example: 'About' },
          slug: { type: 'string', example: 'about' },
          layout: {
            description: 'JSON de contenido/estructura',
            example: { blocks: [{ type: 'richtext', html: '<p>About us…</p>' }] },
          },
        },
      },

      PageUpdateInput: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          layout: {
            description: 'JSON de contenido/estructura',
          },
        },
        example: {
          title: 'About Nox',
          layout: { blocks: [{ type: 'richtext', html: '<p>Updated content…</p>' }] },
        },
      },

      PageListResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/PageSummary' },
          },
          meta: { $ref: '#/components/schemas/PageMeta' },
        },
      },
    },
  },

  paths: {
    '/api/pages': {
      get: {
        tags: ['Pages'],
        summary: 'Lista paginada de páginas',
        parameters: [
          {
            in: 'query',
            name: 'search',
            schema: { type: 'string' },
            description: 'Búsqueda por título o slug (case-insensitive)',
            example: 'home',
          },
          {
            in: 'query',
            name: 'sort',
            schema: { $ref: '#/components/schemas/PageSort' },
            description: 'Orden por fecha de creación',
          },
          {
            in: 'query',
            name: 'page',
            schema: { type: 'integer', minimum: 1 },
            example: 1,
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', minimum: 1, maximum: 100 },
            example: 10,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/PageListResponse' } },
            },
          },
          500: { description: 'Internal Server Error' },
        },
      },

      post: {
        tags: ['Pages'],
        summary: 'Crea una nueva página',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/PageCreateInput' } },
          },
        },
        responses: {
          200: { // tu controlador responde con res.json(page); (200)
            description: 'Creada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Page' } } },
          },
          500: { description: 'Internal Server Error' },
        },
      },
    },

    '/api/pages/{slug}': {
      get: {
        tags: ['Pages'],
        summary: 'Obtiene una página por slug',
        parameters: [
          { in: 'path', name: 'slug', required: true, schema: { type: 'string' }, example: 'home' },
        ],
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Page' } } },
          },
          404: { description: 'No encontrada' },
          500: { description: 'Internal Server Error' },
        },
      },
    },

    '/api/pages/{id}': {
      put: {
        tags: ['Pages'],
        summary: 'Actualiza una página por ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/PageUpdateInput' } },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Page' } } },
          },
          404: { description: 'No encontrada' },
          500: { description: 'Internal Server Error' },
        },
      },

      delete: {
        tags: ['Pages'],
        summary: 'Elimina una página por ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          204: { description: 'Eliminada' },
          404: { description: 'No encontrada' },
          500: { description: 'Internal Server Error' },
        },
      },
    },
  },
};
