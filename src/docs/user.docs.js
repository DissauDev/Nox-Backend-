// src/docs/user.docs.js
module.exports = {
  tags: [
    {
      name: 'Users',
      description: 'Gestión de usuarios (auth, staff, clientes)',
    },
  ],

  components: {
    schemas: {
      // Puedes ajustar este "User" al shape que devuelves realmente en tus responses
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', example: 'usr_123' },
          email: { type: 'string', format: 'email', example: 'demo@nox.com' },
          name: { type: 'string', example: 'Jane Doe' },
          role: { type: 'string', example: 'ADMIN' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          subscribeEmails: { type: 'boolean', example: false },
        },
      },

      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'demo@nox.com' },
          password: { type: 'string', example: '******' },
        },
      },

      LoginResponse: {
        type: 'object',
        properties: {
          accessToken: { type: 'string', example: 'eyJhbGciOi...' },
          refreshToken: { type: 'string', example: 'eyJhbGciOi...' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
    },
  },

  paths: {
    '/api/user/create': {
      post: {
        tags: ['Users'],
        summary: 'Crea un usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        responses: {
          201: {
            description: 'Creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: {
            description: 'Error de validación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/user/login': {
      post: {
        tags: ['Users'],
        summary: 'Inicia sesión',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' },
              },
            },
          },
          401: {
            description: 'Credenciales inválidas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/user/logout': {
      post: {
        tags: ['Users'],
        summary: 'Cierra sesión (invalida refresh token)',
        responses: { 204: { description: 'Sin contenido' } },
      },
    },

    '/api/user/reset-password': {
      post: {
        tags: ['Users'],
        summary: 'Resetea la contraseña con token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['token', 'newPassword'],
                properties: {
                  token: { type: 'string' },
                  newPassword: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'OK' },
          400: {
            description: 'Token inválido o expirado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/user/forgot-password': {
      post: {
        tags: ['Users'],
        summary: 'Envía email con link de reseteo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Email enviado (si existe)' } },
      },
    },

    '/api/user/refresh-token': {
      post: {
        tags: ['Users'],
        summary: 'Refresca el access token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: { refreshToken: { type: 'string' } },
              },
            },
          },
        },
        responses: {
          200: { description: 'OK' },
          401: { description: 'Refresh token inválido' },
        },
      },
    },

    '/api/user/all': {
      get: {
        tags: ['Users'],
        summary: 'Lista todos los usuarios',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
      },
    },

    '/api/user/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Obtiene un usuario por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          404: { description: 'No encontrado' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Actualiza un usuario',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        responses: { 200: { description: 'OK' } },
      },
      delete: {
        tags: ['Users'],
        summary: 'Elimina un usuario',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: { 204: { description: 'Eliminado' } },
      },
    },

    '/api/user-customers': {
      get: {
        tags: ['Users'],
        summary: 'Lista clientes asociados a usuarios',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/user-stats': {
      get: {
        tags: ['Users'],
        summary: 'KPIs/estadísticas de usuarios',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/users/staff': {
      get: {
        tags: ['Users'],
        summary: 'Lista usuarios del staff',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'OK' } },
      },
    },

    '/api/user/password/{id}': {
      put: {
        tags: ['Users'],
        summary: 'Cambia la contraseña de un usuario (admin)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['password'],
                properties: { password: { type: 'string' } },
              },
            },
          },
        },
        responses: { 204: { description: 'Actualizado sin contenido' } },
      },
    },
  },
};
