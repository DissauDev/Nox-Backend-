const { prisma } = require('../../lib/prisma');
const {generateImageData} = require('../../middlewares/generateImageData');

async function hadleUpdateProduct(req, res) {
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
      salePrice,
      specifications,
      options,            // <-- array ordenado de OptionGroup IDs (o string JSON)
      category,           // <-- nombre de categoría (opcional)
      imageLeftUrl,
      imageRightUrl,
      type,
      status,
      isOptionItem,
      packOptionSurcharge,
      packMaxItems,
      sortOrder,          // <-- sortOrder del producto dentro de su categoría (opcional)
    } = req.body;

    // ----- Normalizaciones / Validaciones básicas
    const updateData = {};

    // name (único)
    if (name && name !== existing.name) {
      const clash = await prisma.product.findUnique({ where: { name } });
      if (clash) {
        return res.status(400).json({ message: 'There is a product whith the same name' });
      }
      updateData.name = name;
    }

    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (salePrice !== undefined) updateData.salePrice = salePrice === null ? null : parseFloat(salePrice);
    if (specifications !== undefined) updateData.specifications = specifications;

    // Cambios de categoría
    let targetCategoryId = existing.categoryId;
    let categoryChanged = false;
    if (category) {
      const cat = await prisma.category.findUnique({ where: { name: category } });
      if (!cat) return res.status(400).json({ message: 'Invalid Category' });
      targetCategoryId = cat.id;
      if (targetCategoryId !== existing.categoryId) {
        categoryChanged = true;
        updateData.category = { connect: { id: targetCategoryId } };
      }
    }

    // Imágenes (si se proveen URLs para reprocesar)
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

    if (isOptionItem !== undefined) updateData.isOptionItem = !!isOptionItem;
    if (packOptionSurcharge !== undefined) updateData.packOptionSurcharge = Number(packOptionSurcharge) || 0;
    if (packMaxItems !== undefined) updateData.packMaxItems = packMaxItems === null ? null : Number(packMaxItems);

    // sortOrder del PRODUCTO dentro de su categoría
    if (sortOrder !== undefined && String(sortOrder).trim() !== '') {
      const n = Number(sortOrder);
      if (!Number.isInteger(n) || n < 0) {
        return res.status(400).json({ message: 'sortOrder must be a non-negative integer' });
      }
      updateData.sortOrder = n;
    } else if (categoryChanged) {
      // Si cambió de categoría y no enviaste sortOrder, colócalo al final de la nueva
      const agg = await prisma.product.aggregate({
        where: { categoryId: targetCategoryId },
        _max: { sortOrder: true },
      });
      updateData.sortOrder = (agg._max.sortOrder ?? -1) + 1;
    }

    // ----- Parseo de options (array ordenado de groupIds)
    let orderedGroupIds = undefined;
    if (options !== undefined) {
      try {
        const arr = typeof options === 'string' ? JSON.parse(options) : options;
        if (!Array.isArray(arr)) {
          return res.status(400).json({ message: 'options must be an array of OptionGroup IDs' });
        }
        // normaliza: quita falsy/duplicados preservando orden
        const seen = new Set();
        orderedGroupIds = arr.filter((x) => {
          const ok = typeof x === 'string' && x.trim().length > 0 && !seen.has(x);
          if (ok) seen.add(x);
          return ok;
        });
      } catch {
        return res.status(400).json({ message: 'options must be a valid JSON array' });
      }
    }

    // ----- Transacción: update del producto + reorden/alta/baja de opciones
    const result = await prisma.$transaction(async (tx) => {
      // 1) Actualiza el producto base
      const updated = await tx.product.update({
        where: { id },
        data: updateData,
      });

      // 2) Si NO enviaron "options", terminamos aquí
      if (orderedGroupIds === undefined) {
        return updated;
      }

      // 3) Obtener opciones actuales (por producto)
      const current = await tx.productOption.findMany({
        where: { productId: id },
        select: { id: true, groupId: true, sortOrder: true },
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      });

      const currentMap = new Map(current.map((r) => [r.groupId, r]));
      const currentIds = new Set(current.map((r) => r.groupId));
      const desiredIds = new Set(orderedGroupIds);

      // 4) Eliminar las que ya no estén
      const toRemove = [...currentIds].filter((gid) => !desiredIds.has(gid));
      if (toRemove.length > 0) {
        await tx.productOption.deleteMany({
          where: { productId: id, groupId: { in: toRemove } },
        });
      }

      // 5) Crear/actualizar cada groupId en el orden recibido
      //    sortOrder = índice 0-based (o usa gaps si prefieres)
      for (let idx = 0; idx < orderedGroupIds.length; idx++) {
        const gid = orderedGroupIds[idx];

        // valida que el OptionGroup exista
        const existsGroup = await tx.optionGroup.findUnique({ where: { id: gid }, select: { id: true } });
        if (!existsGroup) {
          throw new Error(`OptionGroup not found: ${gid}`);
        }

        const existingPO = currentMap.get(gid);

        if (existingPO) {
          // Update sortOrder si cambió
          if (existingPO.sortOrder !== idx) {
            await tx.productOption.updateMany({
              where: { productId: id, groupId: gid },
              data: { sortOrder: idx },
            });
          }
        } else {
          // Crear relación nueva con el sortOrder correspondiente
          await tx.productOption.create({
            data: {
              productId: id,
              groupId: gid,
              sortOrder: idx,
            },
          });
        }
      }

      return updated;
    });

    return res.json(result);
  } catch (err) {
    console.error('Error actualizando producto:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { hadleUpdateProduct };