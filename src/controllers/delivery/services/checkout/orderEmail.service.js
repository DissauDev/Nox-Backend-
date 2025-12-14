const { sendEmail: sendEmailFn } = require("../../../../utils/email");
const { sendOrderConfirmation } = require("../../../../utils/orderEmail.util");
const { sendAdminNewOrderNotification } = require("../../../../utils/emailToOrderAdmin");

/**
 * Envía:
 * - Email de confirmación al cliente
 * - Email de notificación al admin
 *
 * Importante: llamar SOLO cuando el order ya esté PAID.
 */
async function sendOrderEmails({ order, logoUrl }) {
  // deps wrapper (tu sendOrderConfirmation lo espera así)
  const deps = { sendEmail: sendEmailFn };

  await sendOrderConfirmation(deps, { order, logoUrl });
  await sendAdminNewOrderNotification(deps, { order, logoUrl });
}

module.exports = { sendOrderEmails };
