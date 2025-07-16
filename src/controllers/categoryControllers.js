// controllers/orderController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper para validación
const validateCategoryData = ({ name, imageUrl, onCarousel, shortDescription, longDescription, avaible }) => {
  const errors = [];

  if (typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required');
  }
  if (typeof imageUrl !== 'string' || !imageUrl.trim()) {
    errors.push('imageUrl is required');
  }
  if (onCarousel !== undefined && typeof onCarousel !== 'boolean') {
    errors.push('The Field "onCarousel" is a boolean');
  }
  if (typeof shortDescription !== 'string' || !shortDescription.trim()) {
    errors.push(' "shortDescription" is required');
  }
  if (typeof longDescription !== 'string' || !longDescription.trim()) {
    errors.push(' "longDescription"is required.');
  }
  // avaible debe coincidir con tu enum ProductStatus
  const validStatuses = ['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'];
  if (avaible !== undefined && !validStatuses.includes(avaible)) {
    errors.push(`The Field "avaible" most be: ${validStatuses.join(', ')}.`);
  }

  return errors;
};

const createCategory = async (req, res) => {

  const validationErrors = validateCategoryData(req.body);
  if (validationErrors.length) {
    return res.status(400).json({ message: validationErrors });
  }

  try {
    const {
      name,
      imageUrl,
      onCarousel = true,
      shortDescription,
      longDescription,
      status,
      sortOrder
    } = req.body;

    const newCategory = await prisma.category.create({
      data: { name, imageUrl, onCarousel, shortDescription, longDescription, status,sortOrder }
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  // 0) validamos que venga el id
  if (!id) {
    return res.status(400).json({ message: 'Id params is Required' });
  }

  // 1) validamos entrada (permitimos omitir algunos campos si no van a cambiar)
  const validationErrors = validateCategoryData({
    name: req.body.name ?? '', 
    imageUrl: req.body.imageUrl ?? '',
    onCarousel: req.body.onCarousel,
    shortDescription: req.body.shortDescription ?? '',
    longDescription: req.body.longDescription ?? '',
    status: req.body.status
  });
  if (validationErrors.length) {
    return res.status(400).json({ message: validationErrors });
  }

  try {
    // 2) opcional: comprobamos que exista antes de actualizar
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const {
      name,
      imageUrl,
      onCarousel,
      shortDescription,
      longDescription,
      status,
      sortOrder
    } = req.body;

    const updated = await prisma.category.update({
      where: { id },
      data: { name, imageUrl, onCarousel, shortDescription, longDescription, status,sortOrder }
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error to update category:', error);
    // P2025: registro no existe
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const { onCarousel } = req.query;
    const where = {};
    if (onCarousel !== undefined) {
      where.onCarousel = onCarousel === 'true';
          const categories = await prisma.category.findMany({
      where,
    });
    res.json(categories);
    }
    else{
      const categories = await prisma.category.findMany();
         res.json(categories);
    }

  } catch (error) {
    console.error('Fail to get Categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

 const getAvailableCarouselCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        status: 'AVAILABLE',
        onCarousel: true,
      },
             orderBy: [
  { sortOrder: 'asc' },
  { name: 'asc' }
]
    });
    res.json(categories);
  } catch (error) {
    console.error('Failed to get available carousel categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id }
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.json(category);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    return res.status(500).json({ message: 'internal server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function getCategoriesAvailable(req, res) {
  try {
    const cats = await prisma.category.findMany({
      where: { status: "AVAILABLE" },
                orderBy: [
  { sortOrder: 'asc' },
  { name: 'asc' }
]
    });
    res.json(cats);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal server Error' });
  }
}

async function getCategoriesWithSales(req, res) {
  try {
    const categories = await prisma.$queryRaw`
      SELECT
        c.*,
        COALESCE(s.accumulated, 0)::float AS accumulated
      FROM "Category" AS c
      LEFT JOIN (
        SELECT
          p."categoryId"          AS categoryId,
          SUM(oi."price" * oi."quantity") AS accumulated
        FROM "Product" AS p
        JOIN "OrderItem" AS oi
          ON oi."productId" = p.id
        GROUP BY p."categoryId"
      ) AS s
        ON s.categoryId = c.id
      ORDER BY c.name;
    `
    return res.json(categories)
  } catch (error) {
    console.error('Error fetching categories with sales:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function updateCategoryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body; // debe ser "AVAILABLE", "DISABLED" o "OUT_OF_STOCK"
    const updated = await prisma.category.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating product status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}




module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoriesWithSales,
  getCategoriesAvailable,
  updateCategoryStatus,
  getAvailableCarouselCategories
};
