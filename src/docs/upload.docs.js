// src/docs/upload.docs.js
module.exports = {
  tags: [
    {
      name: 'Uploads',
      description: 'Carga, lectura, actualización y eliminación de imágenes',
    },
  ],

  components: {
    schemas: {
      UploadSingleResponse: {
        type: 'object',
        properties: {
          filename: { type: 'string', example: '1699553000000.png' },
          url: { type: 'string', example: '/uploads/1699553000000.png' },
        },
      },
      UploadDetailResponse: {
        type: 'object',
        properties: {
          filename: { type: 'string', example: '1699553000000.png' },
          size: { type: 'integer', example: 34012 },
          mimetype: { type: 'string', example: 'image/png' },
        },
      },
      UploadReplaceResponse: {
        type: 'object',
        properties: {
          oldFilename: { type: 'string', example: 'old.png' },
          newFilename: { type: 'string', example: '1699553000000.png' },
        },
      },
      UploadListItem: {
        type: 'object',
        properties: {
          filename: { type: 'string', example: '1699553000000.png' },
          url: { type: 'string', example: '/uploads/1699553000000.png' },
        },
      },
      UploadBulkResponseItem: {
        type: 'object',
        properties: {
          filename: { type: 'string', example: '1699553000001.webp' },
          url: { type: 'string', example: '/uploads/1699553000001.webp' },
        },
      },
    },
  },

  paths: {
    '/api/upload/create': {
      post: {
        tags: ['Uploads'],
        summary: 'Sube una imagen individual',
        description:
          'Acepta **multipart/form-data** con el campo `image`. Tipos permitidos: `image/jpeg`, `image/png`, `image/gif`, `image/webp`. Límite de tamaño por archivo: **5MB**.',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: { type: 'string', format: 'binary' },
                },
                required: ['image'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Imagen subida exitosamente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UploadSingleResponse' },
              },
            },
          },
          400: {
            description: 'Error en la carga (tipo no permitido o archivo vacío)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          413: { description: 'Archivo demasiado grande' },
          415: { description: 'Tipo de archivo no soportado' },
        },
      },
    },

    '/api/upload/getImages': {
      get: {
        tags: ['Uploads'],
        summary: 'Obtiene todas las imágenes almacenadas',
        responses: {
          200: {
            description: 'Lista de imágenes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/UploadListItem' },
                },
              },
            },
          },
        },
      },
    },

    '/api/upload/{filename}': {
      get: {
        tags: ['Uploads'],
        summary: 'Obtiene detalles de una imagen específica',
        parameters: [
          {
            in: 'path',
            name: 'filename',
            required: true,
            schema: { type: 'string' },
            example: '1699553000000.png',
          },
        ],
        responses: {
          200: {
            description: 'Detalle de la imagen',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UploadDetailResponse' },
              },
            },
          },
          404: { description: 'Imagen no encontrada' },
        },
      },
      delete: {
        tags: ['Uploads'],
        summary: 'Elimina una imagen por nombre de archivo',
        parameters: [
          {
            in: 'path',
            name: 'filename',
            required: true,
            schema: { type: 'string' },
            example: '1699553000000.png',
          },
        ],
        responses: {
          204: { description: 'Imagen eliminada correctamente' },
          404: { description: 'Imagen no encontrada' },
        },
      },
      put: {
        tags: ['Uploads'],
        summary: 'Actualiza/Reemplaza una imagen existente',
        parameters: [
          {
            in: 'path',
            name: 'filename',
            required: true,
            schema: { type: 'string' },
            example: '1699553000000.png',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: { type: 'string', format: 'binary' },
                },
                required: ['image'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Imagen reemplazada correctamente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UploadReplaceResponse' },
              },
            },
          },
          404: { description: 'Imagen original no encontrada' },
          413: { description: 'Archivo demasiado grande' },
          415: { description: 'Tipo de archivo no soportado' },
        },
      },
    },

    '/api/upload/bulk': {
      post: {
        tags: ['Uploads'],
        summary: 'Sube varias imágenes a la vez',
        description:
          'Acepta **multipart/form-data** con el campo `images` (array). Tipos permitidos: `image/jpeg`, `image/png`, `image/gif`, `image/webp`. Límite de tamaño por archivo: **5MB**. Máximo por solicitud (backend): **10** archivos.',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                  },
                },
                required: ['images'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Imágenes subidas exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/UploadBulkResponseItem' },
                },
              },
            },
          },
          400: {
            description: 'Error de validación o límite excedido',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          413: { description: 'Archivo demasiado grande' },
          415: { description: 'Tipo de archivo no soportado' },
        },
      },
    },
  },
};
