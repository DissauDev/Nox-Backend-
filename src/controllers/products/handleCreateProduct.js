
const { prisma } = require('../../lib/prisma');
const {generateImageData} = require('../../middlewares/generateImageData');

async function handleCreateProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      salePrice,
      specifications,
      options,          // string | string[] | { groupId: string; sortOrder?: number }[]
      category,         // category name
      imageLeftUrl,
      imageRightUrl,
      type,
      status,
      isOptionItem,
      packOptionSurcharge,
      packMaxItems,
      sortOrder,
       hasSpecifications,
       specificationsTitle         // del producto (por categoría)
    } = req.body;

    // 1) Unicidad por name
    const existing = await prisma.product.findUnique({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: 'There is a product whit same name' });
    }

    // 2) Validar categoría por nombre
    const cat = await prisma.category.findUnique({ where: { name: category } });
    if (!cat) {
      return res.status(400).json({ message: 'Invalid Category' });
    }

    // 3) Imágenes
    const imageLeft = await generateImageData(imageLeftUrl);
    if (!imageLeft) {
      return res.status(400).json({ message: 'Error to process left image' });
    }
    let imageRight = undefined;
    if (imageRightUrl) {
      const r = await generateImageData(imageRightUrl);
      if (!r) return res.status(400).json({ message: 'Error to process right image' });
      imageRight = r;
    }

    // 4) Parsear options (grupos) y normalizar a { groupId, sortOrder }
    //    Acepta: string JSON | string[] | {groupId, sortOrder?}[]
    let parsedOptions = [];
    if (options != null) {
      let raw = options;
      if (typeof raw === 'string') {
        try {
          raw = JSON.parse(raw);
        } catch {
          return res.status(400).json({ message: 'Field options must be valid JSON' });
        }
      }
      if (Array.isArray(raw)) {
        if (raw.length > 0 && typeof raw[0] === 'string') {
          // string[]
          parsedOptions = (raw).map((groupId, idx) => ({
            groupId,
            sortOrder: idx + 1, // 1-based por orden recibido
          }));
        } else {
          // { groupId, sortOrder? }[]
          parsedOptions = (raw).map(
            (o, idx) => ({
              groupId: o.groupId,
              sortOrder:
                Number.isInteger(o.sortOrder) && (o.sortOrder) >= 1
                  ? (o.sortOrder)
                  : idx + 1, // fallback: posición del array (1-based)
            })
          );
        }
      } else {
        return res.status(400).json({ message: 'Field options must be an array' });
      }
    }

    // Validar que los groupId existan (opcional pero recomendado)
    if (parsedOptions.length > 0) {
      const ids = parsedOptions.map((o) => o.groupId);
      const found = await prisma.optionGroup.findMany({
        where: { id: { in: ids }, isAvailable: true },
        select: { id: true },
      });
      const foundSet = new Set(found.map((g) => g.id));
      const missing = ids.filter((id) => !foundSet.has(id));
      if (missing.length > 0) {
        return res.status(400).json({ message: `Invalid option group(s): ${missing.join(', ')}` });
      }
    }

    // 5) sortOrder del producto por categoría
    let sortOrderToUse;
    const sortStr = typeof sortOrder === 'string' ? sortOrder.trim() : sortOrder;
    if (sortStr === undefined || sortStr === null || sortStr === '' || sortStr === '0') {
      const agg = await prisma.product.aggregate({
        where: { categoryId: cat.id },
        _max: { sortOrder: true },
      });
      sortOrderToUse = (agg._max.sortOrder ?? 0) + 1; // coloca al final (1-based)
    } else {
      const n = Number(sortOrder);
      if (!Number.isInteger(n) || n < 0) {
        return res.status(400).json({ message: 'sortOrder must be a non-negative integer' });
      }
      sortOrderToUse = n; // se respeta aunque colisione
    }

    // 6) Crear en transacción para asegurar consistencia con sus opciones
    const created = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name,
          description: description || undefined,
          price: parseFloat(price),
          salePrice: salePrice != null ? parseFloat(salePrice) : undefined,
          specifications: specifications || undefined,
          category: { connect: { id: cat.id } },
          imageLeft,
          imageRight,
          type: type || undefined,
          status: status || undefined,
          isOptionItem: !!isOptionItem,
          packOptionSurcharge: packOptionSurcharge ? Number(packOptionSurcharge) : 0,
          packMaxItems: packMaxItems != null ? Number(packMaxItems) : undefined,
          sortOrder: sortOrderToUse,
          hasSpecifications: !!hasSpecifications,
          specificationsTitle: specificationsTitle || undefined,
        },
      });

      if (parsedOptions.length > 0) {
        // Crear relaciones ProductOption respetando sortOrder recibido
        await tx.productOption.createMany({
          data: parsedOptions.map((o) => ({
            productId: product.id,
            groupId: o.groupId,
            sortOrder: o.sortOrder, // ya normalizado arriba (≥1)
          })),
        });
      }

      // (Opcional) devolver ya con opciones ordenadas
      const withOptions = await tx.product.findUnique({
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
        },
      });

      return withOptions;
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Error creando producto:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { handleCreateProduct };