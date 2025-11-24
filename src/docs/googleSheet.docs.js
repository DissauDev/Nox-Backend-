// Documentación OpenAPI para GoogleSheet (tags, components y paths)
module.exports = {
  tags: [
    {
      name: 'GoogleSheet',
      description: 'Importación desde Google Sheets (CSV) y exportación a CSV',
    },
  ],

  components: {
    schemas: {
      ImportGoogleSheetRequest: {
        type: 'object',
        required: ['csvUrl'],
        properties: {
          csvUrl: {
            type: 'string',
            description:
              'URL pública del CSV (ej. "Exportar como CSV" de Google Sheets)',
            example:
              'https://docs.google.com/spreadsheets/d/xxx/export?format=csv',
          },
          dryRun: {
            type: 'boolean',
            description: 'Si es true, valida/parsea pero NO persiste cambios',
            example: true,
          },
          type: {
            type: 'string',
            description: 'Tipo de entidad esperada en el CSV',
            enum: ['Product', 'Category'],
            default: 'Product',
          },
        },
      },

      ImportErrorItem: {
        type: 'object',
        properties: {
          row: { type: 'integer', example: 3 },
          type: {
            type: 'string',
            description:
              'Tipo de error (missing_required, validation, type, business)',
            example: 'validation',
          },
          message: {
            type: 'string',
            example: 'Field "price" must be greater than zero.',
          },
          issues: {
            description: 'Detalle del error de validación (si aplica)',
            example: { fieldErrors: { price: ['Expected number, received string'] } },
          },
        },
      },

      ImportSkippedItem: {
        type: 'object',
        properties: {
          row: { type: 'integer', example: 8 },
          reason: { type: 'string', example: 'Duplicated product name' },
        },
      },

      ImportGoogleSheetResponse: {
        type: 'object',
        properties: {
          ok: { type: 'boolean', example: true },
          type: { type: 'string', example: 'Product' },
          total: { type: 'integer', example: 25 },
          success: { type: 'integer', example: 22 },
          failed: { type: 'integer', example: 3 },
          skipped: { type: 'integer', example: 1 },
          skippedRows: {
            type: 'array',
            items: { $ref: '#/components/schemas/ImportSkippedItem' },
          },
          errors: {
            type: 'array',
            items: { $ref: '#/components/schemas/ImportErrorItem' },
          },
          dryRun: { type: 'boolean', example: true },
        },
      },

      ExportCsvRequest: {
        type: 'object',
        properties: {
          entity: {
            type: 'string',
            description: 'Entidad a exportar',
            enum: ['Product', 'Category'],
            default: 'Product',
          },
          status: {
            type: 'string',
            description: 'Filtro de estado',
            enum: ['ALL', 'AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'],
            default: 'ALL',
          },
          categoryId: {
            type: 'string',
            description: 'Filtra por categoría (solo Products)',
            example: 'cat_123',
          },
          isOptionItem: {
            type: 'boolean',
            description: 'Filtra por flag isOptionItem (solo Products)',
            example: false,
          },
          sep: {
            type: 'string',
            description: 'Separador de columnas',
            enum: [',', ';'],
            default: ';',
          },
        },
      },
    },
  },

  paths: {
    '/api/googleSheet/import': {
      post: {
        tags: ['GoogleSheet'],
        summary: 'Importa datos desde un CSV (Google Sheets) a la base de datos',
        description:
          'Recibe una URL de CSV (p.ej., exportada desde Google Sheets). Detecta **Products** o **Categories** por headers. Con `dryRun=true` simula sin persistir.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ImportGoogleSheetRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Resultado del proceso de importación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ImportGoogleSheetResponse' },
              },
            },
          },
          400: {
            description:
              'CSV inválido, URL inaccesible o columnas no coinciden con el tipo esperado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean', example: false },
                    error: {
                      type: 'string',
                      example:
                        'It looks like you uploaded a CATEGORIES file in the PRODUCTS section.',
                    },
                  },
                },
              },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/googleSheet/export.csv': {
      post: {
        tags: ['GoogleSheet'],
        summary: 'Exporta Products o Categories a un archivo CSV',
        description:
          'Genera y devuelve un **CSV** (con BOM). Para Products, puedes filtrar por `status`, `categoryId`, `isOptionItem`. Usa `sep` para `,` o `;`.',
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ExportCsvRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'CSV generado correctamente',
            content: { 'text/csv': { schema: { type: 'string' } } },
          },
          500: { description: 'Internal server error' },
        },
      },
    },
  },
};
