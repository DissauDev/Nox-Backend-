// controllers/options/updateOptionValueSortOrder.js
const { prisma } = require("../../lib/prisma");

const updateOptionValueSortOrder = async (req, res) => {
  try {
    const { groupId, valueId } = req.params;
    const { newSortOrder } = req.body;

    console.log(
      "updateOptionValueSortOrder called with groupId:",
      groupId,
      "valueId:",
      valueId,
      "newSortOrder:",
      newSortOrder
    );

    if (!valueId) {
      return res.status(400).json({ message: "valueId param is required" });
    }

    // 1) Validar payload: UI envía 1-based
    const j1 = Number(newSortOrder);
    if (!Number.isInteger(j1) || j1 <= 0) {
      return res
        .status(400)
        .json({ message: "newSortOrder must be a positive integer (1-based)" });
    }

    // 2) Buscar el OptionValue a mover, con su grupo actual
    const moving = await prisma.optionValue.findUnique({
      where: { id: valueId },
      select: { id: true, groupId: true, sortOrder: true },
    });

    if (!moving) {
      return res.status(404).json({ message: "OptionValue not found" });
    }

    // (opcional) validar que el groupId de la URL coincide
    if (groupId && moving.groupId !== groupId) {
      return res
        .status(400)
        .json({ message: "OptionValue does not belong to this group" });
    }

    // 3) Cantidad total de valores en ese grupo (scope local)
    const countInGroup = await prisma.optionValue.count({
      where: { groupId: moving.groupId },
    });

    if (countInGroup === 0) {
      return res
        .status(400)
        .json({ message: "No option values in group to reorder" });
    }

    // 4) Convertir de 1-based (UI) a 0-based (DB) y hacer clamp
    const j0 = Math.max(0, Math.min(j1 - 1, countInGroup - 1));
    const i0 = moving.sortOrder;

    // Si ya está en esa posición, nada que hacer
    if (i0 === j0) {
      return res.json(moving);
    }

    // 5) Transacción: reacomodar el bloque dentro del MISMO groupId
    const updated = await prisma.$transaction(async (tx) => {
      if (j0 > i0) {
        // mover hacia abajo
        await tx.optionValue.updateMany({
          where: {
            groupId: moving.groupId,
            sortOrder: { gt: i0, lte: j0 },
          },
          data: { sortOrder: { decrement: 1 } },
        });
      } else {
        // mover hacia arriba
        await tx.optionValue.updateMany({
          where: {
            groupId: moving.groupId,
            sortOrder: { gte: j0, lt: i0 },
          },
          data: { sortOrder: { increment: 1 } },
        });
      }

      return tx.optionValue.update({
        where: { id: moving.id },
        data: { sortOrder: j0 },
      });
    });

    return res.json(updated);
  } catch (error) {
    console.error("updateOptionValueSortOrder error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateOptionValueSortOrder,
};
