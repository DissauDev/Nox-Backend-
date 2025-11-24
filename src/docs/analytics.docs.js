// src/docs/analytics.docs.js
module.exports = {
  tags: [
    {
      name: 'Analytics',
      description: 'Estadísticas y métricas de ventas, productos y rendimiento',
    },
  ],

  components: {
    schemas: {
      AnalyticsPeriod: {
        type: 'string',
        enum: ['Day', 'Week', 'Month', '6 Months', 'Year', 'All'],
        example: 'Month',
      },

      PerformanceResponse: {
        type: 'object',
        properties: {
          totalSales: {
            type: 'object',
            properties: {
              current: { type: 'number', example: 12850.55 },
              previous: { type: 'number', example: 10210.1 },
              pctChange: { type: 'number', example: 25.94 },
            },
          },
          orders: {
            type: 'object',
            properties: {
              current: { type: 'integer', example: 340 },
              previous: { type: 'integer', example: 300 },
              pctChange: { type: 'number', example: 13.33 },
            },
          },
          productsSold: {
            type: 'object',
            properties: {
              current: { type: 'integer', example: 950 },
              previous: { type: 'integer', example: 870 },
              pctChange: { type: 'number', example: 9.2 },
            },
          },
          variationsSold: {
            type: 'object',
            properties: {
              current: { type: 'integer', example: 420 },
              previous: { type: 'integer', example: 350 },
              pctChange: { type: 'number', example: 20 },
            },
          },
          trends: {
            type: 'object',
            properties: {
              sales: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    time: { type: 'string', example: '2025-11-01' },
                    current: { type: 'number', example: 450.75 },
                    previous: { type: 'number', example: 320.4 },
                  },
                },
              },
              orders: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    time: { type: 'string', example: '2025-11-01' },
                    current: { type: 'integer', example: 20 },
                    previous: { type: 'integer', example: 15 },
                  },
                },
              },
            },
          },
        },
      },

      DashboardOverviewResponse: {
        type: 'object',
        properties: {
          customers: { type: 'integer', example: 42 },
          orders: { type: 'integer', example: 120 },
          earnings: { type: 'number', example: 3450.75 },
          productsSold: { type: 'integer', example: 560 },
          customersPctChange: { type: 'number', example: 12.5 },
          ordersPctChange: { type: 'number', example: 8.2 },
          earningsPctChange: { type: 'number', example: 15.1 },
          productsPctChange: { type: 'number', example: 7 },
        },
      },

      ProductAnalyticsItem: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'prod_123' },
          name: { type: 'string', example: 'Brownie Box' },
          image: {
            type: 'string',
            nullable: true,
            example: 'https://cdn…/brownie.png',
          },
          category: { type: 'string', example: 'Cookies' },
          price: { type: 'number', example: 12.5 },
          totalSold: { type: 'integer', example: 120 },
          revenue: { type: 'number', example: 1500.75 },
        },
      },

      ProductAnalyticsResponse: {
        type: 'object',
        properties: {
          sort: {
            type: 'string',
            enum: [
              'lowestSales',
              'highestSales',
              'lowestEarnings',
              'highestEarnings',
            ],
            example: 'highestSales',
          },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProductAnalyticsItem' },
          },
        },
      },

      SalesTrendPoint: {
        type: 'object',
        properties: {
          time: { type: 'string', example: '2025-11-10T14:00Z' },
          sales: { type: 'number', example: 120.5 },
        },
      },

      SalesTrendResponse: {
        type: 'object',
        properties: {
          period: { $ref: '#/components/schemas/AnalyticsPeriod' },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/SalesTrendPoint' },
          },
        },
      },

      CategorySalesResponse: {
        type: 'object',
        properties: {
          period: { $ref: '#/components/schemas/AnalyticsPeriod' },
          totalAll: { type: 'number', example: 9876.54 },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'cat_123' },
                name: { type: 'string', example: 'Cookies' },
                sales: { type: 'number', example: 3456.78 },
                itemsSold: { type: 'integer', example: 210 },
                percentage: { type: 'number', example: 35.01 },
              },
            },
          },
        },
      },
    },
  },

  paths: {
    '/api/analytics/performance': {
      get: {
        tags: ['Analytics'],
        summary: 'KPIs comparativos y series (actual vs anterior)',
        description:
          'Requiere parámetros en ISO 8601. Rangos: [start, end) y [compareStart, compareEnd).',
        parameters: [
          {
            in: 'query',
            name: 'start',
            required: true,
            description: 'Fecha inicio rango actual (ISO 8601)',
            schema: { type: 'string', format: 'date-time' },
          },
          {
            in: 'query',
            name: 'end',
            required: true,
            description: 'Fecha fin EXCLUSIVA rango actual (ISO 8601)',
            schema: { type: 'string', format: 'date-time' },
          },
          {
            in: 'query',
            name: 'compareStart',
            required: true,
            description: 'Fecha inicio rango comparativo (ISO 8601)',
            schema: { type: 'string', format: 'date-time' },
          },
          {
            in: 'query',
            name: 'compareEnd',
            required: true,
            description: 'Fecha fin EXCLUSIVA rango comparativo (ISO 8601)',
            schema: { type: 'string', format: 'date-time' },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PerformanceResponse' },
              },
            },
          },
          400: { description: 'Missing/Invalid date range parameters' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/analytics/categories-sales': {
      get: {
        tags: ['Analytics'],
        summary: 'Ventas por categoría (incluye categorías sin ventas)',
        description:
          'Periodos permitidos: Day, Week, Month, 6 Months, Year, All.',
        parameters: [
          {
            in: 'query',
            name: 'period',
            required: false,
            schema: { $ref: '#/components/schemas/AnalyticsPeriod' },
            description: 'Periodo a consultar (por defecto: Day)',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CategorySalesResponse' },
              },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/analytics/overview': {
      get: {
        tags: ['Analytics'],
        summary: 'Resumen del dashboard',
        description:
          'Periodos permitidos: Day, Week, Month, 6 Months, Year, All.',
        parameters: [
          {
            in: 'query',
            name: 'period',
            required: false,
            schema: { $ref: '#/components/schemas/AnalyticsPeriod' },
            description: 'Periodo a consultar (por defecto: Day)',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DashboardOverviewResponse',
                },
              },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/analytics/products': {
      get: {
        tags: ['Analytics'],
        summary: 'Analítica por producto (ventas/unidades/ingresos)',
        parameters: [
          {
            in: 'query',
            name: 'sort',
            required: false,
            schema: {
              type: 'string',
              enum: [
                'lowestSales',
                'highestSales',
                'lowestEarnings',
                'highestEarnings',
              ],
            },
            description: 'Criterio de ordenación (default: highestEarnings)',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProductAnalyticsResponse',
                },
              },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/api/analytics/sales-trend': {
      get: {
        tags: ['Analytics'],
        summary: 'Tendencia de ventas (bucket dinámico por periodo)',
        description:
          'Periodos permitidos: Day, Week, Month, 6 Months, Year, All.',
        parameters: [
          {
            in: 'query',
            name: 'period',
            required: false,
            schema: { $ref: '#/components/schemas/AnalyticsPeriod' },
            description: 'Periodo del gráfico (por defecto: Day)',
          },
        ],
        responses: {
          200: {
            description: 'Serie temporal de ventas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SalesTrendResponse' },
              },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },
  },
};
