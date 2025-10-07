// controllers/uploadController.js
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

let sharp = null;
try {
  sharp = require('sharp');
} catch (_) {
  console.warn('[uploadController] "sharp" no está instalado. Se desactivará la generación de thumbnails.');
}

// Constantes
const UPLOADS_DIR = path.join(__dirname, '../../uploads');
const THUMBS_DIR  = path.join(UPLOADS_DIR, '_thumbs');

const ALLOWED_MIME = new Set(['image/jpeg','image/png','image/gif','image/webp','image/avif']);
const ALLOWED_EXT  = new Set(['.jpg','.jpeg','.png','.gif','.webp','.avif']);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Helpers
const ensureThumbsDir = async () => {
  try {
    await fsp.mkdir(THUMBS_DIR, { recursive: true });
  } catch (err) {
    // silencioso
  }
};

const isImageFilename = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return ALLOWED_EXT.has(ext);
};

const exists = async (p) => {
  try { await fsp.access(p, fs.constants.F_OK); return true; }
  catch { return false; }
};

// Genera thumbnail .webp (320x320 cover). Devuelve el nombre del archivo de thumb.
const makeThumb = async (absInputPath, baseFilename) => {
  if (!sharp) return null; // sin sharp, no generamos
  await ensureThumbsDir();
  const thumbName = `${path.parse(baseFilename).name}.webp`;
  const thumbPath = path.join(THUMBS_DIR, thumbName);
  try {
    await sharp(absInputPath)
      .rotate()
      .resize({ width: 320, height: 320, fit: 'cover', position: 'center' })
      .webp({ quality: 75 })
      .toFile(thumbPath);
    return thumbName;
  } catch (err) {
    console.error('[makeThumb] Error generando thumbnail:', err?.message || err);
    return null;
  }
};

// Resuelve thumbUrl si existe thumbnail; soporta .webp o mismo nombre/extension.
const resolveThumbUrl = async (req, filename) => {
  const base = path.parse(filename).name;
  const sameExt = filename; // p.ej. 123.jpg
  const webp    = `${base}.webp`;

  const sameExtPath = path.join(THUMBS_DIR, sameExt);
  const webpPath    = path.join(THUMBS_DIR, webp);

  if (await exists(webpPath)) {
    return `${req.protocol}://${req.get('host')}/uploads/_thumbs/${webp}`;
  }
  if (await exists(sameExtPath)) {
    return `${req.protocol}://${req.get('host')}/uploads/_thumbs/${sameExt}`;
  }
  return null;
};

// Construye DTO imagen con original + (thumb si existe)
const fileToDTO = async (req, filename) => {
  const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
  const thumbUrl = await resolveThumbUrl(req, filename);
  return thumbUrl ? { filename, url, thumbUrl } : { filename, url };
};

// ================================
// LISTAR con PAGINACIÓN
// GET /upload/getImages?page=1&limit=12
// ================================
exports.getImages = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limitReq = parseInt(req.query.limit, 10);
    const limit = Math.min(Math.max(1, isNaN(limitReq) ? 12 : limitReq), 100); // 1..100

    const dirents = await fsp.readdir(UPLOADS_DIR, { withFileTypes: true });

    // Archivos de imagen (excluye carpetas y la carpeta _thumbs)
    const files = dirents
      .filter(d => d.isFile())
      .map(d => d.name)
      .filter(name => name !== '_thumbs' && isImageFilename(name));

    // Ordena por mtime desc (más recientes primero)
    const stats = await Promise.all(
      files.map(async (name) => {
        const st = await fsp.stat(path.join(UPLOADS_DIR, name));
        return { name, mtimeMs: st.mtimeMs };
      })
    );
    stats.sort((a, b) => b.mtimeMs - a.mtimeMs);

    const total = stats.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);

    const start = (safePage - 1) * limit;
    const end   = start + limit;
    const pageFiles = stats.slice(start, end).map(s => s.name);

    const images = await Promise.all(pageFiles.map(name => fileToDTO(req, name)));

    return res.json({
      images,
      paging: {
        page: safePage,
        limit,
        total,
        totalPages,
        hasPrev: safePage > 1,
        hasNext: safePage < totalPages,
      },
    });
  } catch (err) {
    console.error('[getImages] Error:', err);
    return res.status(500).json({ message: 'Error to get images' });
  }
};

exports.getImageDetails = async (req, res) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(UPLOADS_DIR, filename);

    await fsp.access(imagePath, fs.constants.F_OK).catch(() => {
      throw { status: 404, message: 'Image not found' };
    });

    const stats = await fsp.stat(imagePath);
    const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    const thumbUrl = await resolveThumbUrl(req, filename);

    return res.json({
      filename,
      url,
      thumbUrl: thumbUrl || null,
      size: stats.size,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime,
    });
  } catch (err) {
    const status = err?.status || 500;
    const message = err?.message || 'Error to get details';
    return res.status(status).json({ message });
  }
};

