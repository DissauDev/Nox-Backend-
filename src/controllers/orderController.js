
// controllers/orderController.js
const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const prisma = new PrismaClient();


// Función para generar orden tipo ORD-XXXX
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

const createOrder = async (req, res) => {
  const { items, amount, customerEmail, paymentMethodId } = req.body;

  if (!items || !amount || !customerEmail || !paymentMethodId) {
    return res.status(400).json({ success: false, message: 'Faltan datos requeridos.' });
  }

  let order;

  try {
    // Generar un número de orden único
    const orderNumber = await generateUniqueOrderNumber();

    // Crear pago con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // 👈 ESTA LÍNEA es la clave
      },
      metadata: {
        orderNumber,
        customerEmail
      }
    });

  
    // Crear la orden en la base de datos
    order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PAID', // En este ejemplo, el pago fue confirmado
        subtotal: amount,
        totalAmount: amount + (amount * 20 / 100),  // Ejemplo: añade 20% de recargo o impuesto
        paymentMethod: "Stripe",                  // Campo requerido en el modelo
        stripePaymentIntentId: paymentIntent.id,
        // Puedes agregar información adicional del cliente, si la tienes:
        customerName: "Cliente Invitado",         // Valor por defecto; modifícalo según necesidad
        customerEmail,
        customerPhone: "",                          // Asigna valor o cadena vacía si no se envía
        customerAddress: "",                        // Igual que arriba
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            options: item.options || null,
            specifications: item.specifications || null,
          }))
        }
      },
      include: {
        items: true,
      }
    });

    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error al crear la orden:', error);

    if (error.code === 'ECONNREFUSED' || error.message.includes('Can\'t reach database server')) {
      return res.status(500).json({ success: false, message: 'No se pudo conectar a la base de datos.' });
    }

    return res.status(500).json({ success: false, message: 'Ocurrió un error al procesar la orden.', error: error.message });
  }
};


// Los otros controladores (getOrders, getOrderById, getUserOrders, updateOrder, deleteOrder)
// se mantienen igual que en la versión anterior.

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error en getOrders:", error);
    res.status(400).json({ message: error.message || "Error al obtener las órdenes" });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        user: true,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error en getOrderById:", error);
    res.status(400).json({ message: error.message || "Error al obtener la orden" });
  }
};

const getUserOrders = async (req, res) => {
  const { email } = req.params;
  try {
    // Se asume que el email del cliente se guarda en customerEmail
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

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: "Error al obtener las órdenes" });
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
  return res.status(400).json({ message: "El status proporcionado no es válido." });
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
    res.status(400).json({ message: error.message || "Error al actualizar la orden" });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // Primero borrar todos los OrderItems asociados a la orden
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    });

    // Luego borrar la orden
    await prisma.order.delete({
      where: { id },
    });
    res.status(200).json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error en deleteOrder:", error);
    res.status(400).json({ message: error.message || "Error al eliminar la orden" });
  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  deleteOrder,
};


/* controllers/orderController.js
const { PrismaClient } = require('@prisma/client');

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { amount, paymentMethodId, userId, customerName, customerEmail,
     customerPhone, customerAddress, items } = req.body;

  try {
    // Crear la orden en estado PENDING
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`, // Genera un número de orden único
        status: "PENDING",
        totalAmount: amount,
        subtotal: amount, // Aquí podrías calcular el subtotal real
        paymentMethod: "Stripe",
        userId,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            options: item.options || null,
            specifications: item.specifications || null,
          })),
        },
      },
    });

    // Procesar el pago con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe requiere que el monto sea en centavos
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    console.log("PaymentIntent created:", paymentIntent);

    // Si el pago es exitoso, actualizar la orden a PAID
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status: "PAID" },
    });

    return res.status(201).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error processing order:", error);

    // Si hay un error en el pago, cancelar la orden
    await prisma.order.update({
      where: { id: order?.id },
      data: { status: "FAILED" },
    });

    return res.status(400).json({ success: false, message: error.message || "Payment processing failed" });
  }
};

// Obtener todas las órdenes
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error en getOrders:", error);
    res.status(400).json({ 
      message: error.message || "Error al obtener las órdenes" 
    });
  }
};

// Obtener una orden por su ID
 const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        user: true,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error en getOrderById:", error);
    res.status(400).json({ 
      message: error.message || "Error al obtener la orden" 
    });
  }
};
const getUserOrders = async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { email },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" }, // Ordena las órdenes por fecha de creación
    });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve orders" });
  }
};


// Actualizar una orden
const updateOrder = async (req, res) => {
  const { id } = req.params;
  // Se espera que el body contenga los campos a actualizar
  const orderData = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: orderData,
      include: {
        items: true,
        user: true,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error en updateOrder:", error);
    res.status(400).json({ 
      message: error.message || "Error al actualizar la orden" 
    });
  }
};

// Eliminar una orden
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({
      where: { id },
    });
    res.status(200).json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error en deleteOrder:", error);
    res.status(400).json({ 
      message: error.message || "Error al eliminar la orden" 
    });
  }
};

module.exports = {
deleteOrder,getOrderById,getOrders,createOrder,updateOrder,getUserOrders
} */