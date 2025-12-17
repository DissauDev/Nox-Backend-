const { prisma } = require("../lib/prisma");

function availabilityWhereForOrderType(orderType) {
  // default: no filtrar (o asumir BOTH)
  if (!orderType) return undefined;

  const t = String(orderType).toLowerCase();

  if (t === "pickup") {
    return { in: ["PICKUP_ONLY", "BOTH"] };
  }
  if (t === "delivery") {
    return { in: ["DELIVERY_ONLY", "BOTH"] };
  }
   if (t === "both") {
    return { in: ["BOTH","DELIVERY_ONLY","PICKUP_ONLY"] };
  }

  // si llega algo raro, no filtramos (o puedes tirar 400)
  return undefined;
}

async function getMenu(req, res) {
  try {
    const orderType = req.query.orderType; // "pickup" | "delivery"

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

    const products = await prisma.product.findMany({
      where: {
        status: "AVAILABLE",
        categoryId: { in: dbCategories.map((c) => c.id) },

        ...(availabilityFilter
          ? { availability: availabilityFilter }
          : {}),
      },
      include: {
        options: {
          include: { group: true },
        },
      },
      orderBy: [
        { category: { sortOrder: "asc" } },
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

    const grouped = products.reduce((acc, prod) => {
      (acc[prod.categoryId] ??= []).push(prod);
      return acc;
    }, {});

    const menu = dbCategories
      .map((cat) => ({
        category: cat.name,
        shortDescription: cat.shortDescription,
        longDescription: cat.longDescription,
        items: (grouped[cat.id] || []).map((p) => {
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

          return {
            id: p.id,
            imageLeft: p.imageLeft,
            imageRight: p.imageRight || undefined,
            name: p.name,
            description: p.description,
            price: p.price,
            salePrice: p.salePrice,
            status: p.status,
            category: cat.name,
            availability: p.availability, // ✅ útil para debug / UI
            options: parsedOptions,
            hasRequiredOptions,
          };
        }),
      }))
      .filter((cat) => cat.items.length > 0);

    return res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({ message: "Error to get Menu" });
  }
}

module.exports = { getMenu };
