const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createCoupon = async (req, res) => {
  try {
    const {
      code,
      type,           // "PERCENTAGE" o "AMOUNT"
      discountValue,  // número o string numérico
      expiresAt,      // ISO string o null
      isLimited = false,
      usageLimit,     // número o string numérico
    } = req.body;

  console.log('>>> Headers:', req.headers);
  console.log('>>> Raw req.body:', req.body);
    // Validaciones mínimas
    if (!code || !type || discountValue == null) {
      return res.status(400).json({ message: 'Missing required fields: code, type or discountValue' });
    }

       const upperType = type.toUpperCase();
    if (!['PERCENTAGE', 'AMOUNT'].includes(upperType)) {
      return res.status(400).json({ message: 'Invalid discount type' });
    }

    // 3) Comprobar unicidad del código
    const exists = await prisma.coupon.findUnique({ where: { code } });
    if (exists) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
      
    const data = {
      code: code.trim(),
      type,
      discountValue: Number(discountValue),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isLimited: Boolean(isLimited),
      usageLimit: Boolean(isLimited) ? Number(usageLimit) : null,
    };

    const coupon = await prisma.coupon.create({ data });
    return res.status(201).json(coupon);
  } catch (error) {
    console.error('createCoupon error:', error);
    return res
      .status(500)
      .json({ message: 'Error creating coupon', error: error.message });
  }
};

/**
 * Obtiene todos los cupones
 * GET /coupons
 */
const getCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(coupons);
  } catch (error) {
    console.error('getCoupons error:', error);
    res.status(500).json({ message: 'Error al obtener cupones', error: error.message });
  }
};


/**
 * Obtiene un cupón por su ID
 * GET /coupons/:id
 */
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }
    res.json(coupon);
  } catch (error) {
    console.error('getCouponById error:', error);
    res.status(500).json({ message: 'Error al obtener cupón', error: error.message });
  }
};


/**
 * Actualiza un cupón existente
 * PUT /coupons/:id
 */
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {};
    const fields = ['code', 'type', 'discountValue', 'expiresAt', 'isLimited', 'usageLimit'];
    for (const f of fields) {
      if (req.body[f] !== undefined) {
        data[f] = f === 'expiresAt'
          ? (req.body.expiresAt ? new Date(req.body.expiresAt) : null)
          : req.body[f];
      }
    }

    const updated = await prisma.coupon.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (error) {
    console.error('updateCoupon error:', error);
    res.status(500).json({ message: 'Error al actualizar cupón', error: error.message });
  }
};


/**
 * Elimina un cupón
 * DELETE /coupons/:id
 */
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.coupon.delete({ where: { id } });
    res.json({ message: 'Cupón eliminado' });
  } catch (error) {
    console.error('deleteCoupon error:', error);
    res.status(500).json({ message: 'Error al eliminar cupón', error: error.message });
  }
};


/**
 * Redime un cupón
 * POST /coupons/redeem
 * Body: { code, userId?, orderId? }
 */
const redeemCoupon = async (req, res) => {
  const { code, userId = null, orderId = null } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1) Buscar cupón por código
      const coupon = await tx.coupon.findUnique({ where: { code } });
      if (!coupon) {
        throw new Error('Cupón inválido');
      }
      // 2) Validaciones
      const now = new Date();
      if (coupon.expiresAt && coupon.expiresAt < now) {
        throw new Error('Cupón expirado');
      }
      if (coupon.isLimited && coupon.usageCount >= (coupon.usageLimit || 0)) {
        throw new Error('Límite de usos alcanzado');
      }
      // 3) Incrementar contador de usos
      const updated = await tx.coupon.update({
        where: { id: coupon.id },
        data: { usageCount: { increment: 1 } }
      });
      // 4) Registrar redención (opcional)
      const redemption = await tx.couponRedemption.create({
        data: {
          couponId:  coupon.id,
          userId,
          orderId,
        }
      });
      return { updated, redemption };
    });

    res.json(result);
  } catch (error) {
    console.error('redeemCoupon error:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  redeemCoupon
};
