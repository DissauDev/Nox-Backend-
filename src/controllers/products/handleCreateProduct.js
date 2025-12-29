const { prisma } = require('../../lib/prisma');
const { generateImageData } = require('../../middlewares/generateImageData');


function parseOptions(optionsRaw) {
  if (optionsRaw == null) return [];

  let raw = optionsRaw;

  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      throw new Error('Field options must be valid JSON');
    }
  }

  if (!Array.isArray(raw)) {
    throw new Error('Field options must be an array');
  }

  // string[]
  if (raw.length > 0 && typeof raw[0] === 'string') {
    return raw.map((groupId, idx) => ({
      groupId,
      sortOrder: idx + 1, // 1-based
    }));
  }

  // { groupId, sortOrder? }[]
  return raw.map((o, idx) => ({
    groupId: o.groupId,
    sortOrder:
      Number.isInteger(o.sortOrder) && o.sortOrder >= 1
        ? o.sortOrder
        : idx + 1, // fallback: posición del array (1-based)
  }));
}

async function validateOptionGroupsExist(optionEntries) {
  if (!optionEntries || optionEntries.length === 0) return;

  const ids = optionEntries.map((o) => o.groupId);
  const found = await prisma.optionGroup.findMany({
    where: { id: { in: ids }, isAvailable: true },
    select: { id: true },
  });

  const foundSet = new Set(found.map((g) => g.id));
  const missing = ids.filter((id) => !foundSet.has(id));
  if (missing.length > 0) {
    throw new Error(`Invalid option group(s): ${missing.join(', ')}`);
  }
}


async function resolveProductSortOrder(categoryId, sortOrderInput) {
  const sortStr =
    typeof sortOrderInput === 'string' ? sortOrderInput.trim() : sortOrderInput;

  if (
    sortStr === undefined ||
    sortStr === null ||
    sortStr === '' ||
    sortStr === '0'
  ) {
    const agg = await prisma.product.aggregate({
      where: { categoryId },
      _max: { sortOrder: true },
    });
    return (agg._max.sortOrder ?? 0) + 1; // lo coloca al final (1-based)
  }

  const n = Number(sortOrderInput);
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('sortOrder must be a non-negative integer');
  }
  return n;
}


function parseCateringTiers(cateringTiersRaw, hasCatering) {
  if (cateringTiersRaw == null) {
    if (hasCatering) {
      throw new Error(
        'If hasCatering is true, cateringTiers must be provided'
      );
    }
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

  if (hasCatering && raw.length === 0) {
    throw new Error(
      'If hasCatering is true, cateringTiers must have at least one item'
    );
  }

  let tiers = raw.map((t, idx) => {
    const minQty = Number(t.minQty);
    const maxQty = t.maxQty == null ? null : Number(t.maxQty);
    const tierPrice = Number(t.price);

    if (!Number.isInteger(minQty) || minQty <= 0) {
      throw new Error(`Invalid minQty at catering tier index ${idx}`);
    }
    if (maxQty != null && (!Number.isInteger(maxQty) || maxQty < minQty)) {
      throw new Error(`Invalid maxQty at catering tier index ${idx}`);
    }
    if (!Number.isFinite(tierPrice) || tierPrice <= 0) {
      throw new Error(`Invalid price at catering tier index ${idx}`);
    }

    return { minQty, maxQty, price: tierPrice };
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

async function handleCreateProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      salePrice,
      specifications,
      options, // string | string[] | { groupId: string; sortOrder?: number }[]
      category, // category name
      imageLeftUrl,
      imageRightUrl,
      type,
      status,
      availability,
      isOptionItem,
      packOptionSurcharge,
      packMaxItems,
      sortOrder,
      hasSpecifications,
      specificationsTitle,
      hasCatering, // boolean
      cateringTiers,
      cateringName,
      cateringDescription,
      cateringMinQty,
      descriptionPriceCatering,
      onlyForCatering, // rangos de catering
      cateringCategory, // nombre de la categoría para el producto en modo catering
    } = req.body;

    console.log("cateringCategory",cateringCategory);
    // 1) Unicidad por name
    const existing = await prisma.product.findUnique({ where: { name } });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'There is a product with the same name' });
    }

    // 2) Validar categoría por nombre
    const cat = await prisma.category.findUnique({ where: { name: category } });
    if (!cat) {
      return res.status(400).json({ message: 'Invalid Category' });
    }
    const hasCateringFlag = !!hasCatering;
