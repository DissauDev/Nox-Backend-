const { prisma } = require("../../lib/prisma");
const { z } = require("zod");

// Validación de query params (paginación por página/límite)
const getSchema = z.object({
  source: z.enum(["all", "products", "options"]).optional().default("all"),
  q: z.string().optional().default(""),

  // Productos
  pageProducts: z.coerce.number().int().min(1).optional().default(1),
  limitProducts: z.coerce.number().int().min(1).max(100).optional().default(10),

  // OptionValues (catálogo deduplicado)
  pageOptions: z.coerce.number().int().min(1).optional().default(1),
  limitOptions: z.coerce.number().int().min(1).max(100).optional().default(10),
});

function makePaging(total, page, limit) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const skip = (safePage - 1) * limit;
  const take = limit;
  return {
    meta: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasPrev: safePage > 1,
      hasNext: safePage < totalPages,
    },
    skip,
    take,
  };
}

// Dedup catálogo de OptionValue por (name, description, extraPrice)
function dedupeOptionsCatalog(rows) {
  const seen = new Set();
  const out = [];
  for (const o of rows) {
    const nameKey = (o.name ?? "").trim().toLowerCase();
    const descKey = (o.description ?? "").trim().toLowerCase();
    const priceKey = Number(o.extraPrice ?? 0).toFixed(2);
    const key = `${nameKey}|${descKey}|${priceKey}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(o);
    }
  }
  return out;
}

const optionSource = async (req, res) => {
  try {
    const params = getSchema.parse(req.query);
    const {
      source,
      q,
      pageProducts,
      limitProducts,
      pageOptions,
      limitOptions,
    } = params;

    const whereProduct = {
      isOptionItem: true,
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    };
    const whereOption = {
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    };

    // ----- Solo PRODUCTS (paginación directa en DB) -----
    if (source === "products") {
      const total = await prisma.product.count({ where: whereProduct });
      const { meta, skip, take } = makePaging(total, pageProducts, limitProducts);

      const items = await prisma.product.findMany({
        where: whereProduct,
        orderBy: { name: "asc" },
        skip,
        take,
        select: {
          id: true,
          name: true,
          price: true,
          packOptionSurcharge: true, // precio mostrado cuando es usado como opción
          description: true,
          isOptionItem: true,
          imageLeft: true,
        },
      });

      return res.json({
        source,
        products: {
          items,
          paging: meta,
        },
      });
    }

    // ----- Solo OPTIONS (CATÁLOGO DEDUP) -----
    if (source === "options") {
      // Traemos todas las OptionValue que matchean (sin paginar en DB)
      // y deduplicamos por (name, description, extraPrice).
      const all = await prisma.optionValue.findMany({
        where: whereOption,
        orderBy: [{ name: "asc" }, { extraPrice: "asc" }],
        select: {
          id: true,
          name: true,
          extraPrice: true,
          imageUrl: true,
          description: true,
          isAvailable: true,
          groupId: true,
          productRefId: true,
        },
      });

      const deduped = dedupeOptionsCatalog(all);
      const { meta, skip, take } = makePaging(deduped.length, pageOptions, limitOptions);
      const items = deduped.slice(skip, skip + take);

      return res.json({
        source,
        options: {
          items,
          paging: meta,
        },
      });
    }

    // ----- ALL (productos paginados; opciones en catálogo deduplicado) -----
    // Productos: paginación DB normal
    const totalProducts = await prisma.product.count({ where: whereProduct });
    const { meta: prodMeta, skip: pSkip, take: pTake } = makePaging(
      totalProducts,
      pageProducts,
      limitProducts
    );
    const products = await prisma.product.findMany({
      where: whereProduct,
      orderBy: { name: "asc" },
      skip: pSkip,
      take: pTake,
      select: {
        id: true,
        name: true,
        price: true,
        packOptionSurcharge: true,
        description: true,
        isOptionItem: true,
        imageLeft: true,
      },
    });

    // Opciones: catálogo deduplicado y luego paginado en memoria
    const allOptions = await prisma.optionValue.findMany({
      where: whereOption,
      orderBy: [{ name: "asc" }, { extraPrice: "asc" }],
      select: {
        id: true,
        name: true,
        extraPrice: true,
        imageUrl: true,
        description: true,
        isAvailable: true,
        groupId: true,
        productRefId: true,
      },
    });
    const dedupedOptions = dedupeOptionsCatalog(allOptions);
    const { meta: optMeta, skip: oSkip, take: oTake } = makePaging(
      dedupedOptions.length,
      pageOptions,
      limitOptions
    );
    const options = dedupedOptions.slice(oSkip, oSkip + oTake);

    return res.json({
      source,
      products: { items: products, paging: prodMeta },
      options: { items: options, paging: optMeta },
    });
  } catch (err) {
    return res.status(400).json({ message: err?.message || "Bad request" });
  }
};

module.exports = { optionSource };
