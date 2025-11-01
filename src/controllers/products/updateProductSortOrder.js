const { prisma } = require('../../lib/prisma');

async function updateProductSortOrder(req, res) {
  try {
    const { id } = req.params;
    const { newSortOrder } = req.body;

    // 1) Validación: front manda 1-based (mínimo 1)
    const j1 = Number(newSortOrder);
    if (!Number.isInteger(j1) || j1 <= 0) {
      return res.status(400).json({ message: 'newSortOrder must be a positive integer (1-based)' });
    }

    // 2) Producto a mover
    const moving = await prisma.product.findUnique({
      where: { id },
      select: { id: true, categoryId: true },
    });
    if (!moving) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 3) Transacción: normalizar y reordenar por índice
    const updated = await prisma.$transaction(async (tx) => {
      // Traer toda la categoría en orden estable visible para el usuario
      const rows = await tx.product.findMany({
        where: { categoryId: moving.categoryId },
        orderBy: [
          { sortOrder: 'asc' },
          { name: 'asc' },
          { createdAt: 'asc' },
        ],
        select: { id: true, sortOrder: true },
      });

      if (rows.length === 0) {
        throw new Error('No products in category to reorder');
      }

      // Índices 0-based reales (según el orden que ve la UI)
      const fromIdx = rows.findIndex(r => r.id === moving.id);
      if (fromIdx === -1) {
        throw new Error('Moving product not in category list');
      }

      // Destino 0-based, clamp dentro de [0, rows.length - 1]
      const toIdx = Math.max(0, Math.min(j1 - 1, rows.length - 1));
      if (fromIdx === toIdx) {
        // No hay movimiento: devuelve el registro actual
        return tx.product.findUnique({ where: { id: moving.id } });
      }

      // Reordenar en memoria
      const arr = rows.slice();
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);

      // Reasignar sortOrder = índice (0-based) a todos (normalización)
      // Evita colisiones y arregla casos "todos en 0"
      await Promise.all(
        arr.map((r, idx) =>
          tx.product.update({
            where: { id: r.id },
            data:  { sortOrder: idx },
          })
        )
      );

      // Devuelve el movido ya actualizado
      return tx.product.findUnique({ where: { id: moving.id } });
    });

    return res.json(updated);
  } catch (error) {
    console.error('updateProductSortOrder error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { updateProductSortOrder };
