// src/docs/optionGroup.docs.js
// Documentación OpenAPI para OptionGroups (tags, components y paths)
module.exports = {
  tags: [
    {
      name: 'OptionGroups',
      description: 'Gestión de grupos de opciones y sus valores',
    },
  ],

  components: {
    schemas: {
      OptionGroup: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'og_123' },
          name: { type: 'string', example: 'Scoop Flavors' },
          required: { type: 'boolean', example: true },
          minSelectable: { type: 'integer', example: 1 },
          maxSelectable: { type: 'integer', example: 3 },
          showImages: { type: 'boolean', example: true },
          selectionTitle: { type: 'string', nullable: true, example: 'Select your flavors' },
        },
      },

      OptionValue: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ov_123' },
          groupId: { type: 'string', example: 'og_123' },
          name: { type: 'string', example: 'Chocolate' },
          extraPrice: { type: 'number', example: 1.5 },
          imageUrl: { type: 'string', nullable: true, example: 'https://cdn/img/choco.jpg' },
          description: { type: 'string', example: 'Rich chocolate scoop' },
          isAvailable: { type: 'boolean', example: true },
          productRefId: { type: 'string', nullable: true, example: 'prod_abc' },
        },
      },

      OptionGroupCreateInput: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Requerido si no creas por categoría ni clonas' },
          required: { type: 'boolean' },
          showImages: {
            type: 'boolean',
            description: 'Si no se envía, por defecto toma el valor de required',
          },
          minSelectable: { type: 'integer' },
          maxSelectable: { type: 'integer' },
          selectionTitle: { type: 'string' },
          categoryId: {
            type: 'string',
            description:
              'Crea el grupo a partir de una categoría (opciones = productos disponibles isOptionItem)',
          },
          optionGroupIdToClone: {
            type: 'string',
            description: 'Clona un grupo existente (incluyendo sus OptionValues)',
          },
        },
        example: {
          name: 'Toppings',
          required: false,
          minSelectable: 0,
          maxSelectable: 5,
          showImages: true,
        },
      },

      OptionGroupUpdateInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          required: { type: 'boolean' },
          showImages: { type: 'boolean' },
          minSelectable: { type: 'integer' },
          maxSelectable: { type: 'integer' },
          selectionTitle: { type: 'string' },
        },
      },

      OptionValueCreateInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          extraPrice: {
            type: 'number',
            description: 'Debe ser número no negativo; default 0 si se omite',
          },
          imageUrl: { type: 'string' },
          description: { type: 'string' },
          productRefId: { type: 'string' },
        },
      },

      OptionValueUpdateInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          extraPrice: { type: 'number' },
          imageUrl: { type: 'string' },
          description: { type: 'string' },
          productRefId: { type: 'string' },
          isAvailable: { type: 'boolean' },
        },
      },

      OptionValueStatusPatch: {
        type: 'object',
        required: ['isAvailable'],
        properties: {
          isAvailable: { type: 'boolean' },
        },
      },

      BulkOptionValueStatusRequest: {
        type: 'object',
        required: ['valueIds', 'isAvailable'],
        properties: {
          valueIds: {
            type: 'array',
            items: { type: 'string' },
            example: ['ov_1', 'ov_2', 'ov_3'],
          },
          isAvailable: { type: 'boolean', example: false },
        },
      },

      BulkDeleteOptionValuesByNameRequest: {
        type: 'object',
        required: ['groupId', 'names'],
        properties: {
          groupId: { type: 'string', example: 'og_123' },
          names: {
            type: 'array',
            items: { type: 'string' },
            example: ['Chocolate', 'Vanilla'],
          },
        },
      },

      BulkCloneOptionValuesRequest: {
        type: 'object',
        required: ['sourceGroupId', 'targetGroupId'],
        properties: {
          sourceGroupId: { type: 'string' },
          targetGroupId: { type: 'string' },
          overwrite: {
            type: 'boolean',
            description: 'Si true, reemplaza coincidencias por nombre en destino',
            example: false,
          },
        },
      },

      BulkAddOptionValuesRequest: {
        type: 'object',
        required: ['values'],
        properties: {
          values: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                extraPrice: { type: 'number' },
                imageUrl: { type: 'string' },
                description: { type: 'string' },
                productRefId: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },

  paths: {
    '/api/option-group': {
      post: {
        tags: ['OptionGroups'],
        summary: 'Crea un OptionGroup',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OptionGroupCreateInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Creado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/OptionGroup' } },
            },
          },
          400: { description: 'Validación fallida (min/max o faltan datos)' },
        },
      },
      get: {
        tags: ['OptionGroups'],
        summary: 'Lista todos los OptionGroups',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/OptionGroup' } },
              },
            },
          },
        },
      },
    },

    '/api/option-groups/{groupId}/option-values/bulk-add': {
      post: {
        tags: ['OptionGroups'],
        summary: 'Agrega valores al grupo (bulk)',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BulkAddOptionValuesRequest' },
            },
          },
        },
        responses: { 200: { description: 'Valores agregados' } },
      },
    },

    '/api/option-group/all-opt': {
      get: {
        tags: ['OptionGroups'],
        summary:
          'Devuelve mezcla de OptionValues/Product-as-Option (según lógica interna)',
        description:
          'Endpoint utilitario. La forma del objeto puede variar acorde a la implementación.',
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/option-group/{groupId}': {
      get: {
        tags: ['OptionGroups'],
        summary: 'Obtiene un OptionGroup por ID',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'OK' }, 404: { description: 'No encontrado' } },
      },
      put: {
        tags: ['OptionGroups'],
        summary: 'Actualiza un OptionGroup',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OptionGroupUpdateInput' },
            },
          },
        },
        responses: { 200: { description: 'OK' }, 404: { description: 'No encontrado' } },
      },
      delete: {
        tags: ['OptionGroups'],
        summary: 'Elimina un OptionGroup',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
        ],
        responses: { 204: { description: 'Eliminado' }, 404: { description: 'No encontrado' } },
      },
    },

    '/api/option-values/{valueId}/status': {
      patch: {
        tags: ['OptionGroups'],
        summary: 'Cambia disponibilidad de un OptionValue',
        parameters: [
          { in: 'path', name: 'valueId', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OptionValueStatusPatch' },
            },
          },
        },
        responses: { 200: { description: 'OK' }, 404: { description: 'No encontrado' } },
      },
    },

    '/api/option-values/bulk-status': {
      post: {
        tags: ['OptionGroups'],
        summary: 'Cambia disponibilidad (bulk)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BulkOptionValueStatusRequest' },
            },
          },
        },
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/option-values/bulk-delete-by-name': {
      post: {
        tags: ['OptionGroups'],
        summary: 'Elimina OptionValues por nombre dentro de un grupo (bulk)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BulkDeleteOptionValuesByNameRequest' },
            },
          },
        },
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/option-values/bulk-clone': {
      post: {
        tags: ['OptionGroups'],
        summary: 'Clona valores desde un grupo fuente hacia grupo destino (bulk)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BulkCloneOptionValuesRequest' },
            },
          },
        },
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/option-group/{groupId}/values': {
      post: {
        tags: ['OptionGroups'],
        summary: 'Crea un OptionValue en el grupo',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OptionValueCreateInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Creado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/OptionValue' } },
            },
          },
          400: { description: 'Validación fallida' },
          404: { description: 'Grupo no encontrado' },
          409: { description: 'Duplicado por nombre dentro del grupo' },
        },
      },
      get: {
        tags: ['OptionGroups'],
        summary: 'Lista OptionValues de un grupo',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
          { in: 'query', name: 'onlyAvailable', schema: { type: 'boolean', example: true } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/OptionValue' } },
              },
            },
          },
        },
      },
    },

    '/api/option-group/{groupId}/values/{valueId}': {
      get: {
        tags: ['OptionGroups'],
        summary: 'Obtiene un OptionValue por ID',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
          { in: 'path', name: 'valueId', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/OptionValue' } },
            },
          },
          404: { description: 'No encontrado' },
        },
      },
      put: {
        tags: ['OptionGroups'],
        summary: 'Actualiza un OptionValue',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
          { in: 'path', name: 'valueId', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OptionValueUpdateInput' },
            },
          },
        },
        responses: { 200: { description: 'OK' }, 404: { description: 'No encontrado' } },
      },
      delete: {
        tags: ['OptionGroups'],
        summary: 'Elimina un OptionValue',
        parameters: [
          { in: 'path', name: 'groupId', required: true, schema: { type: 'string' } },
          { in: 'path', name: 'valueId', required: true, schema: { type: 'string' } },
        ],
        responses: { 204: { description: 'Eliminado' }, 404: { description: 'No encontrado' } },
      },
    },
  },
};
