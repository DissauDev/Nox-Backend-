// src/docs/products.docs.js
module.exports = {
  tags: [
    {
      name: 'Products',
      description:
        'Gestión de productos, opciones de producto y utilidades (sugerencias, estado, orden)',
    },
  ],

  components: {
    schemas: {
      ProductStatus: {
        type: 'string',
        enum: ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
        example: 'AVAILABLE',
      },

      ImageObject: {
        type: 'object',
        description:
          'Estructura de imagen persistida (resultado de generateImageData)',
        properties: {
          url: { type: 'string', example: 'https://cdn.nox/img/p123.jpg' },
          width: { type: 'integer', example: 1200 },
          height: { type: 'integer', example: 800 },
          blurHash: { type: 'string', example: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' },
          placeholder: { type: 'string', example: 'data:image/jpeg;base64,...' },
        },
      },

      OptionValueSummary: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ov_abc123' },
          name: { type: 'string', example: 'Chocolate' },
          extraPrice: { type: 'number', example: 1.5 },
          imageUrl: { type: 'string', nullable: true, example: 'https://cdn/img/opt-choco.jpg' },
          description: { type: 'string', nullable: true, example: 'Rich cocoa' },
          sortOrder: { type: 'integer', example: 1 },
        },
      },

      OptionGroupSummary: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'og_flavors' },
          name: { type: 'string', example: 'Scoop Flavors' },
          required: { type: 'boolean', example: true },
          minSelectable: { type: 'integer', example: 1 },
          maxSelectable: { type: 'integer', example: 3 },
          showImages: { type: 'boolean', example: true },
          selectionTitle: { type: 'string', nullable: true, example: 'Choose your flavors' },
          OptionValue: {
            type: 'array',
            items: { $ref: '#/components/schemas/OptionValueSummary' },
          },
        },
      },

      ProductOptionLink: {
        type: 'object',
        description: 'Relación ordenada de grupos de opciones asignados al producto',
        properties: {
          id: { type: 'string', example: 'po_1' },
          sortOrder: { type: 'integer', example: 1 },
          groupId: { type: 'string', example: 'og_flavors' },
          group: { $ref: '#/components/schemas/OptionGroupSummary' },
        },
      },

      ProductBase: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'prod_123' },
          name: { type: 'string', example: 'Cookie Ice Cream Sandwich' },
          description: {
            type: 'string',
            example: 'Two warm cookies with ice cream in the middle.',
          },
          price: { type: 'number', example: 8.5 },
          salePrice: { type: 'number', nullable: true, example: 7.5 },
          specifications: {
            type: 'string',
            nullable: true,
            example: 'Allergens: gluten, dairy',
          },
          type: { type: 'string', example: 'REGULAR' },
          status: { $ref: '#/components/schemas/ProductStatus' },
          isOptionItem: { type: 'boolean', example: false },
          packOptionSurcharge: { type: 'number', example: 0 },
          packMaxItems: { type: 'integer', nullable: true, example: null },
          sortOrder: { type: 'integer', example: 10 },
          imageLeft: { $ref: '#/components/schemas/ImageObject' },
          imageRight: { $ref: '#/components/schemas/ImageObject' },
          category: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'cat_cookies' },
              name: { type: 'string', example: 'Cookies' },
            },
          },
          options: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProductOptionLink' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },

      ProductCreateInput: {
        type: 'object',
        required: ['name', 'price', 'category', 'imageLeftUrl'],
        properties: {
          name: { type: 'string', example: 'Cookie Ice Cream Sandwich' },
          description: {
            type: 'string',
            example: 'Two warm cookies with ice cream in the middle.',
          },
          price: { type: 'number', example: 8.5 },
          salePrice: { type: 'number', nullable: true, example: 7.5 },
          specifications: { type: 'string', example: 'Allergens: gluten, dairy' },
          /**
           * Acepta:
           * - string JSON de array
           * - string[] de groupIds
           * - { groupId, sortOrder? }[]
           */
          options: {
            oneOf: [
              {
                type: 'array',
                description: 'Lista de groupIds',
                items: { type: 'string' },
                example: ['og_flavors', 'og_toppings'],
              },
              {
                type: 'array',
                description: 'Lista detallada con orden',
                items: {
                  type: 'object',
                  properties: {
                    groupId: { type: 'string' },
                    sortOrder: { type: 'integer', description: '>= 1' },
                  },
                  required: ['groupId'],
                },
                example: [
                  { groupId: 'og_flavors', sortOrder: 1 },
                  { groupId: 'og_toppings', sortOrder: 2 },
                ],
              },
              {
                type: 'string',
                description: 'JSON válido de cualquiera de los formatos anteriores',
                example: '["og_flavors","og_toppings"]',
              },
            ],
          },
          category: {
            type: 'string',
            description: 'Nombre de categoría existente (unicidad por nombre)',
            example: 'Cookies',
          },
          imageLeftUrl: { type: 'string', example: 'https://cdn/img/p1-left.jpg' },
          imageRightUrl: { type: 'string', nullable: true, example: 'https://cdn/img/p1-right.jpg' },
          type: { type: 'string', example: 'REGULAR' },
          status: { $ref: '#/components/schemas/ProductStatus' },
          isOptionItem: { type: 'boolean', example: false },
          packOptionSurcharge: { type: 'number', example: 0 },
          packMaxItems: { type: 'integer', nullable: true, example: null },
          sortOrder: {
            type: 'integer',
            description:
              'Orden dentro de su categoría. Si se omite/0, se coloca al final automáticamente.',
            example: 0,
          },
        },
      },

      ProductUpdateInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          salePrice: { type: 'number', nullable: true },
          specifications: { type: 'string' },
          category: {
            type: 'string',
            description: 'Nombre de categoría existente',
          },
          imageLeftUrl: { type: 'string' },
          imageRightUrl: { type: 'string', nullable: true },
          type: { type: 'string' },
          status: { $ref: '#/components/schemas/ProductStatus' },
          isOptionItem: { type: 'boolean' },
          packOptionSurcharge: { type: 'number' },
          packMaxItems: { type: 'integer', nullable: true },
          sortOrder: { type: 'integer' },
          options: { $ref: '#/components/schemas/ProductCreateInput/properties/options' },
        },
        example: {
          description: 'Updated description...',
          status: 'AVAILABLE',
          salePrice: 7.0,
        },
      },

      ProductStatusPatch: {
        type: 'object',
        required: ['status'],
        properties: { status: { $ref: '#/components/schemas/ProductStatus' } },
      },

      ProductSortOrderPatch: {
        type: 'object',
        required: ['sortOrder'],
        properties: {
          sortOrder: {
            type: 'integer',
            minimum: 0,
            example: 5,
            description: 'Orden dentro de su categoría',
          },
        },
      },

      ProductOptionsSetInput: {
        type: 'array',
        description:
          'Sobrescribe el set de grupos de opciones y su orden para el producto',
        items: {
          type: 'object',
          required: ['groupId'],
          properties: {
            groupId: { type: 'string' },
            sortOrder: { type: 'integer', description: '>= 1', example: 1 },
          },
        },
        example: [
          { groupId: 'og_flavors', sortOrder: 1 },
          { groupId: 'og_toppings', sortOrder: 2 },
        ],
      },

      ProductListItem: {
        allOf: [{ $ref: '#/components/schemas/ProductBase' }],
      },

      ProductListResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProductListItem' },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: { type: 'integer', example: 240 },
              page: { type: 'integer', example: 1 },
              perPage: { type: 'integer', example: 20 },
              totalPages: { type: 'integer', example: 12 },
            },
          },
        },
      },

      ProductSuggestionsResponse: {
        type: 'object',
        properties: {
          productId: { type: 'string', example: 'prod_123' },
          suggestions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'prod_456' },
                name: { type: 'string', example: 'Brownie Box' },
                price: { type: 'number', example: 12.5 },
                image: { type: 'string', nullable: true, example: 'https://cdn/brownie.jpg' },
              },
            },
          },
        },
      },
    },
  },

  paths: {
    '/api/products': {
      post: {
        tags: ['Products'],
        summary: 'Crea un producto',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ProductCreateInput' } },
          },
        },
        responses: {
          201: {
            description: 'Creado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ProductBase' } },
            },
          },
          400: { description: 'Validación fallida / categoría inválida / nombre duplicado' },
          500: { description: 'Internal server error' },
        },
      },

      get: {
        tags: ['Products'],
        summary: 'Lista productos (paginado y filtros comunes)',
        parameters: [
          {
            in: 'query',
            name: 'search',
            schema: { type: 'string' },
            description: 'Búsqueda por nombre (case-insensitive)',
          },
          {
            in: 'query',
            name: 'status',
            schema: { $ref: '#/components/schemas/ProductStatus' },
          },
          {
            in: 'query',
            name: 'categoryId',
            schema: { type: 'string' },
          },
          {
            in: 'query',
            name: 'isOptionItem',
            schema: { type: 'boolean' },
          },
          {
            in: 'query',
            name: 'page',
            schema: { type: 'integer', default: 1 },
          },
          {
            in: 'query',
            name: 'perPage',
            schema: { type: 'integer', default: 20 },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ProductListResponse' } },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Obtiene un producto por ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductBase' } } },
          },
          404: { description: 'No encontrado' },
        },
      },

      put: {
        tags: ['Products'],
        summary: 'Actualiza un producto por ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ProductUpdateInput' } },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductBase' } } },
          },
          400: { description: 'Validación fallida' },
          404: { description: 'No encontrado' },
          500: { description: 'Internal server error' },
        },
      },

      delete: {
        tags: ['Products'],
        summary: 'Elimina un producto',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Eliminado' },
          404: { description: 'No encontrado' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/products/{id}/status': {
      patch: {
        tags: ['Products'],
        summary: 'Actualiza el estado de un producto',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ProductStatusPatch' } },
          },
        },
        responses: {
          200: { description: 'OK' },
          404: { description: 'No encontrado' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/products/{id}/sort-order': {
      patch: {
        tags: ['Products'],
        summary: 'Actualiza el sortOrder del producto dentro de su categoría',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ProductSortOrderPatch' } },
          },
        },
        responses: {
          200: { description: 'OK' },
          404: { description: 'No encontrado' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/products/{id}/options': {
      post: {
        tags: ['Products'],
        summary: 'Define/sobrescribe los grupos de opciones de un producto (y su orden)',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ProductOptionsSetInput' } },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ProductBase' } },
            },
          },
          404: { description: 'Producto o grupo(s) no encontrado(s)' },
          500: { description: 'Internal server error' },
        },
      },

      get: {
        tags: ['Products'],
        summary: 'Obtiene los grupos de opciones vinculados a un producto (ordenados)',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ProductOptionLink' },
                },
              },
            },
          },
          404: { description: 'Producto no encontrado' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/products/{id}/suggestions': {
      get: {
        tags: ['Products'],
        summary: 'Sugerencias de productos relacionados',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductSuggestionsResponse' },
              },
            },
          },
          404: { description: 'Producto no encontrado' },
        },
      },
    },
  },
};
