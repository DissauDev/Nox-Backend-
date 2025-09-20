
const {makeStripe} = require('../lib/stripe');
const stripe = makeStripe(); // instancia única y reutilizable
const { prisma } = require('../lib/prisma');
const { ALLOWED_STATUSES } = require('../utils/AllowedStatus');
const { generateUniqueOrderNumber } = require('../utils/generateOrderNumber');


const createOrder = async (req, res) => {
   
  const {
    items, amount, customerEmail, userId: rawUserId,
    billingState, billingCity, paymentMethodId, customerPhone, customerAddress, lastName,
    subtotal, specifications, customerName
  } = req.body;

  // Validación de campos requeridos (userId NO es requerido)
  if (!items || !amount || !customerEmail || !paymentMethodId || !customerPhone ||
      !customerAddress || !subtotal || !customerName || !billingCity || !lastName ||
      !billingState) {
    return res.status(400).json({ success: false, message: 'Required data is missing.' });
  }

  // Normaliza userId opcional
  const userId = (typeof rawUserId === 'string' && rawUserId.trim().length > 0)
    ? rawUserId.trim()
    : null;

  try {
    const orderNumber = await generateUniqueOrderNumber();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: { orderNumber, customerEmail },
      payment_method_options: { card: { request_three_d_secure: 'automatic' } },
      shipping: {
        name: `${customerName} ${lastName}`,
        address: { line1: customerAddress, city: billingCity, state: billingState, country: 'US' },
      }
    });

    // Validar existencia de cada producto
    for (const item of items) {
      const prod = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!prod) {
        return res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
      }
    }

    // Construye el bloque de usuario solo si viene userId válido y existe
    let userData = {};
    if (userId) {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });

      if (userExists) {
        // Opción segura: relacionar por connect (no pases userId scalar a la vez)
        userData = { user: { connect: { id: userId } } };
      } else {
        // Caso mixto prod/dev: trátalo como invitado (NO conectes, NO pases userId)
        // Si prefieres estrictos, puedes en su lugar hacer: return res.status(400)...
        userData = {};
      }
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PAID',
        subtotal,
        totalAmount: amount,
        paymentMethod: "Stripe",
        stripePaymentIntentId: paymentIntent.id,
        customerName,
        customerEmail,
        specifications,
        customerPhone,
        customerAddress,
        customerLastname: lastName,
        billingState,
        billingCity,
        ...userData, // <-- solo se añade si procede
        items: {
          create: items.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            price: item.price,
            chosenOptions: item.options ?? null,
          }))
        }
      },
      include: { items: true }
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error('Error to create order:', error);
    return res.status(500).json({ success: false, message: error.message, error: error.message });
  }
};