// ================================
/* SUBIR UNA (con thumbnail) */
// ================================
exports.uploadImage = async (req, res) => {
  try {
    // 1) ¿Llegó el archivo?
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided.' });
    }
    // 2) MIME
    if (!ALLOWED_MIME.has(req.file.mimetype)) {
      return res.status(415).json({ message: 'Unsupported file type.' });
    }
    // 3) Tamaño (en caso Multer no lo bloquee)
    if (req.file.size > MAX_SIZE) {
      return res.status(413).json({ message: 'File too large. Max 5 MB.' });
    }

    // 4) Generar thumbnail
    let thumbName = null;
    const absInput = req.file.path || path.join(UPLOADS_DIR, req.file.filename);
    if (sharp) {
      thumbName = await makeThumb(absInput, req.file.filename);
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const thumbUrl = thumbName
      ? `${req.protocol}://${req.get('host')}/uploads/_thumbs/${thumbName}`
      : null;

    return res.status(201).json({
      message: 'Image uploaded successfully.',
      image: {
        filename: req.file.filename,
        url,
        thumbUrl,
      },
    });
  } catch (err) {
    if (err?.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large. Max 5 MB.' });
    }
    console.error('[uploadImage] Error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// ================================
// SUBIR EN BULTO (con thumbnails + conteo)
// ================================
exports.uploadImagesBulk = async (req, res) => {
  try {
    const files = req.files || [];
    if (!files.length) {
      return res.status(400).json({ message: 'No files provided.' });
    }

    await ensureThumbsDir();

    const results = await Promise.allSettled(
      files.map(async (f) => {
        // Validaciones por archivo
        if (!ALLOWED_MIME.has(f.mimetype)) {
          throw new Error('UNSUPPORTED_TYPE');
        }
        if (f.size > MAX_SIZE) {
          throw new Error('FILE_TOO_LARGE');
        }

        // Generar thumbnail
        let thumbName = null;
        if (sharp) {
          const absInput = f.path || path.join(UPLOADS_DIR, f.filename);
          thumbName = await makeThumb(absInput, f.filename);
        }

        // DTO éxito
        return {
          filename: f.filename,
          url: `${req.protocol}://${req.get('host')}/uploads/${f.filename}`,
          thumbUrl: thumbName
            ? `${req.protocol}://${req.get('host')}/uploads/_thumbs/${thumbName}`
            : null,
          size: f.size,
          mimetype: f.mimetype,
        };
      })
    );

    const success = [];
    const failed = [];

    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        success.push(r.value);
      } else {
        const f = files[idx];
        let reason = r.reason?.message || 'UNKNOWN';
        if (reason === 'UNSUPPORTED_TYPE') {
          reason = 'Unsupported file type.';
        } else if (reason === 'FILE_TOO_LARGE') {
          reason = 'File too large. Max 5 MB.';
        }
        failed.push({
          filename: f?.originalname || f?.filename || `file_${idx}`,
          mimetype: f?.mimetype || null,
          size: f?.size || null,
          reason,
        });
      }
    });

    return res.status(201).json({
      message: 'Bulk upload completed',
      counts: {
        success: success.length,
        failed: failed.length,
        total: files.length,
      },
      success,
      failed,
    });
  } catch (err) {
    // Errores de Multer (límite de archivos, etc)
    if (err && err.code) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File too large. Max 5 MB.' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(415).json({ message: 'Unsupported file type or too many files.' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(413).json({ message: 'Too many files.' });
      }
      return res.status(400).json({ message: `Upload error: ${err.code}` });
    }

    console.error('[uploadImagesBulk] Error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// ================================
// ELIMINAR (borra original + thumbnail si existe)
// ================================
exports.deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOADS_DIR, filename);

    await fsp.unlink(filePath).catch(() => {
      throw { status: 404, message: 'Image not found' };
    });

    // Borra el thumbnail (webp o mismo nombre)
    const base = path.parse(filename).name;
    const sameExtThumb = path.join(THUMBS_DIR, filename);
    const webpThumb    = path.join(THUMBS_DIR, `${base}.webp`);
    await Promise.allSettled([fsp.unlink(sameExtThumb), fsp.unlink(webpThumb)]);

    return res.json({ message: 'Image deleted correctly' });
  } catch (err) {
    const status = err?.status || 500;
    const message = err?.message || 'Error deleting image';
    return res.status(status).json({ message });
  }
};

// ================================
// ACTUALIZAR (reemplaza + regenera thumbnail)
// ================================
exports.updateImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const oldPath = path.join(UPLOADS_DIR, filename);

    // Asegura que exista la vieja
    await fsp.access(oldPath, fs.constants.F_OK).catch(() => {
      throw { status: 404, message: 'Image not found' };
    });

    if (!req.file) {
      return res.status(400).json({ message: 'Empty field' });
    }

    // Borra la antigua
    await fsp.unlink(oldPath).catch(() => {});

    // Borra thumbnails antiguos (si existían)
    const base = path.parse(filename).name;
    const sameExtThumb = path.join(THUMBS_DIR, filename);
    const webpThumb    = path.join(THUMBS_DIR, `${base}.webp`);
    await Promise.allSettled([fsp.unlink(sameExtThumb), fsp.unlink(webpThumb)]);

    // Genera nuevo thumbnail para el nuevo archivo subido
    let newThumb = null;
    if (sharp) {
      const absInput = req.file.path || path.join(UPLOADS_DIR, req.file.filename);
      newThumb = await makeThumb(absInput, req.file.filename);
    }

    const newImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const newThumbUrl = newThumb
      ? `${req.protocol}://${req.get('host')}/uploads/_thumbs/${newThumb}`
      : null;

    return res.json({
      message: 'Image updated.',
      image: {
        filename: req.file.filename,
        url: newImageUrl,
        thumbUrl: newThumbUrl,
      },
    });
  } catch (err) {
    const status = err?.status || 500;
    const message = err?.message || 'Error updating image';
    return res.status(status).json({ message });
  }
};
