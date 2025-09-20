const {prisma} = require('../lib/prisma')
const {generateImageData} = require('../middlewares/generateImageData')


// Crear Producto
async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      sellPrice,
      specifications,
      options,          // JSON string o array de objetos a crear
      category,
      imageLeftUrl,
      imageRightUrl,
      type,
      status,
        isOptionItem,            // boolean (checkbox)
      packOptionSurcharge, 
      packMaxItems
    } = req.body;

    
    // 1) Unicidad por name
    const existing = await prisma.product.findUnique({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: 'There is a product whit same name' });
    }

    // 2) Validar categoría
    const cat = await prisma.category.findUnique({ where: { name: category } });
    if (!cat) {
      return res.status(400).json({ message: 'Invalid Category' });
    }


    // 3) Procesar imágenes
    const imageLeft = await generateImageData(imageLeftUrl);
    if (!imageLeft) {
        return res.status(400).json({ message: 'Error to process left image' });
    }
    let imageRight = null;
    if (imageRightUrl) {
      imageRight = await generateImageData(imageRightUrl);
      if (!imageRight) {
        return res.status(400).json({ message: 'Error to process right image' });
      }
    }

    // 4) Parseo de options si vienen
    let parsedOptions;
    if (options) {
      try {
        parsedOptions = typeof options === 'string'
          ? JSON.parse(options)
          : options;
        // parsedOptions debe ser un array de objetos con la forma
        // { groupId: "...", values: [ { id: "valueId1" }, { id: "valueId2" } ] }
      } catch {
        return res.status(400).json({ message: 'Field options most be valid  JSON ' });
      }
    }

    // 5) Montar el objeto data, **sin** incluir `options` si está vacío
    const data = {
      name,
      description: description || undefined,
      price: parseFloat(price),
      sellPrice: sellPrice != null ? parseFloat(sellPrice) : undefined,
      specifications: specifications || undefined,
        category: {
        connect: { id: cat.id }
      },
      imageLeft,
      imageRight: imageRight || undefined,
      type: type || undefined,
      status: status || undefined,
      isOptionItem: isOptionItem || false,
      packOptionSurcharge: packOptionSurcharge || 0,
      packMaxItems
    };

  // 6) Creación en BD (sin options)
 const product = await prisma.product.create({ data });

 // 7) Ahora sí añadimos las opciones con createMany
 if (Array.isArray(parsedOptions) && parsedOptions.length > 0) {
   await prisma.productOption.createMany({
     data: parsedOptions.map((groupId) => ({
       productId: product.id,
       groupId,
    })),
   });
 }

 return res.status(201).json(product);

  } catch (err) {
    console.error('Error creando producto:', err);
 res.status(500).json({ message: 'Internal server error' });
  }
}
// 2. Obtener Todos los Productos (GET)
async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { name: true }
        },
        // <-- Añadido para traer los option groups asociados
        options: {
          select: {
            groupId: true
          }
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to get products" });
  }
}


// Actualizar Producto
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      name,
      description,
      price,
      sellPrice,
      specifications,
      options,
      category,
      imageLeftUrl,
      imageRightUrl,
      type,
      status,
        isOptionItem,       
      packOptionSurcharge,
      packMaxItems 
    } = req.body;

    const updateData = {};

    if (name && name !== existing.name) {
      const clash = await prisma.product.findUnique({ where: { name } });
      if (clash) {
        return res.status(400).json({ message: 'There is a product whith the same name' });
      }
      updateData.name = name;
    }

    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (sellPrice !== undefined) updateData.sellPrice = parseFloat(sellPrice);
    if (specifications !== undefined) updateData.specifications = specifications;

    if (options !== undefined) {
  // 1. Asegurarte de tener un array de IDs
  const parsedOptions = typeof options === 'string'
    ? JSON.parse(options)
    : options;

  // 2. Borra las antiguas y crea las nuevas
  updateData.options = {
    deleteMany: {}, // quita todas las relaciones previas
    create: parsedOptions.map((groupId) => ({
      group: { connect: { id: groupId } }
    }))
  };
}

    if (category) {
      const cat = await prisma.category.findUnique({ where: { name: category } });
      if (!cat) {
        return res.status(400).json({ message: 'Invalid Category' });
      }
      updateData.category = {
    connect: { id: cat.id }
  };
    }

    if (imageLeftUrl) {
      const imgL = await generateImageData(imageLeftUrl);
      if (!imgL) return res.status(400).json({ message: 'Error to get imageLeft' });
      updateData.imageLeft = imgL;
    }

    if (imageRightUrl) {
      const imgR = await generateImageData(imageRightUrl);
      if (!imgR) return res.status(400).json({ message: 'Error to get image right' });
      updateData.imageRight = imgR;
    }

    if (type) updateData.type = type;
    if (status) updateData.status = status;

    if(isOptionItem) updateData.isOptionItem = isOptionItem;
    if(packOptionSurcharge) updateData.packOptionSurcharge = packOptionSurcharge;
 if(packMaxItems) updateData.packMaxItems = packMaxItems;
    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return res.json(updated);

  } catch (err) {
    console.error('Error actualizando producto:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        // 1) Nombre e id de la categoría
        category: {
          select: { id: true, name: true },
        },
        // 2) Grupos de opciones asignados al producto
        options: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
                required: true,
                minSelectable: true,
                maxSelectable: true,
                showImages: true,
                // aquí traemos los valores posibles del grupo
                OptionValue: {
                  select: {
                    id: true,
                    name: true,
                    extraPrice: true,
                    imageUrl: true,
                    description: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
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

async function getProductSuggestions(req, res) {
  try {
    const { id } = req.params;

    // 1) Obtener la categoría del producto base
    const base = await prisma.product.findUnique({
      where: { id },
      select: { categoryId: true },
    });
    if (!base) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2) Intentar 2 sugerencias en la misma categoría
    const sameCat = await prisma.product.findMany({
      where: {
        categoryId: base.categoryId,
        id: { not: id },
        status: "AVAILABLE",
      },
      take: 2,
      select: {
        id: true,
        name: true,
        price: true,
        imageLeft: true,
        categoryId: true,
      },
    });

    let suggestions = [...sameCat];

    // 3) Si faltan para llegar a 2, rellenar con productos de otras categorías
    if (suggestions.length < 2) {
      const excludeIds = [id, ...suggestions.map((p) => p.id)];
      const fill = await prisma.product.findMany({
        where: {
          id: { notIn: excludeIds },
          status: "AVAILABLE",
        },
        take: 2 - suggestions.length,
        select: {
          id: true,
          name: true,
          price: true,
          imageLeft: true,
          categoryId: true,
        },
      });
      suggestions = suggestions.concat(fill);
    }

    return res.status(200).json(suggestions);
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,

  deleteProduct,
  getProductById,
  updateProductStatus,
  getProductSuggestions
};