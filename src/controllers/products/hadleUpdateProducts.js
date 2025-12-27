const { prisma } = require('../../lib/prisma');
const { generateImageData } = require('../../middlewares/generateImageData');

function parseCateringTiersForUpdate(cateringTiersRaw) {
  if (cateringTiersRaw == null) {
    return [];
  }

  let raw = cateringTiersRaw;

  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      throw new Error('Field cateringTiers must be valid JSON');
    }
  }

  if (!Array.isArray(raw)) {
    throw new Error('Field cateringTiers must be an array');
  }

  if (raw.length === 0) {
    return [];
  }

  let tiers = raw.map((t, idx) => {
    const minQty = Number(t.minQty);
    const maxQty = t.maxQty == null ? null : Number(t.maxQty);
    const price = Number(t.price);

    if (!Number.isInteger(minQty) || minQty <= 0) {
      throw new Error(`Invalid minQty at catering tier index ${idx}`);
    }
    if (maxQty != null && (!Number.isInteger(maxQty) || maxQty < minQty)) {
      throw new Error(`Invalid maxQty at catering tier index ${idx}`);
    }
    if (!Number.isFinite(price) || price <= 0) {
      throw new Error(`Invalid price at catering tier index ${idx}`);
    }

    return { minQty, maxQty, price };
  });

  

  // Ordenar por minQty
  tiers.sort((a, b) => a.minQty - b.minQty);

  // Validar solapes y posición del rango infinito
  for (let i = 0; i < tiers.length; i++) {
    const current = tiers[i];

    if (current.maxQty == null && i !== tiers.length - 1) {
      throw new Error(
        'Tier with maxQty = null (infinite) must be the last one'
      );
    }

    if (i > 0) {
      const prev = tiers[i - 1];
      const prevEnd = prev.maxQty ?? Infinity;
      if (current.minQty <= prevEnd) {
   
        throw new Error('Catering tiers ranges must not overlap');
      }
    }
  }

  return tiers;
}

