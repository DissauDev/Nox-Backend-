const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { categories } = require('../utils/Categorys');

 async function getMenu(req, res) {
  try {
    // Obtener todos los productos cuyas categorías están en la lista de categorías
  const dbCategories = await prisma.category.findMany({
  where: {
      status:     "AVAILABLE",
 
  },
         orderBy: [
  { sortOrder: 'asc' },
  { name: 'asc' }
],
  select: {
    id:               true,
    name:             true,
    shortDescription: true,
    longDescription:  true
  }
});

const products = await prisma.product.findMany({
  where: {
    status:     "AVAILABLE",
    categoryId: { in: dbCategories.map(c => c.id) }
  },
include: {
  options: {
    include: {
      group: true
    }
  }
},

  orderBy: { createdAt: "asc" }
});
// 1) agrupar productos por categoría


// 2) construir array final
const grouped = products.reduce((acc, prod) => {
  (acc[prod.categoryId] ??= []).push(prod);
  return acc;
}, {});

const menu = dbCategories
  .map(cat => ({
    category:         cat.name,
    shortDescription: cat.shortDescription,
    longDescription:  cat.longDescription,
    items: (grouped[cat.id] || []).map(p => {
      const parsedOptions = p.options.map(opt => {
        const group = opt.group;
        return {
          id:            group.id,
          name:          group.name,
          required:      group.required,
          minSelectable: group.minSelectable,
          maxSelectable: group.maxSelectable,
     
        };
      });

      const hasRequiredOptions = parsedOptions.some(opt => opt.required);

      return {
        id:          p.id,
        imageLeft:   p.imageLeft,
        imageRight:  p.imageRight || undefined,
        name:        p.name,
        description: p.description,
        price:       p.price,
        sellPrice:   p.sellPrice,
        status:      p.status,
        category:    cat.name,
        options:     parsedOptions,
        hasRequiredOptions
      };
    })
  }))
  .filter(cat => cat.items.length > 0);

return res.json(menu);

  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Error to get Menu' });
  } finally {
    await prisma.$disconnect();
  }
}


module.exports = { getMenu };
