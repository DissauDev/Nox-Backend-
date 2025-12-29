
const {makeStripe} = require('../lib/stripe');
const stripe = makeStripe(); // instancia única y reutilizable
const { prisma } = require('../lib/prisma');
const { ALLOWED_STATUSES } = require('../utils/AllowedStatus');
const { generateUniqueOrderNumber } = require('../utils/generateOrderNumber');
const { sendOrderConfirmation } = require('../utils/orderEmail.util');
const { sendEmail } = require('../utils/email');  
const { sendAdminNewOrderNotification } = require('../utils/emailToOrderAdmin');

 const createOrder = async (req, res) => {
  
  const {
    items, amount, customerEmail, userId: rawUserId,
    billingState, billingCity, paymentMethodId, customerPhone,
    customerAddress, lastName, subtotal, specifications, customerName,
    // nuevos
    apartment,        // opcional
    company,          // opcional
    zipcode           // requerido
  } = req.body;

  // Validación de campos requeridos (userId NO es requerido)
  if (!items || !amount || !customerEmail || !paymentMethodId || !customerPhone ||
      !customerAddress || !subtotal || !customerName || !billingCity || !lastName ||
      !billingState || !zipcode) {
    return res.status(400).json({
      success: false,
      message: 'Required data is missing. (customerName, lastName, customerEmail, customerPhone, customerAddress, billingCity, billingState, zipcode, subtotal, amount, items, paymentMethodId)'
    });
  }

  const userId = (typeof rawUserId === 'string' && rawUserId.trim().length > 0)
    ? rawUserId.trim()
    : null;

  try {
    const orderNumber = await generateUniqueOrderNumber();

    // Crear el PaymentIntent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: {
        orderNumber,
        customerEmail,
        company: company ?? '',
        zipcode
      },
      payment_method_options: { card: { request_three_d_secure: 'automatic' } },
      shipping: {
        name: `${customerName} ${lastName}`,
        address: {
          line1: customerAddress,                 // calle y número
          line2: apartment ?? undefined,          // apt / piso (opcional)
          city: billingCity,
          state: billingState,
          postal_code: zipcode,                   // <-- NUEVO
          country: 'US'
        },
        phone: customerPhone
      }
    });

    // Valida existencia de productos
    for (const item of items) {
      const prod = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!prod) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }
    }

    // Relación opcional con usuario existente
    let userData = {};
    if (userId) {
      const userExists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
      if (userExists) {
        userData = { user: { connect: { id: userId } } };
      }
    }

    // Crea la orden con los nuevos campos
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PAID',
        subtotal: Number(subtotal),
        totalAmount: Number(amount),
        paymentMethod: 'Stripe',
        stripePaymentIntentId: paymentIntent.id,

        customerName,
        customerLastname: lastName,
        customerEmail,
        customerPhone,

        customerAddress,                // line1
        apartment: apartment ?? null,   // line2
        company: company ?? null,
        billingCity,
        billingState,
        zipcode,                        // <-- NUEVO

        specifications,

        ...userData,

        items: {
          create: items.map(i => ({
            product: { connect: { id: i.productId } },
            quantity: Number(i.quantity),
            price: Number(i.price),
            chosenOptions: i.options ?? null,
            specifications: i?.specifications || "",
               isCateringLine: Boolean(i.isCateringLine),
          }))
        }
      },
      include: {
  items: {
    include: {
      product: { select: { name: true,cateringName: true, } }, // ✅ para it.product.name
    },
  },
}
    });
   await sendOrderConfirmation({ sendEmail }, { order, logoUrl: process.env.ASSETS_URL });
   await sendAdminNewOrderNotification({sendEmail}, {order, logoUrl: process.env.ASSETS_URL});
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
    
  if (origin === 'pickup') {
    where.fulfillmentType  = 'PICKUP' ;
  } else if (origin === 'delivery') {
    where.fulfillmentType = 'DELIVERY'
  }

  const skip = (page - 1) * perPage;
  const [orders, totalPage] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true,delivery:true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(perPage),
    }),
    prisma.order.count({ where }),
  ]);

  res.json({ orders, totalPage, page: Number(page), perPage: Number(perPage) });
  } catch (error) {
    console.log(error);
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
        // 👇 usuario
        user: true,

        // 👇 ítems + producto + opciones
        items: {
          include: {
            product: {
              include: {
                category: {
                  select: { id: true, name: true },
                },
                options: {
                  include: {
                    group: {
                      select: {
                        id: true,
                        name: true,
                        required: true,
                        minSelectable: true,
                        maxSelectable: true,
                      },
                    },
                    values: {
                      include: {
                        optionValue: {
                          select: {
                            id: true,
                            name: true,
                            extraPrice: true,
                            imageUrl: true,
                            groupId: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // 👇 NUEVO: detalles de delivery asociados a la orden
        delivery: true, // o "deliveries: true" si la relación es 1-N
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Orden not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error en getOrderById:", error);
    res
      .status(400)
      .json({ message: error.message || "Error to get order" });
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



const convertOrderToPickup = async (req, res) => {
  const { id } = req.params; // id de la orden

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        delivery: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 1) Debe ser originalmente DELIVERY
    if (order.fulfillmentType !== "DELIVERY") {
      return res.status(400).json({
        success: false,
        message: "Only delivery orders can be converted to pickup.",
      });
    }

    // 2) Validar que haya delivery y que esté CANCELLED
    if (!order.delivery || order.delivery.status !== "CANCELLED") {
      return res.status(400).json({
        success: false,
        message:
          "Order delivery must be CANCELLED before converting to pickup.",
      });
    }

    // 3) No permitir si la orden está en un estado final “muerto”
    const BLOCKED_STATUSES = new Set(["CANCELLED", "REFUNDED", "FAILED"]);
    if (BLOCKED_STATUSES.has(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Order in status ${order.status} cannot be converted to pickup.`,
      });
    }

    // 4) Actualizar solo la orden: fulfillmentType -> PICKUP
    //    Puedes ajustar el status si quieres, por ejemplo:
    //    - Si está PAID -> READY_FOR_PICKUP
    const newStatus =
      order.status === "PAID" ? "READY_FOR_PICKUP" : order.status;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        fulfillmentType: "PICKUP",
        status: newStatus,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        delivery: true, // seguimos viendo el delivery cancelado
        user: true,
      },
    });

    return res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error in convertOrderToPickup:", error);
    return res.status(500).json({
      success: false,
      message: "Error converting order to pickup",
      error: error.message,
    });
  }
};

const refundOrder = async (req, res) => {
  const { id } = req.params;          // orderId
  const { totalAmount, refundReason } = req.body;   // opcional: monto solicitado a reembolsar (USD)


  try {
    // 1️⃣ Recuperar la orden con la info de delivery (por si la necesitas para UI)
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        delivery: true,
      },
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (!order.stripePaymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Order does not have a Stripe payment intent",
      });
    }

    const originalTotalUsd = Number(order.totalAmount || 0);
    const alreadyRefundedUsd = Number(order.refundedAmount || 0);

    // 2️⃣ Monto máximo que todavía se puede devolver
    const maxRefundableUsd = Math.max(originalTotalUsd - alreadyRefundedUsd, 0);

    if (maxRefundableUsd <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "There is no remaining amount to refund for this order.",
        details: {
          originalTotalUsd,
          alreadyRefundedUsd,
          maxRefundableUsd,
        },
      });
    }

    // 3️⃣ Determinar cuánto vamos a reembolsar en ESTA llamada
    //    - Si viene totalAmount -> refund parcial
    //    - Si no viene -> refund total restante
    const requestedRefundUsd =
      totalAmount != null ? Number(totalAmount) : null;

    if (requestedRefundUsd != null && requestedRefundUsd <= 0) {
      return res.status(400).json({
        success: false,
        message: "Refund amount must be greater than 0.",
      });
    }

    const amountToRefundUsd =
      requestedRefundUsd != null ? requestedRefundUsd : maxRefundableUsd;

    // pequeña tolerancia por redondeos
    if (amountToRefundUsd > maxRefundableUsd + 0.0001) {
      return res.status(400).json({
        success: false,
        message:
          "Requested refund exceeds the remaining refundable amount.",
        details: {
          requestedRefundUsd: amountToRefundUsd,
          maxRefundableUsd,
          alreadyRefundedUsd,
          originalTotalUsd,
        },
      });
    }

    const amountCents = Math.round(amountToRefundUsd * 100);

    // 4️⃣ Hacer refund en Stripe
    const refundParams = {
      payment_intent: order.stripePaymentIntentId,
      amount: amountCents,
    };

    let refund;
    try {
      refund = await stripe.refunds.create(refundParams);
    } catch (error) {
      if (
        error.type === "StripeInvalidRequestError" &&
        error.code === "charge_already_refunded"
      ) {
        return res.status(400).json({
          success: false,
          message: "This charge has already been fully refunded.",
        });
      }
      throw error;
    }
    const refundTextReason = refundReason ? ` (${order.refundReason})` : "";

    // 5️⃣ Actualizar la orden en tu base
    const updatedRefundedAmount = alreadyRefundedUsd + amountToRefundUsd;

    // ¿Quedó totalmente devuelta?
    const fullyRefunded =
      updatedRefundedAmount >= originalTotalUsd - 0.0001;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: fullyRefunded ? "REFUNDED" : order.status,
        refundedAmount: updatedRefundedAmount,
        refundReason:refundTextReason,
        lastRefundAt: new Date(),
        // opcional: si quieres guardar último refund id
        // lastStripeRefundId: refund.id,
      },
      include: {
        delivery: true,
      },
    });

    return res.status(200).json({
      success: true,
      refund,
      order: updatedOrder,
      meta: {
        originalTotalUsd,
        alreadyRefundedUsd,
        maxRefundableUsd,
        amountToRefundUsd,
        updatedRefundedAmount,
        fullyRefunded,
      },
    });
  } catch (err) {
    console.error("Errorrefunding the order:", err);
    return res.status(500).json({
      success: false,
      message: "Error processing the refund",
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
  updateOrderStatus,
  convertOrderToPickup
};

