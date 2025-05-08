const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {categories} = require('../utils/Categorys');
const {generateImageData} = require('../middlewares/generateImageData')


// 1. Crear Producto (POST)
async function createProduct(req, res) {
  
  try {
    const { name, description, price, category, imageLeftUrl,sellPrice, imageRightUrl } = req.body;
    
        // Validar si ya existe un producto con ese nombre
        const existingProduct = await prisma.product.findUnique({ where: { name } });
        if (existingProduct) {
          return res.status(400).json({ error: "Ya existe un producto con ese nombre" });
        }

    // Validar categoría
   const validCategory = categories.find(c => c.category === category);
    if (!validCategory) {
      return res.status(400).json({ error: "Categoría inválida" });
    }

// Procesar imágenes
const imageLeft = await generateImageData(imageLeftUrl);
if (!imageLeft) {
  return res.status(400).json({ error: "La imagen izquierda no se pudo procesar o no existe" });
}

const imageRight = imageRightUrl 
  ? await generateImageData(imageRightUrl)
  : null;

// Si se proporcionó imageRightUrl y la imagen no se procesó correctamente, también puedes manejarlo
if (imageRightUrl && !imageRight) {
  return res.status(400).json({ error: "La imagen derecha no se pudo procesar o no existe" });
}

    // Crear en DB
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageLeft,
        imageRight,
        sellPrice: parseFloat(sellPrice)
      }
    });

    res.status(201).json(product);

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}

// 2. Obtener Todos los Productos (GET)
async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
  
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
}

// 3. Actualizar Producto (PUT)
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    // Obtener el producto existente
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return res.status(404).json({ error: "Producto no encontrado" });

    // Clonar req.body para evitar modificaciones directas y separar los campos especiales
    const { price, category, imageLeftUrl, imageRightUrl,sellPrice, ...otherFields } = req.body;
    const updateData = { ...otherFields };

    // Procesar el precio si se envió
    if (price) updateData.price = parseFloat(price);
    if(sellPrice) updateData.sellPrice = parseFloat(price);
    // Validar y asignar la categoría si se envió
    if (category) {
      const validCategory = categories.find(c => c.name === category);
      if (!validCategory) return res.status(400).json({ error: "Categoría inválida" });
      updateData.category = category;
    }

    // Procesar la imagen izquierda
    if (imageLeftUrl) {
      const imageLeft = await generateImageData(imageLeftUrl);
      if (!imageLeft) {
        return res.status(400).json({ error: "La imagen izquierda no se pudo procesar o no existe" });
      }
      updateData.imageLeft = imageLeft;
    }

    // Procesar la imagen derecha
    if (imageRightUrl) {
      const imageRight = await generateImageData(imageRightUrl);
      if (!imageRight) {
        return res.status(400).json({ error: "La imagen derecha no se pudo procesar o no existe" });
      }
      updateData.imageRight = imageRight;
    }

    // Actualizar solo los campos que se enviaron y fueron procesados correctamente
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error actualizando producto:", error);
    res.status(500).json({ error: "Error actualizando producto" });
  }
}
// 5. Obtner producto por id
async function getProductById(req, res) {
  try {
    const { id } = req.params;
    // Obtener el producto existente
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return res.status(404).json({ error: "Producto no encontrado" });

    res.status(200).json(existingProduct)
  }
  catch(error){
  console.log(error);
  res.status(500).json({ error: "Error obteniendo el producto" });
  }
}
// 6. Eliminar Producto (DELETE)
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({ where: { id } });
    res.status(200).json({message: "Item delete correctly"});

  } catch (error) {
    if (error.code === 'P2025') {
      console.log(error);
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(500).json({ error: "Error eliminando producto" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById
};