// src/controllers/deliveryController.js
const axios = require('axios');
const { createDoorDashJwt } = require('../../utils/createDoorDashJwt');

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
    } = req.body;


 
    if (!dropoffAddress || !dropoffPhoneNumber || !orderValue) {
      return res.status(400).json({
        message:
          'dropoffAddress, dropoffPhoneNumber y orderValue son requeridos',
      });
    }
 

    if (!DOORDASH_PICKUP_ADDRESS || !DOORDASH_PICKUP_PHONE) {
      return res.status(500).json({
        message:
          'Faltan DOORDASH_PICKUP_ADDRESS o DOORDASH_PICKUP_PHONE en el .env',
      });
    }

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
      pickup_instructions: 'Pick up at front counter',

      // Dropoff (cliente)
      dropoff_address: dropoffAddress,
      dropoff_business_name: dropoffBusinessName || undefined,
      dropoff_phone_number: dropoffPhoneNumber,
      dropoff_instructions: dropoffInstructions || undefined,

      // Dinero en centavos
      order_value: Number(orderValue), // p. ej. 4599 = $45.99
      tip: tip != null ? Number(tip) : undefined,
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

    if( (error.response?.data?.message || error.message) ==="Validation Failed" ) {
         return res.status(error.response.status).json({
        message: 'Invalid phone field',
        details: error.response.data,
      });
    }
    // Manejo de errores estándar
    else if (error.response) {
      // Error devuelto por DoorDash
      return res.status(error.response.status).json({
        message: 'Error to get from DoorDash',
        details: error.response.data,
      });
    }

    // Error de red / interno
    return res.status(500).json({
      message: 'Error interno al obtener el quote',
      details: error.message,
    });
  }
}

module.exports = {
  getDeliveryQuote,
};