const onlyForCateringFlag = !!onlyForCatering;


// Un producto "onlyForCatering" tiene sentido solo si tiene modo catering activo
if (onlyForCateringFlag && !hasCateringFlag) {
  return res.status(400).json({
    message: 'If onlyForCatering is true, hasCatering must also be true.',
  });
}
// 👇👇 NUEVO: resolver categoría de catering
let cateringCat = null;

if (hasCateringFlag || onlyForCateringFlag) {
  if (cateringCategory) {
    // buscamos por nombre
    cateringCat = await prisma.category.findUnique({
      where: { name: cateringCategory },
      select: { id: true, name: true, isCateringCategory: true },
    });

    if (!cateringCat) {
      return res.status(400).json({ message: 'Invalid Catering Category' });
    }

    if (!cateringCat.isCateringCategory) {
      return res.status(400).json({
        message: 'Selected catering category is not marked as catering category',
      });
    }
  } else {
    // si no mandan categoría de catering, usamos la misma categoría normal
    cateringCat = { id: cat.id };
  }
}


    // 3) Imágenes
    const imageLeft = await generateImageData(imageLeftUrl);
    if (!imageLeft) {
      return res
        .status(400)
        .json({ message: 'Error to process left image' });
    }

    let imageRight;
    if (imageRightUrl) {
      const r = await generateImageData(imageRightUrl);
      if (!r) {
        return res
          .status(400)
          .json({ message: 'Error to process right image' });
      }
      imageRight = r;
    }

    // 4) Parsear options (grupos)
    let parsedOptions = [];
    try {
      parsedOptions = parseOptions(options);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    // Validar que los groupId existan (opcional pero recomendado)
    try {
      await validateOptionGroupsExist(parsedOptions);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

  let parsedCateringTiers = [];
try {
  const someCateringMode = !!hasCateringFlag || !!onlyForCateringFlag;
  parsedCateringTiers = parseCateringTiers(cateringTiers, someCateringMode);
} catch (e) {
  return res.status(400).json({ message: e.message });
}


    // 6) sortOrder del producto por categoría
    let sortOrderToUse;
    try {
      sortOrderToUse = await resolveProductSortOrder(cat.id, sortOrder);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    // 7) Crear en transacción para asegurar consistencia con sus opciones y tiers
    const created = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name,
          description: description || undefined,
          price: parseFloat(price),
          salePrice:
            salePrice != null ? parseFloat(salePrice) : undefined,
          specifications: specifications || undefined,
          category: { connect: { id: cat.id } },
           ...(cateringCat
      ? { cateringCategory: { connect: { id: cateringCat.id } } }
      : {}),
          imageLeft,
          imageRight,
          availability,
          type: type || undefined,
          status: status || undefined,
          isOptionItem: !!isOptionItem,
          packOptionSurcharge: packOptionSurcharge
            ? Number(packOptionSurcharge)
            : 0,
          packMaxItems:
            packMaxItems != null ? Number(packMaxItems) : undefined,
          sortOrder: sortOrderToUse,
          hasSpecifications: !!hasSpecifications,
          specificationsTitle: specificationsTitle || undefined,
         cateringName,
      cateringDescription,
      cateringMinQty,
      descriptionPriceCatering,
          hasCatering: !!hasCatering,
            onlyForCatering: onlyForCateringFlag,
        },
      });

      if (parsedOptions.length > 0) {
        await tx.productOption.createMany({
          data: parsedOptions.map((o) => ({
            productId: product.id,
            groupId: o.groupId,
            sortOrder: o.sortOrder,
          })),
        });
      }

      if (parsedCateringTiers.length > 0) {
        await tx.productCateringTier.createMany({
          data: parsedCateringTiers.map((t) => ({
            productId: product.id,
            minQty: t.minQty,
            maxQty: t.maxQty, // null = infinito
            price: t.price,
          })),
        });
      }

      // Devolver producto con categoría, opciones y tiers de catering
      const withRelations = await tx.product.findUnique({
        where: { id: product.id },
        include: {
          category: { select: { id: true, name: true } },
          options: {
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
                  showImages: true,
                  OptionValue: {
                    where: { isAvailable: true },
                    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
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
          cateringTiers: {
            orderBy: { minQty: 'asc' },
          },
        },
      });

      return withRelations;
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Error creando producto:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { handleCreateProduct };
