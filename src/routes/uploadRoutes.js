// routes/upload.routes.js (o el archivo que pegaste)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');

const {
  authenticateBearer,
  requireAdminOrEmployee,
} = require("../middlewares/authMiddleware");


// Filtro de tipos permitido (opcional pero recomendado)
const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const fileFilter = (req, file, cb) => {
  if (allowedMimes.includes(file.mimetype)) return cb(null, true);
  cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Tipo no permitido'));
};

// Configuración Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter, // 👈 valida tipos al vuelo
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB por archivo
  },
});

router.post('/upload/create', upload.single('image'), authenticateBearer, uploadController.uploadImage);

router.get('/upload/getImages',authenticateBearer, uploadController.getImages);

router.get('/upload/:filename',authenticateBearer, uploadController.getImageDetails);

router.delete('/upload/:filename',authenticateBearer,requireAdminOrEmployee, uploadController.deleteImage);

router.put('/upload/:filename', upload.single('image'),authenticateBearer,  uploadController.updateImage);

router.post(
  '/upload/bulk',
  upload.array('images', 10), // 👈 tope adicional aquí
  uploadController.uploadImagesBulk
);

module.exports = router;
