const { prisma } = require("../../lib/prisma");
const { z } = require("zod");

const ItemProductSchema = z.object({
  type: z.literal("product"),
  id: z.string().uuid(), // productId
  name: z.string().min(1).optional(),
  extraPrice: z.number().nonnegative().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

const ItemOptionSchema = z.object({
  type: z.literal("optionValue"),
  id: z.string().uuid(), // optionValueId a clonar
  override: z
    .object({
      name: z.string().min(1).optional(),
      extraPrice: z.number().nonnegative().optional(),
      description: z.string().optional(),
      imageUrl: z.string().url().optional(),
    })
    .optional(),
});

const bulkAddSchema = z.object({
  items: z.array(z.union([ItemProductSchema, ItemOptionSchema])).min(1),
  skipExisting: z.boolean().optional().default(true),
});

const bulkAdd = async (req, res) => {
  try {
    const { groupId } = z.object({ groupId: z.string().uuid() }).parse(req.params);
    const body = bulkAddSchema.parse(req.body);

    // Validar grupo
    const group = await prisma.optionGroup.findUnique({
      where: { id: groupId },
      select: { id: true, isAvailable: true, name: true },
    });
    if (!group) return res.status(404).json({ message: "OptionGroup not found" });
    if (!group.isAvailable) {
      return res.status(400).json({ message: "OptionGroup is not available" });
    }

    // Existentes del grupo (para prevenir duplicados)
    const existing = await prisma.optionValue.findMany({
      where: { groupId },
      select: { id: true, name: true, productRefId: true },
    });
    const existsByName = new Set(existing.map((e) => `${e.name}`.trim().toLowerCase()));
    const existsByProd = new Set(existing.map((e) => e.productRefId).filter(Boolean));

    // Cargar fuentes
    const productIds = body.items.filter((i) => i.type === "product").map((i) => i.id);
    const optionValIds = body.items.filter((i) => i.type === "optionValue").map((i) => i.id);

    const [products, optionVals] = await Promise.all([
      productIds.length
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: {
              id: true,
              name: true,
              isOptionItem: true,
              packOptionSurcharge: true,
              description: true,
              imageLeft: true,
            },
          })
        : Promise.resolve([]),
      optionValIds.length
        ? prisma.optionValue.findMany({
            where: { id: { in: optionValIds } },
            select: {
              id: true,
              name: true,
              extraPrice: true,
              imageUrl: true,
              description: true,
              productRefId: true,
            },
          })
        : Promise.resolve([]),
    ]);

    const productMap = new Map(products.map((p) => [p.id, p]));
    const optValMap = new Map(optionVals.map((o) => [o.id, o]));

    const ops = [];
    const skipped = []; // ← acumulador de omitidos

    for (const item of body.items) {
      if (item.type === "product") {
        const p = productMap.get(item.id);
        if (!p) {
          skipped.push({ type: "product", id: item.id, reason: "NOT_FOUND" });
          continue;
        }
        if (!p.isOptionItem) {
          skipped.push({ type: "product", id: item.id, reason: "NOT_OPTION_ITEM" });
          continue;
        }

        const name = (item.name ?? p.name).trim();
        const nameKey = name.toLowerCase();
        const extra = item.extraPrice ?? p.packOptionSurcharge ?? 0;
        const desc = item.description ?? p.description ?? "";
        const img = item.imageUrl ?? undefined;

        if (body.skipExisting) {
          if (existsByName.has(nameKey)) {
            skipped.push({ type: "product", id: item.id, reason: "DUPLICATE_NAME" });
            continue;
          }
          if (p.id && existsByProd.has(p.id)) {
            skipped.push({ type: "product", id: item.id, reason: "DUPLICATE_PRODUCT_REF" });
            continue;
          }
        }

        ops.push(
          prisma.optionValue.create({
            data: {
              groupId,
              name,
              extraPrice: extra,
              description: desc,
              imageUrl: img,
              productRefId: p.id,
            },
            select: { id: true, name: true, extraPrice: true, productRefId: true },
          })
        );

        // actualizar sets para evitar duplicados en el mismo lote
        existsByName.add(nameKey);
        existsByProd.add(p.id);
      } else {
        // optionValue -> clonar
        const src = optValMap.get(item.id);
        if (!src) {
          skipped.push({ type: "optionValue", id: item.id, reason: "NOT_FOUND" });
          continue;
        }

        const name = (item.override?.name ?? src.name).trim();
        const nameKey = name.toLowerCase();
        const extra = item.override?.extraPrice ?? src.extraPrice ?? 0;
        const desc = item.override?.description ?? src.description ?? "";
        const img = item.override?.imageUrl ?? src.imageUrl ?? undefined;
        const ref = src.productRefId ?? undefined;

        if (body.skipExisting) {
          if (existsByName.has(nameKey)) {
            skipped.push({ type: "optionValue", id: item.id, reason: "DUPLICATE_NAME" });
            continue;
          }
          if (ref && existsByProd.has(ref)) {
            skipped.push({ type: "optionValue", id: item.id, reason: "DUPLICATE_PRODUCT_REF" });
            continue;
          }
        }

        ops.push(
          prisma.optionValue.create({
            data: {
              groupId,
              name,
              extraPrice: extra,
              description: desc,
              imageUrl: img,
              productRefId: ref,
            },
            select: { id: true, name: true, extraPrice: true, productRefId: true },
          })
        );

        existsByName.add(nameKey);
        if (ref) existsByProd.add(ref);
      }
    }

    const created = ops.length ? await prisma.$transaction(ops) : [];
    const { name } = group;

    return res.status(201).json({
      groupId,
      name,
      requestedCount: body.items.length, // total solicitado
      createdCount: created.length,
      skippedCount: skipped.length,
  
    });
  } catch (err) {
    const message = err?.issues?.[0]?.message || err?.message || "Bad request";
    console.log(err);
    return res.status(400).json({ message });
  }
};

module.exports = { bulkAdd };
