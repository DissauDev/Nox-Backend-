// src/docs/orders.docs.js
module.exports = {
  tags: [
    {
      name: 'Orders',
      description:
        'Creación, listado, actualización, reembolsos y estados de órdenes',
    },
  ],

  components: {
    schemas: {
      OrderStatus: {
        type: 'string',
        enum: ['PENDING', 'PAID', 'COMPLETED', 'CANCELED', 'REFUNDED'],
        example: 'PAID',
      },

      OrderItemInput: {
        type: 'object',
        required: ['productId', 'quantity', 'price'],
        properties: {
          productId: { type: 'string', example: 'prod_abc123' },
          quantity: { type: 'integer', example: 2, minimum: 1 },
          price: { type: 'number', example: 8.5, minimum: 0 },
          options: {
            description:
              'JSON con opciones elegidas (se guarda en chosenOptions)',
            example: [{ groupId: 'grp_1', values: ['Chocolate', 'Vanilla'] }],
          },
        },
      },

      OrderItem: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'oi_123' },
          orderId: { type: 'string', example: 'ord_123' },
          productId: { type: 'string', example: 'prod_abc123' },
          quantity: { type: 'integer', example: 2 },
          price: { type: 'number', example: 8.5 },
          chosenOptions: {
            description: 'JSON con opciones seleccionadas',
            example: [{ groupId: 'grp_1', values: ['Chocolate', 'Vanilla'] }],
          },
        },
      },

      Order: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ord_123' },
          orderNumber: { type: 'string', example: 'NOX-2025-000231' },
          status: { $ref: '#/components/schemas/OrderStatus' },
          subtotal: { type: 'number', example: 25.5 },
          totalAmount: { type: 'number', example: 27.52 },
          paymentMethod: { type: 'string', example: 'Stripe' },
          stripePaymentIntentId: { type: 'string', example: 'pi_3N7...' },

          customerName: { type: 'string', example: 'David' },
          customerLastname: { type: 'string', example: 'Good' },
          customerEmail: {
            type: 'string',
            format: 'email',
            example: 'david@example.com',
          },
          customerPhone: { type: 'string', example: '+1 408 555 1234' },

          customerAddress: { type: 'string', example: '422 E Campbell Ave' },
          apartment: { type: 'string', nullable: true, example: 'Apt 4B' },
          company: { type: 'string', nullable: true, example: 'Nox LLC' },
          billingCity: { type: 'string', example: 'Campbell' },
          billingState: { type: 'string', example: 'CA' },
          zipcode: { type: 'string', example: '95008' },

          specifications: {
            type: 'string',
            example: 'No nuts, birthday note: “Happy B-Day!”',
          },

          userId: {
            type: 'string',
            nullable: true,
            example: 'usr_789',
            description: 'Puede ser null si es guest checkout',
          },

          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItem' },
          },

          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-11-12T14:33:20.000Z',
          },
        },
      },

      CreateOrderRequest: {
        type: 'object',
        required: [
          'items',
          'amount',
          'customerEmail',
          'paymentMethodId',
          'customerPhone',
          'customerAddress',
          'subtotal',
          'customerName',
          'lastName',
          'billingCity',
          'billingState',
          'zipcode',
        ],
        properties: {
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItemInput' },
          },
          amount: { type: 'number', example: 27.52 },
          subtotal: { type: 'number', example: 25.5 },
          customerEmail: {
            type: 'string',
            format: 'email',
            example: 'david@example.com',
          },
          userId: {
            type: 'string',
            nullable: true,
            description: 'Opcional: asocia la orden a un usuario existente',
          },
          billingState: { type: 'string', example: 'CA' },
          billingCity: { type: 'string', example: 'Campbell' },
          paymentMethodId: { type: 'string', example: 'pm_1Q2...' },
          customerPhone: { type: 'string', example: '+1 408 555 1234' },
          customerAddress: { type: 'string', example: '422 E Campbell Ave' },
          lastName: { type: 'string', example: 'Good' },
          customerName: { type: 'string', example: 'David' },
          specifications: {
            type: 'string',
            example: 'Sin maní. Entregar 6-7pm',
          },
          apartment: { type: 'string', nullable: true, example: 'Apt 4B' },
          company: { type: 'string', nullable: true, example: 'Nox LLC' },
          zipcode: { type: 'string', example: '95008' },
        },
      },

      UpdateOrderRequest: {
        type: 'object',
        description:
          'Campos actualizables de la orden (según tu controlador). No incluye el cambio de estado (usar endpoint /status).',
        properties: {
          customerName: { type: 'string' },
          customerLastname: { type: 'string' },
          customerEmail: { type: 'string', format: 'email' },
          customerPhone: { type: 'string' },
          customerAddress: { type: 'string' },
          apartment: { type: 'string', nullable: true },
          company: { type: 'string', nullable: true },
          billingCity: { type: 'string' },
          billingState: { type: 'string' },
          zipcode: { type: 'string' },
          specifications: { type: 'string' },
          subtotal: { type: 'number' },
          totalAmount: { type: 'number' },
          // items: podrías definir un sub-esquema si soportas edición de items
        },
      },

      OrderStatusUpdate: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { $ref: '#/components/schemas/OrderStatus' },
        },
      },

      OrdersListResponse: {
        type: 'object',
        properties: {
          orders: {
            type: 'array',
            items: { $ref: '#/components/schemas/Order' },
          },
          totalPage: { type: 'integer', example: 132 },
          page: { type: 'integer', example: 1 },
          perPage: { type: 'integer', example: 20 },
        },
      },
    },
  },

  paths: {
    // POST /orders
    '/api/orders': {
      post: {
        tags: ['Orders'],
        summary: 'Crea una orden (confirma PaymentIntent en Stripe y persiste)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateOrderRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Orden creada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' },
              },
            },
          },
          400: { description: 'Required data is missing / Validación' },
          500: { description: 'Internal server error' },
        },
      },

      // GET /orders
      get: {
        tags: ['Orders'],
        summary: 'Lista paginada de órdenes con filtros',
        parameters: [
          {
            in: 'query',
            name: 'status',
            schema: { $ref: '#/components/schemas/OrderStatus' },
            description: 'Estado (usa "all" para no filtrar)',
          },
          {
            in: 'query',
            name: 'customerType',
            schema: { type: 'string', enum: ['registered', 'unregistered'] },
            description:
              'registered = con userId; unregistered = userId null; omitido = ambos',
          },
          {
            in: 'query',
            name: 'dateFilter',
            schema: {
              type: 'string',
              enum: ['today', 'this_week', 'this_month', 'all'],
            },
            description: 'Rango rápido por fecha de creación',
          },
          {
            in: 'query',
            name: 'orderNumber',
            schema: { type: 'string' },
            description:
              'Búsqueda parcial, case-insensitive, sobre orderNumber (contains)',
          },
          {
            in: 'query',
            name: 'origin',
            schema: { type: 'string', enum: ['pickup', 'delivery'] },
            description:
              'Filtra por dirección de pickup (coincidente) o delivery (distinta)',
          },
          { in: 'query', name: 'page', schema: { type: 'integer' }, example: 1 },
          {
            in: 'query',
            name: 'perPage',
            schema: { type: 'integer' },
            example: 20,
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrdersListResponse' },
              },
            },
          },
          500: { description: 'Internal server error' },
        },
      },
    },

    // GET /orders/user/:email
    '/api/orders/user/{email}': {
      get: {
        tags: ['Orders'],
        summary: 'Lista órdenes por email de cliente',
        parameters: [
          {
            in: 'path',
            name: 'email',
            required: true,
            schema: { type: 'string', format: 'email' },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Order' },
                },
              },
            },
          },
          404: { description: 'No encontrado (según implementación)' },
        },
      },
    },

    // GET/PUT/DELETE /orders/:id
    '/api/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Obtiene una orden por ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' },
              },
            },
          },
          404: { description: 'No encontrada' },
        },
      },
      put: {
        tags: ['Orders'],
        summary: 'Actualiza los datos de una orden',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateOrderRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' },
              },
            },
          },
          404: { description: 'No encontrada' },
        },
      },
      delete: {
        tags: ['Orders'],
        summary: 'Elimina una orden',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          204: { description: 'Eliminada' },
          404: { description: 'No encontrada' },
        },
      },
    },

    // PATCH /orders/:id/status
    '/api/orders/{id}/status': {
      patch: {
        tags: ['Orders'],
        summary: 'Actualiza el estado de la orden',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderStatusUpdate' },
            },
          },
        },
        responses: {
          200: { description: 'OK' },
          404: { description: 'No encontrada' },
        },
      },
    },

    // POST /orders/:id/refund
    '/api/orders/{id}/refund': {
      post: {
        tags: ['Orders'],
        summary:
          'Solicita reembolso de la orden (Stripe) y actualiza registro según tu lógica',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Reembolso procesado' },
          400: { description: 'No reembolsable / Validación' },
          404: { description: 'No encontrada' },
          500: { description: 'Internal server error' },
        },
      },
    },
  },
};