function normalizeBoolean(value) {
  if (value === undefined) return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const v = value.toLowerCase().trim();
    if (v === 'true' || v === '1') return true;
    if (v === 'false' || v === '0') return false;
  }
  return Boolean(value);
}
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
      sortOrder,
      availability,
      hasSpecifications,
      specificationsTitle,
      hasCatering,
      onlyForCatering,        // boolean
      cateringTiers,
       cateringName,
      cateringDescription,
      cateringMinQty,
      descriptionPriceCatering,      
    } = req.body;

  // ----- Normalizaciones / Validaciones básicas
    const updateData = {};

    // name (único)
    if (name && name !== existing.name) {
      const clash = await prisma.product.findUnique({ where: { name } });
      if (clash) {
        return res.status(400).json({
          message: 'There is a product with the same name',
        });
      }
      updateData.name = name;
    }

    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (salePrice !== undefined) {
      updateData.salePrice =
        salePrice === null || salePrice === ''
          ? null
          : parseFloat(salePrice);
    }
    if (specifications !== undefined) {
      updateData.specifications = specifications;
    }

    // Cambios de categoría
    let targetCategoryId = existing.categoryId;
    let categoryChanged = false;
    if (category) {
      const cat = await prisma.category.findUnique({
        where: { name: category },
      });
      if (!cat) {
        return res.status(400).json({ message: 'Invalid Category' });
      }
      targetCategoryId = cat.id;
      if (targetCategoryId !== existing.categoryId) {
        categoryChanged = true;
        updateData.category = { connect: { id: targetCategoryId } };
      }
    }

    // Imágenes (si se proveen URLs para reprocesar)
    if (imageLeftUrl) {
      const imgL = await generateImageData(imageLeftUrl);
      if (!imgL) {
        return res
          .status(400)
          .json({ message: 'Error processing imageLeft' });
      }
      updateData.imageLeft = imgL;
    }
    if (imageRightUrl) {
      const imgR = await generateImageData(imageRightUrl);
      if (!imgR) {
        return res
          .status(400)
          .json({ message: 'Error processing imageRight' });
      }
      updateData.imageRight = imgR;
    }

    if (type) updateData.type = type;
    if (status) updateData.status = status;
    if (availability) updateData.availability = availability;

    const normIsOptionItem = normalizeBoolean(isOptionItem);
    if (normIsOptionItem !== undefined) {
      updateData.isOptionItem = normIsOptionItem;
    }

    if (packOptionSurcharge !== undefined) {
      updateData.packOptionSurcharge = Number(packOptionSurcharge) || 0;
    }

    if (packMaxItems !== undefined) {
      updateData.packMaxItems =
        packMaxItems === null || packMaxItems === ''
          ? null
          : Number(packMaxItems);
    }

    const normHasSpecifications = normalizeBoolean(hasSpecifications);
    if (normHasSpecifications !== undefined) {
      updateData.hasSpecifications = normHasSpecifications;
    }

    if (specificationsTitle !== undefined) {
      updateData.specificationsTitle =
        specificationsTitle === ''
          ? null
          : String(specificationsTitle);
    }

    // nuevo flag hasCatering
    const normHasCatering = normalizeBoolean(hasCatering);
    if (normHasCatering !== undefined) {
      updateData.hasCatering = normHasCatering;
    }

    const normOnlyForCatering = normalizeBoolean(onlyForCatering);
    if (normOnlyForCatering !== undefined) {
      updateData.onlyForCatering = normOnlyForCatering;
    }

    // Campos de texto para catering
    if (cateringName !== undefined) {
      updateData.cateringName =
        cateringName === '' ? null : String(cateringName);
    }

    if (cateringDescription !== undefined) {
      updateData.cateringDescription =
        cateringDescription === '' ? null : String(cateringDescription);
    }

    if (descriptionPriceCatering !== undefined) {
      updateData.descriptionPriceCatering =
        descriptionPriceCatering === ''
          ? null
          : String(descriptionPriceCatering);
    }

    // cateringMinQty (mínimo global de catering)
    if (cateringMinQty !== undefined) {
      if (cateringMinQty === null || cateringMinQty === '') {
        updateData.cateringMinQty = null;
      } else {
        const n = Number(cateringMinQty);
        if (!Number.isInteger(n) || n <= 0) {
          return res.status(400).json({
            message: 'cateringMinQty must be a positive integer or null',
          });
        }
        updateData.cateringMinQty = n;
      }
    }

    // sortOrder del PRODUCTO dentro de su categoría
    if (sortOrder !== undefined && String(sortOrder).trim() !== '') {
      const n = Number(sortOrder);
      if (!Number.isInteger(n) || n < 0) {
        return res.status(400).json({
          message: 'sortOrder must be a non-negative integer',
        });
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
          return res.status(400).json({
            message: 'options must be an array of OptionGroup IDs',
          });
        }
        // normaliza: quita falsy/duplicados preservando orden
        const seen = new Set();
        orderedGroupIds = arr.filter((x) => {
          const ok =
            typeof x === 'string' &&
            x.trim().length > 0 &&
            !seen.has(x);
          if (ok) seen.add(x);
          return ok;
        });
      } catch {
        return res.status(400).json({
          message: 'options must be a valid JSON array',
        });
      }
    }

    // ----- Parseo de cateringTiers
    let parsedCateringTiers = undefined;
    if (cateringTiers !== undefined) {
      try {
        parsedCateringTiers = parseCateringTiersForUpdate(cateringTiers);
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    }

    // ----- Transacción: update del producto + reorden/alta/baja de opciones + catering tiers
    const result = await prisma.$transaction(async (tx) => {
      // 1) Actualiza el producto base
      const updated = await tx.product.update({
        where: { id },
        data: updateData,
      });

      // 2) Opciones de producto (si NO enviaron "options", no tocamos)
      if (orderedGroupIds !== undefined) {
        // Obtener opciones actuales (por producto)
        const current = await tx.productOption.findMany({
          where: { productId: id },
          select: { id: true, groupId: true, sortOrder: true },
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        });

        const currentMap = new Map(
          current.map((r) => [r.groupId, r])
        );
        const currentIds = new Set(current.map((r) => r.groupId));
        const desiredIds = new Set(orderedGroupIds);

        // Eliminar las que ya no estén
        const toRemove = [...currentIds].filter(
          (gid) => !desiredIds.has(gid)
        );
        if (toRemove.length > 0) {
          await tx.productOption.deleteMany({
            where: { productId: id, groupId: { in: toRemove } },
          });
        }

        // Crear/actualizar cada groupId en el orden recibido
        for (let idx = 0; idx < orderedGroupIds.length; idx++) {
          const gid = orderedGroupIds[idx];

          // valida que el OptionGroup exista
          const existsGroup = await tx.optionGroup.findUnique({
            where: { id: gid },
            select: { id: true },
          });
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
      }

      // 3) Catering tiers (si se enviaron)
      if (parsedCateringTiers !== undefined) {
        // borrar todos los rangos actuales
        await tx.productCateringTier.deleteMany({
          where: { productId: id },
        });

        // crear nuevos si hay
        if (parsedCateringTiers.length > 0) {
          await tx.productCateringTier.createMany({
            data: parsedCateringTiers.map((t) => ({
              productId: id,
              minQty: t.minQty,
              maxQty: t.maxQty,
              price: t.price,
            })),
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
