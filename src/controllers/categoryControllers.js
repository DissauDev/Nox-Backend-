// controllers/categoryController.js  (antes estaba dentro de orderController)
const { prisma } = require('../lib/prisma');
const { ProductStatus } = require('@prisma/client');
const { validateCreate, validateUpdate } = require('../utils/validators');
const { gt } = require('zod');

// ---------- Handlers ----------
async function createCategory(req, res) {
  const errors = validateCreate(req.body);
  if (errors.length) return res.status(400).json({ message: errors });

  try {
    const {
      name,
      imageUrl,
      onCarousel = true,
      shortDescription,
      longDescription,
      status = ProductStatus.AVAILABLE,
      sortOrder = 0,
    } = req.body;

    const newCategory = await prisma.category.create({
      data: { name, imageUrl, onCarousel, shortDescription, longDescription, status, sortOrder },
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('name')) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    console.error('createCategory error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Id param is required' });
  const errors = validateUpdate(req.body);
  if (errors.length) return res.status(400).json({ message: errors });

  try {
    const updated = await prisma.category.update({
      where: { id },
      data: req.body,
    });
    
    return res.json(updated);
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (error?.code === 'P2002' && error?.meta?.target?.includes('name')) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    console.error('updateCategory error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCategories(req, res) {
  try {
    const { onCarousel } = req.query;
    const where = {};
    if (typeof onCarousel !== 'undefined') where.onCarousel = onCarousel === 'true';

    const categories = await prisma.category.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return res.json(categories);
  } catch (error) {
    console.error('getCategories error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getAvailableCarouselCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      where: { status: ProductStatus.AVAILABLE, onCarousel: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return res.json(categories);
  } catch (error) {
    console.error('getAvailableCarouselCategories error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    return res.json(category);
  } catch (error) {
    console.error('getCategoryById error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    // 204 está bien; si prefieres consistencia con tests, puedes devolver 200 + message
    return res.status(204).send();
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    console.error('deleteCategory error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCategoriesAvailable(req, res) {
  try {
    const cats = await prisma.category.findMany({
      where: { status: ProductStatus.AVAILABLE },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return res.json(cats);
  } catch (error) {
    console.error('getCategoriesAvailable error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getCategoriesWithSales(req, res) {
  try {
    // SQL parametrizado por Prisma ($queryRaw`...`)
    const categories = await prisma.$queryRaw`
      SELECT
        c.*,
        COALESCE(s.accumulated, 0)::float AS "accumulated"
      FROM "Category" AS c
      LEFT JOIN (
        SELECT
          p."categoryId" AS "categoryId",
          SUM(oi."price" * oi."quantity") AS "accumulated"
        FROM "Product" AS p
        JOIN "OrderItem" AS oi
          ON oi."productId" = p.id
        GROUP BY p."categoryId"
      ) AS s ON s."categoryId" = c.id
      ORDER BY c."sortOrder" ASC, c."name" ASC;
    `;
    return res.json(categories);
  } catch (error) {
    console.error('getCategoriesWithSales error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateCategoryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!Object.values(ProductStatus).includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Use: ${Object.values(ProductStatus).join(', ')}`,
      });
    }
    const updated = await prisma.category.update({
      where: { id },
      data: { status },
    });
    return res.json(updated);
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'Category not found' });
    }
    console.error('updateCategoryStatus error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function updateCategorySortOrder(req, res) {
  try {
    const { id } = req.params;
    const { newSortOrder } = req.body;

    // 1) Validaciones básicas
    const j = Number(newSortOrder);
    if (!Number.isInteger(j) || j < 0) {
      return res.status(400).json({ message: 'newSortOrder must be a non-negative integer' });
    }

    // 2) Traer la categoría a mover (por id: robusto)
    const moving = await prisma.category.findUnique({ where: { id } });
    if (!moving) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const i = moving.sortOrder;
    if (i === j) {
      // No-op: nada que hacer
      return res.json(moving);
    }

    // 3) Ejecutar en transacción para mantener consistencia
    const [_, updated] = await prisma.$transaction(async (tx) => {
      if (j > i) {
        // Mover hacia abajo: el bloque (i, j] decrementa 1
        await tx.category.updateMany({
          where: { sortOrder: { gt: i, lte: j } },
          data:  { sortOrder: { decrement: 1 } },
        });
      } else {
        // Mover hacia arriba: el bloque [j, i) incrementa 1
        await tx.category.updateMany({
          where: { sortOrder: { gte: j, lt: i } },
          data:  { sortOrder: { increment: 1 } },
        });
      }

      // Poner a la movida en su nueva posición
      const updatedRow = await tx.category.update({
        where: { id },
        data:  { sortOrder: j },
      });

      // Devolver algo útil (la fila actualizada)
      return [true, updatedRow];
    });

    return res.json(updated);
  } catch (error) {
    console.error('updateCategorySortOrder error:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
  getAvailableCarouselCategories,
  updateCategorySortOrder
};
