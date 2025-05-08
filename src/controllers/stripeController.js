

const stripe = require('stripe')(process.env.STRIPE_SECRET);


exports.createpaymentStripe = async (req, res) => {
    const { amount, id } = req.body; // "id" es el paymentMethod.id del frontend
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Debe ser un entero (ej: 1000 = $10.00)
        currency: "usd",
        payment_method: id, // Usa el paymentMethod.id del frontend
        confirm: true, // Confirma el pago inmediatamente
        automatic_payment_methods: { // Opcional pero recomendado
          enabled: true,
          allow_redirects: "never",
        },
      });
  
      console.log("PaymentIntent creado:", paymentIntent);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error en Stripe:", error);
      res.status(400).json({ 
        message: error.message || "Error en el pago" // Envía el mensaje de error de Stripe
      });
    }
  };