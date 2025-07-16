const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');

// Configuración de Multer para guardar las imágenes en la carpeta "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Se utiliza Date.now() para evitar duplicados y se conserva la extensión original
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB máximo por archivo
  },
});

// Rutas de la API

// Subir imagen
router.post('/upload/create', upload.single('image'), uploadController.uploadImage);

// Obtener todas las imágenes
router.get('/upload/getImages', uploadController.getImages);

// Obtener detalles de una imagen en particular (se pasa el nombre del archivo en la URL)
router.get('/upload/:filename', uploadController.getImageDetails);

// Eliminar imagen (por nombre de archivo)
router.delete('/upload/:filename', uploadController.deleteImage);

// Actualizar imagen (se reemplaza la imagen actual con una nueva subida)
router.put('/upload/:filename', upload.single('image'), uploadController.updateImage);

module.exports = router;
