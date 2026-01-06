// src/controllers/menuController.js (por ejemplo)
const { prisma } = require("../lib/prisma");

function availabilityWhereForOrderType(orderType) {
  // default: no filtrar (asumimos BOTH)
  if (!orderType) return undefined;

  const t = String(orderType).toLowerCase();

  if (t === "pickup") {
    return { in: ["PICKUP_ONLY", "BOTH"] };
  }
  if (t === "delivery") {
    return { in: ["DELIVERY_ONLY", "BOTH"] };
  }
  if (t === "both") {
    return { in: ["BOTH", "DELIVERY_ONLY", "PICKUP_ONLY"] };
  }

  // si llega algo raro, no filtramos (o podrías lanzar 400)
  return undefined;
}

async function getMenu(req, res) {
  try {
    const orderType = req.query.orderType; // "pickup" | "delivery" | "both"

    // 1) Categorías disponibles
    const dbCategories = await prisma.category.findMany({
      where: { status: "AVAILABLE" },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        shortDescription: true,
        longDescription: true,
      },
    });

    const availabilityFilter = availabilityWhereForOrderType(orderType);

    // 2) Productos (con categoría normal + catering + opciones + tiers)
    const products = await prisma.product.findMany({
      where: {
        status: "AVAILABLE",
        categoryId: { in: dbCategories.map((c) => c.id) },
        ...(availabilityFilter ? { availability: availabilityFilter } : {}),
      },
      include: {
        // categoría normal (para el item regular)
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        // opciones (para saber si tiene required options)
        options: {
          include: { group: true },
        },
        // categoría de catering (para el item catering)
        cateringCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        // rangos de catering
        cateringTiers: {
          orderBy: { minQty: "asc" },
          select: {
            minQty: true,
            maxQty: true,
            price: true,
          },
        },
      },
      orderBy: [
        { category: { sortOrder: "asc" } },
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

    // 3) Construimos items de menú por categoría
    const itemsByCategoryId = {};

    for (const p of products) {
      // ---------- ITEM REGULAR ----------
      const shouldShowRegular =
        !p.hasCatering || // no tiene catering
        (p.hasCatering && !p.onlyForCatering); // tiene catering pero también se vende normal

      if (shouldShowRegular) {
        const parsedOptions = p.options.map((opt) => {
          const group = opt.group;
          return {
            id: group.id,
            name: group.name,
            required: group.required,
            minSelectable: group.minSelectable,
            maxSelectable: group.maxSelectable,
          };
        });

        const hasRequiredOptions = parsedOptions.some((opt) => opt.required);

        const regularItem = {
          id: p.id,
          imageLeft: p.imageLeft,
          imageRight: p.imageRight || undefined,
          name: p.name,
          description: p.description,
          price: p.price,
          salePrice: p.salePrice,
          status: p.status,
          categoryId: p.category.id,
          category: p.category.name,
          availability: p.availability,

          options: parsedOptions,
          hasRequiredOptions,

          // flags / datos de catering (el producto en sí puede tener catering,
          // aunque este item sea el "regular")
          hasCatering: p.hasCatering,
          onlyForCatering: p.onlyForCatering,
          cateringMinQty: p.cateringMinQty,
          descriptionPriceCatering: p.descriptionPriceCatering || null,
          cateringTiers: [], // en el item regular no usamos los rangos
          isCateringItem: false,
        };

        (itemsByCategoryId[p.category.id] ??= []).push(regularItem);
      }

      // ---------- ITEM CATERING ----------
      if (p.hasCatering) {
        // categoría de catering (o fallback a la normal si no se configuró)
        const cateringCatId = p.cateringCategoryId || p.category.id;
        const cateringCatName =
          p.cateringCategory?.name || p.category.name;

        const tiers = (p.cateringTiers || []).slice().sort((a, b) => a.minQty - b.minQty);

        let priceLabel = p.descriptionPriceCatering || null;
        if (!priceLabel && tiers.length > 0) {
          const first = tiers[0];
    

          priceLabel = `From $${first.price.toFixed(2)} each`;
        }

        const cateringItem = {
          id: p.id,
          imageLeft: p.imageLeft,
          imageRight: p.imageRight || undefined,
          name: p.cateringName || p.name,
          description: p.cateringDescription || p.description,
          price: p.price,        // el cálculo real lo hace el front con tiers
          salePrice: p.salePrice,
          status: p.status,
          categoryId: cateringCatId,
          category: cateringCatName,
          availability: p.availability,

          // si quieres, el catering se trata como sin options requeridas en la card
          options: [],
          hasRequiredOptions: false,

          hasCatering: p.hasCatering,
          onlyForCatering: p.onlyForCatering,
          cateringMinQty: p.cateringMinQty,
          descriptionPriceCatering: priceLabel,
          cateringTiers: tiers.map((t) => ({
            minQty: t.minQty,
            maxQty: t.maxQty,
            price: t.price,
          })),
          isCateringItem: true,
        };

        (itemsByCategoryId[cateringCatId] ??= []).push(cateringItem);
      }
    }

    // 4) Construimos el menú final a partir de las categorías
    const menu = dbCategories
      .map((cat) => ({
        category: cat.name,
        shortDescription: cat.shortDescription,
        longDescription: cat.longDescription,
        items: itemsByCategoryId[cat.id] || [],
      }))
      // solo categorías con productos
      .filter((cat) => cat.items.length > 0);

    return res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({ message: "Error to get Menu" });
  }
}

module.exports = { getMenu };
