const fs = require('fs');
const path = require('path');

// Obtiene todas las imágenes de la carpeta uploads
exports.getImages = (req, res) => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error to get images' });
      
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
      return res.status(404).json({ message: 'Imagen not found' });
    }
    fs.stat(imagePath, (err, stats) => {
      if (err) {
        return res.status(500).json({ message: 'Error to get details' });
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
exports.uploadImage = async (req, res) => {
   console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log(req);
  try {
    // 1) ¿Llegó el archivo?
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided.' });
    }

    // 2) Verificar tipo MIME
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(415).json({ message: 'Unsupported file type.' });
    }

    // 3) Verificar tamaño (en caso de que Multer no lo haya bloqueado)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (req.file.size > maxSize) {
      return res.status(413).json({ message: 'File too large. Max 5 MB.' });
    }

    // 4) Todo OK: construir URL y responder
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    return res.status(201).json({
      message: 'Image uploaded successfully.',
      image: {
        filename: req.file.filename,
        url: imageUrl,
      },
    });
  } catch (err) {
    // 5) Errores de Multer o propios
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large. Max 5 MB.' });
    }
    console.error('Upload error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Elimina una imagen dado su nombre de archivo.
exports.deleteImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../uploads', filename);
  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Imagen not found' });
    }
    res.json({ message: 'Image Delete correctly' });
  });
};

exports.updateImage = (req, res) => {
  const { filename } = req.params;
  const oldImagePath = path.join(__dirname, '../../uploads', filename);

  fs.access(oldImagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Image not found' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Empty  field' });
    }
    // Elimina la imagen antigua
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error to delete' });
      }
      const newImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.json({
        message: 'Image update .',
        image: {
          filename: req.file.filename,
          url: newImageUrl
        }
      });
    });
  });
};
