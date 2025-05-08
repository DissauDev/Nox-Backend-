const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { categories } = require('../utils/Categorys');

 async function getMenu(req, res) {
  try {
    // Obtener todos los productos cuyas categorías están en la lista de categorías
    const products = await prisma.product.findMany({
      where: {
        category: {
          in: categories.map(c => c.category) // usamos la propiedad 'category' definida en el objeto
        }
      },
      select: {
        id: true,
        imageLeft: true,
        imageRight: true,
        name: true,
        description: true,
        price: true,
        category: true
      },
      orderBy: { createdAt: 'asc' } // Se ordena por 'name' en lugar de 'createdAt'
    });

    // Agrupar productos por categoría
    const productsGrouped = products.reduce((acc, product) => {
      const categoryKey = product.category;
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(product);
      return acc;
    }, {});

    // Construir la estructura del menú: solo se muestran las categorías que tienen productos
    const menu = categories
      .filter(category => productsGrouped[category.category] && productsGrouped[category.category].length > 0)
      .map(category => ({
        category: category.category,
        shortDescription: category.shortDescription,
        longDescription: category.longDescription,
        items: productsGrouped[category.category].map(product => ({
          ...product,
          // Aquí se puede aplicar alguna transformación si se requiriera
          imageLeft: product.imageLeft,
          imageRight: product.imageRight || undefined
        }))
      }));

    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Error obteniendo el menú' });
  } finally {
    await prisma.$disconnect();
  }
}


module.exports = { getMenu };
