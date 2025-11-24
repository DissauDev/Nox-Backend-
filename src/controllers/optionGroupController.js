 const {prisma} = require('../lib/prisma');
const { optionSource } = require('./optionGroup/getAllOptions');
const { bulkAdd } = require('./optionGroup/postOpt&Pts');
 const {updateOptionValueSortOrder} = require('./optionGroup/optionSortValue');

async function createOptionGroup(req, res) {
  try {
    const {
      name,
      required,
      showImages,
      optionGroupIdToClone,
      maxSelectable,
      categoryId,
      minSelectable,
      selectionTitle
    } = req.body;

    // --- Normalización ligera ---
    const asBool = (v) => (typeof v === 'boolean' ? v : undefined);
    const asInt  = (v) => (v == null ? undefined : Number.parseInt(v, 10));

    const norm = {
      required: asBool(required),
      minSelectable: asInt(minSelectable),
      maxSelectable: asInt(maxSelectable),
    };

    // Si no viene showImages, toma el valor de `required` (si vino).
    // Esto preserva tu comportamiento: showImages ?? required
    const showImagesNorm =
      showImages !== undefined
        ? !!showImages
        : (norm.required !== undefined ? norm.required : undefined);

    const validateMinMax = (minVal, maxVal) => {
      if (minVal != null && maxVal != null && minVal > maxVal) {
        return 'minSelectable cannot be greater than maxSelectable';
      }
      return null;
    };

    // -------- 1) Crear desde categoría --------
    if (categoryId != null) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: {
          products: {
            where: { status: 'AVAILABLE', isOptionItem: true },
          },
        },
      });

      if (!category || category.products.length === 0) {
        return res.status(404).json({ message: 'No products found in this category' });
      }

      const data = {
        name: (name && String(name).trim()) || category.name,
        required: norm.required ?? true,
        showImages: showImagesNorm ?? (norm.required ?? true),
        minSelectable: norm.minSelectable ?? 1,
        maxSelectable: norm.maxSelectable ?? category.products.length,
        selectionTitle: selectionTitle ? String(selectionTitle).trim() : null,
        OptionValue: {
          create: category.products.map((p) => ({
            name: p.name,
            extraPrice: p.packOptionSurcharge ?? 0,
            imageUrl: p.imageLeft?.url ?? '',
            description: p.description ?? '',
            productRefId: p.id, // referencia al producto real
          })),
        },
      };

      const err = validateMinMax(data.minSelectable, data.maxSelectable);
      if (err) return res.status(400).json({ message: err });

      const optionGroup = await prisma.optionGroup.create({ data });
      return res.status(201).json(optionGroup);
    }

    // -------- 2) Clonar desde otro grupo --------
    if (optionGroupIdToClone != null) {
      const original = await prisma.optionGroup.findUnique({
        where: { id: optionGroupIdToClone },
        include: { OptionValue: true },
      });

      if (!original || original.OptionValue.length === 0) {
        return res.status(404).json({ message: 'No option values found in original group' });
      }

      const data = {
        name: (name && String(name).trim()) || `${original.name} Copy`,
        required: norm.required ?? original.required,
        selectionTitle: selectionTitle ? String(selectionTitle).trim() : original.selectionTitle,
        showImages: showImagesNorm ?? original.showImages ?? (norm.required ?? original.required),
        minSelectable: norm.minSelectable ?? original.minSelectable,
        maxSelectable: norm.maxSelectable ?? original.maxSelectable,
        OptionValue: {
          create: original.OptionValue.map((ov) => ({
            name: ov.name,
            extraPrice: ov.extraPrice ?? 0,
            imageUrl: ov.imageUrl ?? '',
            description: ov.description ?? '',
            productRefId: ov.productRefId ?? null,
          })),
        },
      };

      const err = validateMinMax(data.minSelectable, data.maxSelectable);
      if (err) return res.status(400).json({ message: err });

      const newGroup = await prisma.optionGroup.create({ data });
      return res.status(201).json(newGroup);
    }

    // -------- 3) Creación simple --------
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const data = {
      name: String(name).trim(),
      required: norm.required ?? false,
      selectionTitle: selectionTitle ? String(selectionTitle).trim() : null,
      showImages: showImagesNorm ?? (norm.required ?? false),
      minSelectable: norm.minSelectable, // si no viene, Prisma usa el default del schema
      maxSelectable: norm.maxSelectable,
    };

    const err = validateMinMax(data.minSelectable, data.maxSelectable);
    if (err) return res.status(400).json({ message: err });

    const group = await prisma.optionGroup.create({ data });
    return res.status(201).json(group);
  } catch (err) {
    console.error('Error creating option group:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllOptionGroups(req, res) {
  try {
    const groups = await prisma.optionGroup.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { OptionValue: true, productOptions: true } },
      },
    });
    return res.json(groups);
  } catch (err) {
    console.error('Error fetching option groups:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOptionGroupById(req, res) {
  try {
    const { groupId } = req.params;
    const group = await prisma.optionGroup.findUnique({
      where: { id: groupId },
      include: {
        OptionValue: true,
        productOptions: { select: { id: true, productId: true } },
      },
    });
    if (!group) return res.status(404).json({ message: 'Option group not found' });
    return res.json(group);
  } catch (err) {
    console.error('Error fetching option group:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// controllers/optionGroupController.js
async function updateOptionGroup(req, res) {
  try {
    const { groupId } = req.params;
    const {
      name,
      required,
      showImages,
      minSelectable,
      maxSelectable,
      selectionTitle
    } = req.body ?? {};

    // Validación: si llegan ambos, min <= max
    if (
      minSelectable !== undefined &&
      maxSelectable !== undefined &&
      Number(minSelectable) > Number(maxSelectable)
    ) {
      return res.status(400).json({ message: 'minSelectable cannot be greater than maxSelectable' });
    }

    const updated = await prisma.optionGroup.update({
      where: { id: groupId },
      data: {
        ...(name !== undefined && { name }),
        ...(selectionTitle !== undefined && {selectionTitle}),
        ...(required !== undefined && { required: Boolean(required) }),
        ...(showImages !== undefined && { showImages: Boolean(showImages) }),
        ...(minSelectable !== undefined && { minSelectable: Number(minSelectable) }),
        ...(maxSelectable !== undefined && { maxSelectable: Number(maxSelectable) }),
      },
    });

    return res.json(updated);
  } catch (err) {
    // Si no existe: Prisma lanza P2025
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'OptionGroup not found' });
    }
    console.error('Error updating option group:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function deleteOptionGroup(req, res) {
  try {
    const { groupId } = req.params;

    await prisma.$transaction(async (tx) => {
      await tx.productOptionValue.deleteMany({
        where: { productOption: { groupId } },
      });

      await tx.productOption.deleteMany({ where: { groupId } });

      await tx.optionValue.deleteMany({ where: { groupId } });

      // Lanzará P2025 si el grupo no existe (provoca rollback)
      await tx.optionGroup.delete({ where: { id: groupId } });
    });

    return res.json({ success: true });
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'Option group not found' });
    }
    console.error('Error deleting option group:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// --- OptionValues CRUD ---

async function createOptionValue(req, res) {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      return res.status(400).json({ message: 'Missing groupId' });
    }

    const {
      name,
      extraPrice,
      imageUrl,
      description,
      productRefId, // opcional: cuando el OptionValue representa un producto real
    } = req.body || {};

    const trimmedName = (name || '').trim();
    if (!trimmedName) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Verifica que el grupo exista
    const group = await prisma.optionGroup.findUnique({
      where: { id: groupId },
      select: { id: true },
    });
    if (!group) {
      return res.status(404).json({ message: 'Option group not found' });
    }

    // Parseo y validación de extraPrice
    const price =
      extraPrice === '' || extraPrice == null ? 0 : Number(extraPrice);
    if (!Number.isFinite(price) || price < 0) {
      return res
        .status(400)
        .json({ message: 'extraPrice must be a non-negative number' });
    }

    // Evitar duplicados por nombre dentro del mismo grupo (sensible a mayúsculas/minúsculas)
    const duplicated = await prisma.optionValue.findFirst({
      where: { groupId, name: trimmedName },
      select: { id: true },
    });
    if (duplicated) {
      return res
        .status(409)
        .json({ message: 'An option value with this name already exists in the group' });
    }

    const value = await prisma.optionValue.create({
      data: {
        name: trimmedName,
        extraPrice: price,
        imageUrl: imageUrl || undefined,
        description: description ?? undefined,
        // usar relación para que falle si el grupo no existe
        group: { connect: { id: groupId } },
        // opcional: vincular a un producto real si te lo mandan
        productRefId: productRefId ?? undefined,
      },
    });

    return res.status(201).json(value);
  } catch (err) {
    console.error('Error creating option value:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getAllOptionValues(req, res) {
  try {
    const { groupId } = req.params;
    const { onlyAvailable } = req.query;

    const where = { groupId };
    if (String(onlyAvailable) === 'true') where.isAvailable = true;

    const values = await prisma.optionValue.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
    });

    return res.json(values);
  } catch (err) {
    console.error('Error fetching option values:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getOptionValueById(req, res) {
  try {
    const { valueId } = req.params;

    const value = await prisma.optionValue.findUniqueOrThrow({
      where: { id: valueId },
    });

    return res.json(value);
  } catch (err) {
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'Option value not found' });
    }
    console.error('Error fetching option value:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// PUT /option-group/:groupId/values/:valueId
async function updateOptionValue(req, res) {
  try {
    const { valueId } = req.params;
    if (!valueId) return res.status(400).json({ message: 'Missing valueId' });

    // Validaciones ligeras sin ir a BD
    const {
      name,
      extraPrice,
      imageUrl,
      description,
      isAvailable,
      productRefId,
    } = req.body || {};

    const data = {};

    if (name !== undefined) {
      const trimmed = String(name).trim();
      if (!trimmed) return res.status(400).json({ message: 'Name cannot be empty' });
      data.name = trimmed;
    }

    if (extraPrice !== undefined) {
      const n = Number(extraPrice);
      if (!Number.isFinite(n) || n < 0) {
        return res.status(400).json({ message: 'extraPrice must be a non-negative number' });
      }
      data.extraPrice = n;
    }

    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
    if (description !== undefined) data.description = description ?? null;
    if (isAvailable !== undefined) data.isAvailable = !!isAvailable;
    if (productRefId !== undefined) data.productRefId = productRefId || null;

    const updated = await prisma.optionValue.update({
      where: { id: valueId },
      data,
    });

    return res.json(updated);
  } catch (err) {
    // Mapea errores de Prisma → HTTP
    // P2025: record not found
    // P2002: unique constraint violation (útil si defines @@unique([groupId, name]))
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'Option value not found' });
    }
    if (err?.code === 'P2002') {
      return res.status(409).json({ message: 'An option value with this name already exists' });
    }

    console.error('Error updating option value:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE /option-group/:groupId/values/:valueId
async function deleteOptionValue(req, res) {
  try {
    const { valueId } = req.params;
    if (!valueId) return res.status(400).json({ message: 'Missing valueId' });

    // Borra dependencias primero (idempotente/rápido; no falla si no existen)
    await prisma.productOptionValue.deleteMany({ where: { valueId } });

    // Borra el valor → si no existe, Prisma lanza P2025
    await prisma.optionValue.delete({ where: { id: valueId } });

    return res.status(204).send();
  } catch (err) {
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'Option value not found' });
    }
    console.error('Error deleting option value:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /api/options/from-category
async function createGroupFromCategory(req, res) {
  try {
    const {
      categoryId,
      groupName,
      required = true,
      minSelectable = 1,
      maxSelectable,           // si no viene, se calcula
      showImages,              // si no viene, se deriva de `required`
    } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: 'categoryId is required' });
    }

    // Validación de rangos si llegan ambos
    if (maxSelectable != null && Number(minSelectable) > Number(maxSelectable)) {
      return res.status(400).json({ message: 'minSelectable cannot be greater than maxSelectable' });
    }

    // Trae SOLO productos elegibles desde BD
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: {
          where: { status: 'AVAILABLE', isOptionItem: true },
          select: {
            id: true,
            name: true,
            description: true,
            imageLeft: true,
            packOptionSurcharge: true,
          },
        },
      },
    });

    if (!category || category.products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    const eligible = category.products;
    const resolvedMax = maxSelectable ?? eligible.length;

    // Crea OptionValue a partir de cada producto elegible
    const valuesToCreate = eligible.map((p) => ({
      name: p.name,
      extraPrice: p.packOptionSurcharge ?? 0,
      imageUrl: p.imageLeft?.url ?? '',
      description: p.description ?? '',
      productRefId: p.id,
    }));

    const group = await prisma.optionGroup.create({
      data: {
        name: groupName || category.name,
        required: !!required,
        minSelectable: Number(minSelectable),
        maxSelectable: Number(resolvedMax),
        showImages: showImages ?? !!required,
        OptionValue: { create: valuesToCreate },
      },
    });

    return res.status(201).json(group);
  } catch (err) {
    console.error('Error al crear OptionGroup desde categoría:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function patchOptionValueStatus(req, res) {
  try {
    const { valueId } = req.params;
    const { isAvailable } = req.body;

    if (typeof isAvailable !== 'boolean') {
      return res.status(400).json({ message: 'isAvailable must be boolean' });
    }

    const updated = await prisma.optionValue.update({
      where: { id: valueId },
      data: { isAvailable },
    });

    return res.json(updated);
  } catch (err) {
    // Si no existe ese valueId
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'Option value not found' });
    }
    console.error('Error patching option value status:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function bulkUpdateOptionValuesStatus(req, res) {
  try {
    const { isAvailable, name } = req.body;

    // Validación básica
    if (typeof isAvailable !== 'boolean') {
      return res.status(400).json({ message: 'isAvailable must be boolean' });
    }
    if (!name || (Array.isArray(name) && name.length === 0)) {
      return res.status(400).json({ message: 'Provide name (string or string[])' });
    }

    // Normaliza entrada
    const names = Array.isArray(name) ? name : [name];
    const cleanNames = names
      .map(n => (typeof n === 'string' ? n.trim() : ''))
      .filter(Boolean);

    if (cleanNames.length === 0) {
      return res.status(400).json({ message: 'Provide name (string or string[])' });
    }

    const idsRows = await prisma.$queryRaw`
      WITH q(n) AS (
        SELECT lower(btrim(x)) FROM unnest(${cleanNames}::text[]) AS x
      )
      SELECT ov.id
      FROM "OptionValue" ov
      WHERE lower(btrim(ov.name)) IN (SELECT n FROM q);
    `;

    const ids = idsRows.map(r => r.id);
    if (ids.length === 0) {
      // No hay coincidencias; devolver 0 de forma explícita
      return res.json({ count: 0, note: 'No matches found for provided name(s)' });
    }

    // Un solo updateMany por IDs
    const result = await prisma.optionValue.updateMany({
      where: { id: { in: ids } },
      data: { isAvailable },
    });

    return res.json({ count: result.count });
  } catch (err) {
    console.error('Error bulk updating option value status:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function bulkCloneOptionValue(req, res) {
  try {
    const {
      sourceValueId,
      template,
      targetGroupIds = [],
      onConflict = 'skip',
      matchBy = 'name',
    } = req.body || {};

    if (!Array.isArray(targetGroupIds) || targetGroupIds.length === 0) {
      return res.status(400).json({ message: 'targetGroupIds is required' });
    }
    if (!['skip', 'overwrite'].includes(onConflict)) {
      return res.status(400).json({ message: 'onConflict must be "skip" or "overwrite"' });
    }
    if (!['name', 'productRefId'].includes(matchBy)) {
      return res.status(400).json({ message: 'matchBy must be "name" or "productRefId"' });
    }

    // Resuelve base (source o template)
    let base = null;
    if (sourceValueId) {
      const src = await prisma.optionValue.findUnique({ where: { id: sourceValueId } });
      if (!src) return res.status(404).json({ message: 'Source OptionValue not found' });
      base = {
        name: src.name,
        extraPrice: src.extraPrice,
        imageUrl: src.imageUrl,
        description: src.description,
        productRefId: src.productRefId ?? null,
        isAvailable: true,
      };
    } else if (template && template.name) {
      base = {
        name: template.name,
        extraPrice: template.extraPrice ?? 0,
        imageUrl: template.imageUrl ?? null,
        description: template.description ?? '',
        productRefId: template.productRefId ?? null,
        isAvailable: true,
      };
    } else {
      return res.status(400).json({
        message: 'Provide either sourceValueId or template.name (with targetGroupIds)',
      });
    }

    // Ejecutamos en transacción para consistencia si hay conflictos concurrentes
    const result = await prisma.$transaction(async (tx) => {
      let created = 0, updated = 0, skipped = 0;
      const results = [];

      for (const groupId of targetGroupIds) {
        let existing = null;

        if (matchBy === 'productRefId' && base.productRefId) {
          existing = await tx.optionValue.findFirst({
            where: { groupId, productRefId: base.productRefId },
          });
        } else {
          // por nombre, case-insensitive
          existing = await tx.optionValue.findFirst({
            where: { groupId, name: { equals: base.name, mode: 'insensitive' } },
          });
        }

        if (existing) {
          if (onConflict === 'overwrite') {
            const upd = await tx.optionValue.update({
              where: { id: existing.id },
              data: {
                name: base.name,
                extraPrice: base.extraPrice,
                imageUrl: base.imageUrl,
                description: base.description,
                productRefId: existing.productRefId ?? base.productRefId,
                isAvailable: base.isAvailable,
              },
            });
            updated++;
            results.push({ groupId, action: 'updated', valueId: upd.id });
          } else {
            skipped++;
            results.push({ groupId, action: 'skipped', valueId: existing.id });
          }
        } else {
          const createdRow = await tx.optionValue.create({
            data: {
              groupId,
              name: base.name,
              extraPrice: base.extraPrice,
              imageUrl: base.imageUrl,
              description: base.description,
              productRefId: base.productRefId,
              isAvailable: base.isAvailable,
            },
          });
          created++;
          results.push({ groupId, action: 'created', valueId: createdRow.id });
        }
      }

      return { created, updated, skipped, results };
    });

    return res.json(result);
  } catch (err) {
    // Errores FK u otros de Prisma -> 400 razonable
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: err.message });
    }
    console.error('Error bulk cloning option values:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function cloneOptionValueToGroup(req, res) {
  try {
    const { valueId } = req.params;
    const { targetGroupId, override = {} } = req.body || {};

    // Validaciones tempranas
    if (!targetGroupId || typeof targetGroupId !== 'string') {
      return res.status(400).json({ message: 'targetGroupId is required' });
    }
    if (override && typeof override !== 'object') {
      return res.status(400).json({ message: 'override must be an object if provided' });
    }

    // Cargar fuente y objetivo (usamos findUnique para no mapear P2025 manualmente)
    const source = await prisma.optionValue.findUnique({ where: { id: valueId } });
    if (!source) return res.status(404).json({ message: 'Source OptionValue not found' });

    const targetGroup = await prisma.optionGroup.findUnique({ where: { id: targetGroupId } });
    if (!targetGroup) return res.status(404).json({ message: 'Target group not found' });

    // Sanitizar override (solo campos permitidos)
    const nextName        = override.name ?? source.name;
    const nextExtraPrice  = override.extraPrice != null ? Number(override.extraPrice) : source.extraPrice;
    const nextImageUrl    = override.imageUrl ?? source.imageUrl ?? null;
    const nextDescription = override.description ?? source.description ?? '';

    // Crear clon
    const cloned = await prisma.optionValue.create({
      data: {
        groupId: targetGroupId,
        name: nextName,
        extraPrice: Number.isFinite(nextExtraPrice) ? nextExtraPrice : 0,
        imageUrl: nextImageUrl,
        description: nextDescription,
        // conserva referencia si existe
        productRefId: source.productRefId ?? null,
        isAvailable: true, // comportamiento por defecto (puedes heredar de source si prefieres)
      }
    });

    return res.status(201).json(cloned);
  } catch (err) {
    // Mapeo de errores frecuentes de Prisma
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // P2003: FK; no debería pasar porque validamos group y source
      return res.status(400).json({ message: err.message });
    }
    console.error('Error cloning option value:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

 async function bulkDeleteOptionValuesByName(req, res) {
  try {
    const { name, dryRun = false } = req.body || {};
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Provide "name" string' });
    }
    const needle = name.trim();
    if (!needle) {
      return res.status(400).json({ message: 'Provide non-empty "name"' });
    }

    // 1) Busca candidatos por nombre case-insensitive
    const candidates = await prisma.optionValue.findMany({
      where: { name: { equals: needle, mode: 'insensitive' } },
      select: { id: true, name: true, groupId: true, productRefId: true },
    });

    if (candidates.length === 0) {
      return res.json({ count: 0, note: `No matches for "${needle}"`, matches: [] });
    }

    if (dryRun) {
      // Solo mostrar qué se eliminaría
      return res.json({
        dryRun: true,
        wouldDelete: {
          optionValueCount: candidates.length,
        },
        matches: candidates,
      });
    }

    const ids = candidates.map(c => c.id);

    // 2) Borra en transacción: primero la tabla puente, luego OptionValue
    const [delLinks, delValues] = await prisma.$transaction([
      prisma.productOptionValue.deleteMany({ where: { valueId: { in: ids } } }),
      prisma.optionValue.deleteMany({ where: { id: { in: ids } } }),
    ]);

    return res.json({
      deleted: {
        productOptionValueCount: delLinks.count,
        optionValueCount: delValues.count,
      },
      name: needle,
    });
  } catch (err) {
    console.error('Error bulk deleting by name:', err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

 const sortOptionValues = updateOptionValueSortOrder;
 const getAllOptValandPtslikeOpt = optionSource;
 const bulkAddonGroups = bulkAdd;

module.exports = {
  createOptionGroup,
  getAllOptionGroups,
  getOptionGroupById,
  updateOptionGroup,
  deleteOptionGroup,
  createOptionValue,
  getAllOptionValues,
  bulkCloneOptionValue,
  getOptionValueById,
  updateOptionValue,
  deleteOptionValue,
  bulkAddonGroups,
  createGroupFromCategory,
  patchOptionValueStatus,
  bulkUpdateOptionValuesStatus,
  cloneOptionValueToGroup,
  bulkDeleteOptionValuesByName,
  getAllOptValandPtslikeOpt,
  sortOptionValues
};
