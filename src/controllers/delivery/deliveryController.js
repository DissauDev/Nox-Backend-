// src/controllers/deliveryController.js
const axios = require('axios');
const { createDoorDashJwt } = require('../../utils/createDoorDashJwt');

const { prisma } = require("../../lib/prisma");
const { cancelDoorDashDelivery } = require("./services/doordash/doordash.service");
const { HttpError } = require("./services/errors/httpError");

const {
  DOORDASH_API_BASE = 'https://openapi.doordash.com',
  DOORDASH_PICKUP_ADDRESS,
  DOORDASH_PICKUP_BUSINESS_NAME,
  DOORDASH_PICKUP_PHONE,
} = process.env;

/**
 * POST /delivery/quote
 * Calcula un quote de DoorDash Drive para mostrar al cliente en el checkout.
 */
async function getDeliveryQuote(req, res) {
  try {
    const {
      orderId,
      dropoffAddress,
      dropoffBusinessName,
      dropoffPhoneNumber,
      dropoffInstructions,
      orderValue,
      tip,
        dropoffContactFirstName,
  dropoffContactLastName,
     pickup_instructions,
     items
    } = req.body;


    if (!dropoffAddress || !dropoffPhoneNumber || !orderValue) {
      return res.status(400).json({
        message:
          'dropoffAddress, dropoffPhoneNumber y orderValue are required',
      });
    }
 

    if (!DOORDASH_PICKUP_ADDRESS || !DOORDASH_PICKUP_PHONE) {
      return res.status(500).json({
        message:
          'Can not find DOORDASH_PICKUP_ADDRESS or DOORDASH_PICKUP_PHONE in .env',
      });
    }
     // ✅ Validar que haya items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'items is required to build DoorDash item details',
      });
    }

    // ✅ Construir ddItems igual que en runDeliveryCheckout
    const productIds = items.map((i) => i.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
      },
    });

    const ddItems = items.map((it) => {
      const prod = products.find((p) => p.id === it.productId);
      const baseName = prod?.name || "Item";

      let descriptionParts = [];

      if (Array.isArray(it.options) && it.options.length > 0) {
        const optsText = it.options
          .map((opt) => `${opt.groupName}: ${opt.name}`)
          .join(" | ");
        descriptionParts.push(`Options: ${optsText}`);
      }

      if (it?.specifications) {
        descriptionParts.push(`Notes: ${it.specifications}`);
      }

      return {
        name: baseName,
        quantity: Number(it.quantity),
        external_id: it.productId,
        description:
          descriptionParts.length > 0 ? descriptionParts.join(" || ") : undefined,
      };
    });

    // 1) Crear JWT de DoorDash
    const ddJwt = createDoorDashJwt();
 const externalId =
      orderId ||
      `quote_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

     
    // 2) Armar payload para /drive/v2/quotes
    const payload = {
      external_delivery_id: externalId, // normalmente tu order.id o orderNumber
      order_fulfillment_method: 'standard', // para la mayoría de casos

      // Pickup (tu tienda NOX)
      pickup_address: DOORDASH_PICKUP_ADDRESS,
      pickup_business_name:
        DOORDASH_PICKUP_BUSINESS_NAME || 'Nox Desserts',
      pickup_phone_number: DOORDASH_PICKUP_PHONE,
      pickup_instructions:   pickup_instructions || "", 

      // Dropoff (cliente)
        dropoff_contact_given_name: dropoffContactFirstName || undefined,
  dropoff_contact_family_name: dropoffContactLastName || undefined,
      dropoff_address: dropoffAddress,
      dropoff_business_name: dropoffBusinessName || undefined,
      dropoff_phone_number: dropoffPhoneNumber,
      dropoff_instructions: dropoffInstructions || "",

      // Dinero en centavos
      order_value: Number(orderValue), // p. ej. 4599 = $45.99
      tip: tip != null ? Number(tip) : undefined,
       items: ddItems,
    };

    // 3) Llamar a DoorDash
    const response = await axios.post(
      `${DOORDASH_API_BASE}/drive/v2/quotes`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${ddJwt}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 4) Devolver la respuesta de DoorDash al frontend
    const quote = response.data;

    // Aquí podrías opcionalmente guardar algo en la BD (Delivery con status "REQUESTED"),
    // pero como pediste sólo el quote endpoint, lo dejamos simple:
    return res.status(200).json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error('[DoorDash] Error obteniendo quote:', error.response?.data?.message || error.message);

 
    // Manejo de errores estándar
     if (error.response) {
      // Error devuelto por DoorDash
      return res.status(error.response.status).json({
        message: error.response?.data?.message || error.message || 'Error to get from DoorDash',
        details: error.response.data,
      });
    }

    // Error de red / interno
    return res.status(500).json({
      message: 'Error to get the quote',
      details: error.message,
    });
  }
}
/**
 * GET /delivery/doordash/:externalId
 * Retorna desde DoorDash Drive la información real de la delivery.
 */
async function getDoorDashDelivery(req, res) {
  try {
    const { externalId } = req.params;

    if (!externalId) {
      return res.status(400).json({
        message: "externalId param is required",
      });
    }

    // Crear JWT
    const ddJwt = createDoorDashJwt();

    const url = `${DOORDASH_API_BASE}/drive/v2/deliveries/${externalId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${ddJwt}`,
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({
      success: true,
      delivery: response.data,
    });
  } catch (error) {
    console.error("[DoorDash] Error obteniendo delivery:", error.response?.data || error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response?.data?.message || "DoorDash error",
        details: error.response?.data,
      });
    }

    return res.status(500).json({
      message: "Internal error retrieving DoorDash delivery",
      details: error.message,
    });
  }
}


// Estados desde los que PERMITES cancelar
const CANCELLABLE_DELIVERY_STATUSES = new Set(["REQUESTED", "ACCEPTED"]);

async function cancelDeliveryController(req, res) {
  try {
    const { orderId } = req.params; // asegúrate que tu route usa :orderId
    const { reasonCode, reason } = req.body || {};
    const user = req.user || null;



    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId param is required.",
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { delivery: true },
    });

 

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (!order.delivery) {
      return res.status(404).json({
        success: false,
        message: "No delivery associated to this order.",
      });
    }

    const delivery = order.delivery;

    if (delivery.provider !== "DOORDASH") {
      return res.status(400).json({
        success: false,
        message: "This endpoint only supports DoorDash deliveries.",
      });
    }

 
    // Si NO tenemos ni doordashDeliveryId ni externalDeliveryId, no podemos cancelar
    if (!delivery.doordashDeliveryId && !delivery.externalDeliveryId) {
      return res.status(409).json({
        success: false,
        message:
          "This delivery does not have a DoorDash ID (delivery_id or external_delivery_id). It cannot be cancelled via API.",
      });
    }

    if (delivery.status === "CANCELLED") {
      return res.status(200).json({
        success: true,
        message: "Delivery is already cancelled.",
        deliveryStatus: delivery.status,
      });
    }

    if (!CANCELLABLE_DELIVERY_STATUSES.has(delivery.status)) {
      return res.status(409).json({
        success: false,
        message: `Delivery cannot be cancelled in current status: ${delivery.status}`,
      });
    }

    const ddResult = await cancelDoorDashDelivery({
      externalDeliveryId: delivery.externalDeliveryId || null,
      doordashDeliveryId: delivery.doordashDeliveryId || null,
      reasonCode,
      reason,
    });

    const updatedDelivery = await prisma.delivery.update({
      where: { id: delivery.id },
      data: {
        status: "CANCELLED",
        cancelSource: "MERCHANT", // por ejemplo
        cancelReason: reason || delivery.cancelReason,
        cancelledAt: new Date(),
        rawResponse: {
          ...(delivery.rawResponse || {}),
          lastManualCancelAt: new Date().toISOString(),
          lastManualCancelResult: ddResult,
          cancelledByUserId: user?.id || null,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Delivery cancelled successfully.",
      deliveryStatus: updatedDelivery.status,
      orderStatus: order.status,
    });
  } catch (err) {
    console.log(err);
    const status = err instanceof HttpError ? err.status : 500;
    return res.status(status).json({
      success: false,
      code: err.code || "DELIVERY_CANCEL_ERROR",
      message: err.message || "Error cancelling delivery.",
      details: err.details,
    });
  }
}




module.exports = {
  getDeliveryQuote,
  cancelDeliveryController,
  getDoorDashDelivery
};