async function getOrders(req, res) {
    const { status, customerType, dateFilter, page = 1, perPage = 20 ,  orderNumber,origin} = req.query;
  const where = {};

    // === Filtrar por número de orden ===
  if (orderNumber) {
    // uso contains para permitir búsquedas parciales, case-insensitive
    where.orderNumber = {
      contains: String(orderNumber),
      mode: 'insensitive',
    };
  }

  if (status && status !== 'all') where.status = status.toUpperCase();
  if (customerType === 'registered') where.userId = { not: null };
  if (customerType === 'unregistered') where.userId = null;

  if (dateFilter && dateFilter !== 'all') {
    const now = new Date();
    
    let since;
    if (dateFilter === 'today') {
      since = new Date(now.setHours(0,0,0,0));
    } else if (dateFilter === 'this_week') {
      since = new Date(now.getTime() - 7 * 24*60*60*1000);
    } else if (dateFilter === 'this_month') {
      since = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    where.createdAt = { gte: since };
  }
  try {
      // === Filtrar por Pickup vs Delivery ===
  // (ajusta la dirección de pickup según tu negocio)
  const PICKUP_ADDRESS = '422 E Campbell Ave, Campbell, CA 95008';
  if (origin === 'pickup') {
    where.customerAddress = PICKUP_ADDRESS;
  } else if (origin === 'delivery') {
    where.customerAddress = { not: PICKUP_ADDRESS };
  }

  const skip = (page - 1) * perPage;
  const [orders, totalPage] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(perPage),
    }),
    prisma.order.count({ where }),
  ]);

  res.json({ orders, totalPage, page: Number(page), perPage: Number(perPage) });
  } catch (error) {
   res.status(500).json({message: "error to get orders"}) 
  } 
}

 const updateOrderStatus = async (req, res) => {
  const { id } = req.params;      // id de la orden (UUID)
  const { status } = req.body;    // nuevo status
        
  // 1️⃣ Validar que venga un status
  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Field Status is requiered.",
    });
  }

  // 2️⃣ Validar que sea uno de los permitidos
  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status invalid. Most be : ${ALLOWED_STATUSES.join(
        ", "
      )}.`,
    });
  }

  try {
    // 3️⃣ Intentar actualizar la orden
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Error al actualizar status de la orden:", err);

    // Si no existe la orden
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Cualquier otro error
    return res.status(500).json({
      success: false,
      message: "Fail to update status",
      error: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        // trae al usuario
        user: true,
        items: {
          include: {
            // cada OrderItem, también su Product
            product: {
              include: {
                // la categoría (relación Many-to-One)
                category: {
                  select: { id: true, name: true }
                },
                // los grupos de opciones asignados al producto
                options: {
                  include: {
                    group: {
                      select: {
                        id: true,
                        name: true,
                        required: true,
                        minSelectable: true,
                        maxSelectable: true
                      }
                    },
                    values: {
                      include: {
                        optionValue: {
                          select: {
                            id: true,
                            name: true,
                            extraPrice: true,
                            imageUrl: true,
                            groupId: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: "Orden not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error en getOrderById:", error);
    res.status(400).json({ message: error.message || "Error to get order" });
  }
};


const getUserOrders = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email params is missing" });
  }

  try {
    // Obtener todas las órdenes del usuario
    const orders = await prisma.order.findMany({
      where: { customerEmail: email },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calcular el resumen
    const count = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const average = count > 0 ? totalSpent / count : 0;

    const resume = {
      count,
      totalSpent: Number(totalSpent.toFixed(2)),
      average: Number(average.toFixed(2)),
    };

    return res.status(200).json({  orders, resume });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error to get Orders" });
  }
};


const updateOrder = async (req, res) => {
  const { id } = req.params;
  // Solo se permitirá actualizar el status
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Debe proporcionar un status para actualizar la orden." });
  }
  const allowedStatuses = ["PENDING", "PAID", "PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED", "CANCELLED", "FAILED"];
if (!allowedStatuses.includes(status)) {
  return res.status(400).json({ message: "Status invalid" });
}

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: true,
        user: true,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error en updateOrder:", error);
    res.status(400).json({ message: error.message || "Error to update the order" });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // 1️⃣ Validamos existencia
    const exists = await prisma.order.findUnique({ where: { id } });
    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // 2️⃣ Borramos items relacionados
    await prisma.orderItem.deleteMany({ where: { orderId: id } });

    // 3️⃣ Borramos la orden
    await prisma.order.delete({ where: { id } });

    return res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error en deleteOrder:", err);

    // Si no existía, devolvemos 404
    if (err.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Para cualquier otro error devolvemos 500
    return res
      .status(500)
      .json({ success: false, message: err.message || "Error deleting the order" });
  }
};


const refundOrder = async (req, res) => {
   
  const { id } = req.params;               // id de la orden en tu base
  const { totalAmount } = req.body;        // monto a reembolsar (en dólares), opcional

  try {
    // 1️⃣ recupera la orden de tu base
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden not found' });
    }

    // 2️⃣ haz el refund en Stripe
    const refundParams = { payment_intent: order.stripePaymentIntentId };
    if (totalAmount) {
      // Stripe espera la clave `amount` en centavos
      refundParams.amount = Math.round(totalAmount * 100);
    }

    let refund;
    try {
      refund = await stripe.refunds.create(refundParams);
    } catch (error) {
      // Si ya se había reembolsado esa carga, devolvemos 400 en vez de 500
      if (error.type === 'StripeInvalidRequestError' && error.code === 'charge_already_refunded') {
        return res.status(400).json({
          success: false,
          message: 'This charge has already been refunded.'
        });
      }
      // cualquier otro error lo propagamos
      throw error;
    }

    // 3️⃣ actualiza la orden en tu base
    await prisma.order.update({
      where: { id },
      data: {
        status: 'REFUNDED',
        stripePaymentIntentId: refund.id, // guarda el id del refund
        // ajusta el totalAmount si es un reembolso parcial
        totalAmount: order.totalAmount - (totalAmount ?? order.totalAmount),
      },
    });

    // 4️⃣ responde con éxito
    return res.status(200).json({ success: true, refund });
  } catch (err) {
    console.error('Error al reembolsar la orden:', err);
    return res.status(500).json({
      success: false,
      message: 'Error processing the refund',
      error: err.message,
    });
  }
};



module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  deleteOrder,
  refundOrder,
  updateOrderStatus
};

