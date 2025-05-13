const fs = require('fs');
const path = require('path');

// Obtiene todas las imágenes de la carpeta uploads
exports.getImages = (req, res) => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error al leer las imágenes.' });
      
    }
    // Genera un arreglo con la información de cada imagen
    const images = files.map(file => ({
      filename: file,
      url: `${req.protocol}://${req.get('host')}/uploads/${file}`
    }));
    res.json({ images });
  });
};

// Obtiene detalles de una imagen específica (por su nombre de archivo)
exports.getImageDetails = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../uploads', filename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Imagen no encontrada.' });
    }
    fs.stat(imagePath, (err, stats) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener detalles de la imagen.' });
      }
      res.json({
        filename,
        url: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
        size: stats.size,
        createdAt: stats.birthtime
      });
    });
  });
};

// Controlador para subir una imagen. Multer maneja el guardado físico.
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(201).json({
    message: 'Imagen subida correctamente.',
    image: {
      filename: req.file.filename,
      url: imageUrl
    }
  });
};

// Elimina una imagen dado su nombre de archivo.
exports.deleteImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../uploads', filename);
  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Imagen no encontrada o error al eliminarla.' });
    }
    res.json({ message: 'Imagen eliminada correctamente.' });
  });
};

// Actualiza una imagen reemplazando la antigua con una nueva.
// Se espera que en la misma petición se suba el nuevo archivo mediante Multer.
exports.updateImage = (req, res) => {
  const { filename } = req.params;
  const oldImagePath = path.join(__dirname, '../../uploads', filename);

  fs.access(oldImagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Imagen no encontrada.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo para actualizar.' });
    }
    // Elimina la imagen antigua
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar la imagen anterior.' });
      }
      const newImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.json({
        message: 'Imagen actualizada correctamente.',
        image: {
          filename: req.file.filename,
          url: newImageUrl
        }
      });
    });
  });
};
