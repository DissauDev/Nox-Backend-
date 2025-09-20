// Función para generar orden tipo ORD-XXXX
const { prisma } = require('../lib/prisma');
const generateOrderNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `ORD-${random}`;
};

// Verifica que no exista el número de orden en la DB
const generateUniqueOrderNumber = async () => {
  let unique = false;
  let orderNumber;

  while (!unique) {
    orderNumber = generateOrderNumber();
    const existing = await prisma.order.findUnique({ where: { orderNumber } });
    if (!existing) unique = true;
  }

  return orderNumber;
};

module.exports = { generateUniqueOrderNumber };