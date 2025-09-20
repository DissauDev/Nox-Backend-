 const {prisma} = require('../lib/prisma')

async function setProductOptions(req, res) {
  const { id } = req.params;
  const { groupIds } = req.body;

  try {
    // 1) Validar que el producto existe
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2) Obtener sólo los grupos que realmente existen
    const existingGroups = await prisma.optionGroup.findMany({
      where: { id: { in: groupIds } },
      select: { id: true }
    });
    const validGroupIds = existingGroups.map((g) => g.id);

    if (validGroupIds.length === 0) {
      return res.status(400).json({ message: 'No valid option groups provided' });
    }

    // 3) Borrar asociaciones antiguas (si quieres reemplazar completamente)
    await prisma.productOption.deleteMany({ where: { productId: id } });

    // 4) Crear nuevas asociaciones sólo con los groupId válidos
    const data = validGroupIds.map((gid) => ({
      productId: id,
      groupId: gid
    }));
    const { count } = await prisma.productOption.createMany({ data });

    return res.json({ message: `Associated ${count} option groups to product ${id}`, product });
  } catch (error) {
    console.error('Error setting product options:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /products/:id/options
async function getProductOptions(req, res) {
  try {
    const { id } = req.params;
    const opts = await prisma.productOption.findMany({
      where: { productId: id },
      include: {
        group: {
          include: { values: true }
        }
      }
    });
    res.json(opts);
  } catch (err) {
    console.error('Error fetching product options:', err);
 res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { setProductOptions, getProductOptions };
