const {prisma} = require('../lib/prisma')

const {updateProductSortOrder} = require('./products/updateProductSortOrder')
const {hadleUpdateProduct} = require('./products/hadleUpdateProducts')
const {handleCreateProduct} = require('./products/handleCreateProduct')
// Crear Producto
const createProduct = handleCreateProduct;
// 2. Obtener Todos los Productos (GET)
async function getAllProducts(req, res) {
  try {
    const {
      page = '1',
      pageSize = '10',
      status,           // "AVAILABLE" | "DISABLED" | "OUT_OF_STOCK"
      categoryId,       // string
      categoryName,     // string (exacto) o podrías hacer contains
      q,                // búsqueda por nombre (contains)
      type,             // "REGULAR" | "SEASONAL"
      sortBy,           // "name" | "price" | "createdAt" | "salePrice" | "sortOrder"
      sortDir,          // "asc" | "desc"
    } = req.query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const take = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 100); // cap 100
    const skip = (pageNum - 1) * take;

    // where dinámico
    const where = {
      ...(status && status !== 'all' ? { status } : {}),
      ...(type ? { type } : {}),
      ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(categoryName
        ? { category: { name: categoryName } } // exacto; cambia a contains si quieres
        : {}),
    };

    // orderBy estable
    const orderBy = [
      { category: { sortOrder: 'asc' } },
      { sortOrder: 'asc' },
      { name: 'asc' },
    ];

    // si el cliente envía sortBy/sortDir válidos, los aplicamos al final
    const allowedSort = new Set(['name', 'price', 'createdAt', 'salePrice', 'sortOrder']);
    const dir = sortDir === 'desc' ? 'desc' : 'asc';
    if (sortBy && allowedSort.has(sortBy)) {
      // mantener orden por categoría primero; luego criterio custom, luego name
      orderBy.splice(1, 0, { [sortBy]: dir });
    }

    // count tot
    // al
    const [total, products] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, sortOrder: true } },
          options:  { select: { groupId: true } },
           cateringTiers: {
          select: { id: true, product: true, productId:true,
             minQty:true, maxQty:true,price:true   },
        },
        },
        orderBy,
        skip,
        take,
      }),
    ]);

    const totalPages = Math.ceil(total / take) || 1;

    res.json({
      meta: {
        page: pageNum,
        pageSize: take,
        total,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        sortBy: sortBy || null,
        sortDir: sortBy ? dir : null,
      },
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to get products" });
  }
}

// Actualizar Producto
 const updateProduct = hadleUpdateProduct;

// GET /products/:id
async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        // 1) Categoría
        category: {
          select: { id: true, name: true },
        },
        cateringTiers: {
          select: { id: true, product: true, productId:true,
             minQty:true, maxQty:true,price:true   },
        },

        options: {
          where: {
            group: {
              isAvailable: true,
              OptionValue: { some: { isAvailable: true } },
            },
          },
          orderBy: { sortOrder: 'asc' },
          select: {
            id: true,
            sortOrder: true, 
            groupId: true,
            group: {
              select: {
                id: true,
                name: true,
                required: true,
                minSelectable: true,
                maxSelectable: true,
                selectionTitle:true,
                showImages: true,
                // Lista de valores del grupo (solo disponibles)
                OptionValue: {
                  where: { isAvailable: true },
                  orderBy: [
                    { sortOrder: 'asc' }, 
                    { name: 'asc' },      
                  ],
                  select: {
                    id: true,
                    name: true,
                    extraPrice: true,
                    imageUrl: true,
                    description: true,
                    sortOrder: true, 
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('getProductById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// 6. Eliminar Producto (DELETE)
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    // 1) Borrar valores de opciones asociados
    await prisma.productOptionValue.deleteMany({
      where: {
        productOption: { productId: id }
      }
    });

    // 2) Borrar las asociaciones de grupos
    await prisma.productOption.deleteMany({
      where: { productId: id }
    });

    // 3) Finalmente borrar el producto
    await prisma.product.delete({
      where: { id }
    });

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Product not found" });
    }
    console.error(error);
    res.status(500).json({ message: "Error to delete" });
  }
}

async function updateProductStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body; // debe ser "AVAILABLE", "DISABLED" o "OUT_OF_STOCK"
    const updated = await prisma.product.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating product status:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



function availabilityWhereForOrderType(orderType) {
  if (!orderType) return undefined;
  const t = String(orderType).toLowerCase();
  if (t === "pickup") return { in: ["PICKUP_ONLY", "BOTH"] };
  if (t === "delivery") return { in: ["DELIVERY_ONLY", "BOTH"] };
  return undefined;
}

/**
 * GET /products/:id/suggestions?orderType=pickup|delivery
 */
async function getProductSuggestions(req, res) {
  try {
    const { id } = req.params;
    const { orderType } = req.query;

    // 1) Obtener la categoría del producto base
    const base = await prisma.product.findUnique({
      where: { id },
      select: { categoryId: true },
    });

    if (!base) {
      return res.status(404).json({ message: "Product not found" });
    }

    const availabilityFilter = availabilityWhereForOrderType(orderType);

    // Filtro común para sugerencias:
    // - AVAILABLE
    // - availability compatible con orderType
    // - NO tener OptionGroup.required=true en ninguna opción del producto
    const commonWhere = {
      status: "AVAILABLE",
      ...(availabilityFilter ? { availability: availabilityFilter } : {}),

      // ✅ excluir si existe algún grupo requerido asociado
      options: {
        none: {
          group: { required: true },
        },
      },
    };

    // 2) Intentar 2 sugerencias en la misma categoría
    const sameCat = await prisma.product.findMany({
      where: {
        ...commonWhere,
        categoryId: base.categoryId,
        id: { not: id },
      },
      take: 2,
      select: {
        id: true,
        name: true,
        price: true,
        salePrice: true,
        imageLeft: true,
        categoryId: true,
        availability: true,
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    let suggestions = [...sameCat];

    // 3) Si faltan para llegar a 2, rellenar con productos de otras categorías
    if (suggestions.length < 2) {
      const excludeIds = [id, ...suggestions.map((p) => p.id)];

      const fill = await prisma.product.findMany({
        where: {
          ...commonWhere,
          id: { notIn: excludeIds },
          categoryId: { not: base.categoryId },
        },
        take: 2 - suggestions.length,
        select: {
          id: true,
          name: true,
          price: true,
          salePrice: true,
          imageLeft: true,
          categoryId: true,
          availability: true,
        },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      });

      suggestions = suggestions.concat(fill);
    }

    return res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error in getProductSuggestions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const updateProdSortOrder = updateProductSortOrder;

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
updateProdSortOrder,
  deleteProduct,
  getProductById,
  updateProductStatus,
  getProductSuggestions
};