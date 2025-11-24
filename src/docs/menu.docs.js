// src/docs/menu.docs.js
module.exports = {
  tags: [
    {
      name: 'Menu',
      description:
        'Menú público agrupado por categorías y productos disponibles',
    },
  ],

  components: {
    schemas: {
      MenuOptionGroup: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'grp_abc123' },
          name: { type: 'string', example: 'Scoop Flavors' },
          required: { type: 'boolean', example: true },
          minSelectable: { type: 'integer', example: 2 },
          maxSelectable: { type: 'integer', example: 3 },
        },
      },

      MenuItem: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'prod_123' },
          imageLeft: {
            description:
              'Objeto JSON con al menos { url, blurHash } (si aplica)',
            example: {
              url: 'https://cdn.example.com/img/p1.jpg',
              blurHash: 'LPI}x^...',
            },
          },
          imageRight: {
            nullable: true,
            description: 'Igual estructura que imageLeft si existe',
            example: {
              url: 'https://cdn.example.com/img/p1b.jpg',
              blurHash: 'LMO0e~...',
            },
          },
          name: { type: 'string', example: 'Cookie Ice Cream Sandwich' },
          description: {
            type: 'string',
            example: 'Two warm cookies with ice cream in the middle.',
          },
          price: { type: 'number', example: 8.5 },
          salePrice: { nullable: true, type: 'number', example: 7.5 },
          status: {
            type: 'string',
            description: 'Estado del producto',
            enum: ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
            example: 'AVAILABLE',
          },
          category: { type: 'string', example: 'Cookies' },
          options: {
            type: 'array',
            items: { $ref: '#/components/schemas/MenuOptionGroup' },
          },
          hasRequiredOptions: { type: 'boolean', example: true },
        },
      },

      MenuCategory: {
        type: 'object',
        properties: {
          category: { type: 'string', example: 'Cookies' },
          shortDescription: {
            type: 'string',
            example: 'Crunchy and chewy favorites',
          },
          longDescription: {
            type: 'string',
            example:
              'Our cookie collection features classic and seasonal flavors...',
          },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/MenuItem' },
          },
        },
      },
    },
  },

  paths: {
    '/api/menu': {
      get: {
        tags: ['Menu'],
        summary: 'Obtiene el menú público agrupado por categoría',
        description:
          'Retorna las **categorías AVAILABLE** (ordenadas por `sortOrder` y `name`) con sus **productos AVAILABLE** (ordenados por `category.sortOrder`, `sortOrder`, `name`). Cada producto incluye sus grupos de opciones (resumen) y `hasRequiredOptions`.',
        responses: {
          200: {
            description: 'Lista de categorías con sus items',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/MenuCategory' },
                },
              },
            },
          },
          500: { description: 'Error al obtener el menú' },
        },
      },
    },
  },
};
