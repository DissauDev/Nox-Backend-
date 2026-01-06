
function renderAdminDeliveryCancelledEmailHTML(order, delivery, opts = {}) {
  const resolvedLogo = safe(opts.logoUrl) ? opts.logoUrl : getEnvLogoUrl();
//
  const brand = {
    primary: "#b91c1c", // rojo suave para "alerta"
    bg: "#FEF2F2",
    surface: "#FFFFFF",
    text: "#1F2937",
    logoBar: "#0F172A",
    logoUrl: resolvedLogo,
    ...(opts.brand || {}),
  };

  const adminUrl = joinUrl(
    process.env.FRONT_URL,
    `/dashboard/orders/${order?.id}`
  );
  const itemsBlock = renderItems(order?.items);

  const origin =
    order?.customerAddress === "422 E Campbell Ave, Campbell, CA 95008"
      ? "Pickup"
      : "Delivery";

  const cancelledAt =
    delivery?.cancelledAt &&
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(delivery.cancelledAt));

  // Texto legible para source
  const cancelSourceLabel = (() => {
    switch (delivery?.cancelSource) {
      case "CUSTOMER":
        return "Customer";
      case "DRIVER":
        return "Dasher / Driver";
      case "MERCHANT":
        return "Store / Merchant";
      case "SUPPORT":
        return "DoorDash Support";
      case "SYSTEM":
        return "System / Automatic";
      case "OTHER":
        return "Other";
      default:
        return null;
    }
  })();

  const summaryPairs = [
    ["Order #", order?.orderNumber],
    ["Order Status", order?.status],
    ["Fulfillment Type", order?.fulfillmentType],
    ["Origin", origin],
    ["Delivery Status", delivery?.status],
    ["Cancel Source", cancelSourceLabel],
    ["Cancel Reason", delivery?.cancelReason],
    ["Cancelled At", cancelledAt],
    ["Customer", joinNonEmpty(order?.customerName, order?.customerLastname)],
    ["Email", order?.customerEmail],
    ["Phone", order?.customerPhone],
    [
      "Total",
      safe(order?.totalAmount) ? currency(Number(order.totalAmount)) : null,
    ],
    ["Payment Method", order?.paymentMethod],
  ].filter(([k, v]) => safe(k) && safe(v));

  const summaryRows = renderTableRows(summaryPairs);

  return `
  <div style="background-color:${brand.bg}; padding:40px; font-family: Arial, sans-serif; color:${brand.text};">
    <style>
      img { max-width: 100%; height: auto; display: block; border: 0; }
      .container { max-width: 640px; margin: auto; background:${brand.surface}; border-radius:10px; padding:0; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
      .inner { padding:30px; }
      .table { width: 100%; border-collapse: collapse; }
      .cell { word-break: break-word; }
      .muted { color:#6B7280; }
      @media only screen and (max-width:600px) {
        .inner { padding:18px !important; }
        .mobile-block { display:block !important; width:100% !important; text-align:left !important; }
        .table th, .table td { display:block !important; width:100% !important; text-align:left !important; }
        .btn { display:inline-block !important; padding:12px 18px !important; }
      }
    </style>

    <div class="container">
      <!-- Header oscuro con logo -->
      <div style="background:${brand.logoBar}; text-align:center; padding:14px 0; border-radius:10px 10px 0 0;">
        ${
          safe(brand.logoUrl)
            ? `<img src="${brand.logoUrl}" width="220" alt="Nox Cookie Bar" style="margin:0 auto; display:block;">`
            : `<div style="color:#FFFFFF; font-weight:700; font-size:18px;">Nox Cookie Bar</div>`
        }
      </div>

      <div class="inner">
        <h2 style="margin:0; color:${brand.primary};">Delivery cancelled</h2>
        <p style="font-size:15px; line-height:1.6; color:${brand.text}; margin-top:6px;">
          The delivery for this order has been <strong>cancelled</strong>. Please review the details below and decide whether to convert the order to pickup or issue a refund.
        </p>

        <!-- Tabla de resumen organizada -->
        <table class="table" width="100%" cellspacing="0" cellpadding="0" style="margin-top:12px; border:1px solid #fecaca; border-radius:8px; overflow:hidden;">
          <tbody>
            ${summaryRows}
          </tbody>
        </table>

        ${itemsBlock}

        <div style="text-align:center; margin:28px 0 8px;">
          <a href="${adminUrl}"
            class="btn"
            style="background-color:${brand.logoBar}; color:#fff; padding:12px 22px; text-decoration:none; border-radius:6px; display:inline-block;">
            View order in dashboard
          </a>
        </div>

        <p class="muted" style="font-size:12px; color:#6B7280; margin-top:24px;">
          This is an automatic notification for administrators. Remember to review the customer's options (pickup vs refund) according to your policy.
        </p>
      </div>
    </div>
  </div>
  `;
}

// --- Envío al admin: Delivery CANCELLED ---
async function sendAdminDeliveryCancelledNotification(
  deps,
  { order, delivery, to, subject, brand, logoUrl }
) {
  const adminTo = to || process.env.ADMIN_EMAIL;
  if (!safe(adminTo)) return;

  const html = renderAdminDeliveryCancelledEmailHTML(order, delivery, {
    brand,
    logoUrl,
  });

  const email = {
    to: adminTo,
    subject:
      subject ||
      `Delivery cancelled — Order #${order?.orderNumber} | Nox Cookie Bar`,
    html,
  };

  return deps.sendEmail(email);
}

// --- Helpers mínimos necesarios ---
const safe = (v) => v !== null && v !== undefined && String(v).trim() !== "";
const currency = (n) => (typeof n === "number" ? `$${n.toFixed(2)}` : n);
const joinNonEmpty = (...parts) => parts.filter(safe).join(" ");

// URL de logo desde .env (validando http/https)
function getEnvLogoUrl() {
  const raw = process.env.ASSETS_URL || "";
  const ok = /^https?:\/\//i.test(raw);
  return ok ? raw : "";
}

// Tabla “key → value”, omitiendo vacíos
function renderTableRows(pairs) {
  return (pairs || [])
    .filter(([_, v]) => safe(v))
    .map(
      ([k, v]) => `
      <tr>
        <td class="cell key mobile-block"
            style="padding:10px 12px; border-bottom:1px solid #eaeaea; color:#334155; font-weight:600; vertical-align:top; width:42%;">
          ${k}
        </td>
        <td class="cell val mobile-block"
            style="padding:10px 12px; border-bottom:1px solid #eaeaea; color:#111827; vertical-align:top; word-break:break-word;">
          ${v}
        </td>
      </tr>`
    )
    .join("");
}

// Tabla de ítems de la orden
function renderItems(items = []) {
  if (!Array.isArray(items) || items.length === 0) return "";

  const rows = items
    .map((it) => {
      // Si la línea es de catering, usamos el nombre de catering
      const isCateringLine = Boolean(it.isCateringLine);
      const displayName =
        isCateringLine && it.product?.cateringName
          ? it.product.cateringName
          : it.product?.name ?? it.productId;

      return `
        <tr>
          <td class="mobile-block" style="padding:10px 12px; border-bottom:1px solid #eaeaea; word-break:break-word;">
            ${displayName}
          </td>
          <td class="mobile-block" style="padding:10px 12px; border-bottom:1px solid #eaeaea; text-align:center;">
            ${it.quantity}
          </td>
          <td class="mobile-block" style="padding:10px 12px; border-bottom:1px solid #eaeaea; text-align:right;">
            ${currency(Number(it.price || 0))}
          </td>
        </tr>`;
    })
    .join("");

  return `
    <h3 style="margin:24px 0 8px; color:#2f3b79; font-size:16px;">Items</h3>
    <table class="table" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th class="mobile-block" style="text-align:left; padding:10px 12px; border-bottom:1px solid #e5e7eb; color:#2f3b79; font-size:13px;">Product</th>
          <th class="mobile-block" style="text-align:center; padding:10px 12px; border-bottom:1px solid #e5e7eb; color:#2f3b79; font-size:13px;">Qty</th>
          <th class="mobile-block" style="text-align:right; padding:10px 12px; border-bottom:1px solid #e5e7eb; color:#2f3b79; font-size:13px;">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// (opcional robustez) compone URL sin duplicar/omitir slashes
function joinUrl(base, path) {
  const b = (base || "").replace(/\/+$/g, "");
  const p = (path || "").replace(/^\/+/g, "");
  return `${b}/${p}`;
}

// --- Email admin: HTML ---
function renderAdminNewOrderEmailHTML(order, opts = {}) {
  const resolvedLogo = safe(opts.logoUrl) ? opts.logoUrl : getEnvLogoUrl();

  const brand = {
    primary: "#2f3b79",
    bg: "#F5F7FB",
    surface: "#FFFFFF",
    text: "#1F2937",
    logoBar: "#0F172A",
    logoUrl: resolvedLogo,
    ...(opts.brand || {}),
  };

  const adminUrl = joinUrl(process.env.FRONT_URL, `/dashboard/orders/${order?.id}`);
  const itemsBlock = renderItems(order?.items);

  // Origen simple: ajusta a tu lógica real si aplica
  const origin =
    order?.customerAddress === "422 E Campbell Ave, Campbell, CA 95008"
      ? "Pickup"
      : "Delivery";

  // Resumen compacto y organizado (incluye Specifications si viene)
  const summaryPairs = [
    ["Order #", order?.orderNumber],
    ["Status", order?.status],
    ["Origin", origin],
    ["Customer", joinNonEmpty(order?.customerName, order?.customerLastname)],
    ["Email", order?.customerEmail],
    ["Phone", order?.customerPhone],
    ["Subtotal", safe(order?.subtotal) ? currency(Number(order.subtotal)) : null],
    ["Total", safe(order?.totalAmount) ? currency(Number(order.totalAmount)) : null],
    ["Payment Method", order?.paymentMethod],
    [
      "Date",
      order?.createdAt
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(order.createdAt))
        : null,
    ],
    // NUEVO: Specifications (opcional)
    ["Specifications", order?.specifications],
  ].filter(([k, v]) => safe(k) && safe(v));

  const summaryRows = renderTableRows(summaryPairs);

  return `
  <div style="background-color:${brand.bg}; padding:40px; font-family: Arial, sans-serif; color:${brand.text};">
    <style>
      img { max-width: 100%; height: auto; display: block; border: 0; }
      .container { max-width: 640px; margin: auto; background:${brand.surface}; border-radius:10px; padding:0; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
      .inner { padding:30px; }
      .table { width: 100%; border-collapse: collapse; }
      .cell { word-break: break-word; }
      .muted { color:#6B7280; }
      @media only screen and (max-width:600px) {
        .inner { padding:18px !important; }
        .mobile-block { display:block !important; width:100% !important; text-align:left !important; }
        .table th, .table td { display:block !important; width:100% !important; text-align:left !important; }
        .btn { display:inline-block !important; padding:12px 18px !important; }
      }
    </style>

    <div class="container">
      <!-- Header oscuro con logo -->
      <!--[if gte mso 9]>
      <table width="640" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td bgcolor="${brand.logoBar}" style="background:${brand.logoBar}; padding:14px 0; text-align:center; border-radius:10px 10px 0 0;">
            ${
              safe(brand.logoUrl)
                ? `<img src="${brand.logoUrl}" width="220" style="display:block;border:0;outline:none;text-decoration:none; margin:0 auto;" alt="Nox Cookie Bar">`
                : `<span style="font-size:18px;font-weight:700;color:#FFFFFF;">Nox Cookie Bar</span>`
            }
          </td>
        </tr>
      </table>
      <![endif]-->

      <!--[if !mso]><!-- -->
      <div style="background:${brand.logoBar}; text-align:center; padding:14px 0; border-radius:10px 10px 0 0;">
        ${safe(brand.logoUrl)
          ? `<img src="${brand.logoUrl}" width="220" alt="Nox Cookie Bar" style="margin:0 auto; display:block;">`
          : `<div style="color:#FFFFFF; font-weight:700; font-size:18px;">Nox Cookie Bar</div>`}
      </div>
      <!--<![endif]-->

      <div class="inner">
        <h2 style="margin:0; color:${brand.primary};">New order received</h2>
        <p style="font-size:15px; line-height:1.6; color:${brand.text}; margin-top:6px;">
          A new order has been created. Here's a quick summary:
        </p>

        <!-- Tabla de resumen organizada -->
        <table class="table" width="100%" cellspacing="0" cellpadding="0" style="margin-top:12px; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${summaryRows}
          </tbody>
        </table>

        ${itemsBlock}

        <div style="text-align:center; margin:28px 0 8px;">
          <a href="${adminUrl}"
            class="btn"
            style="background-color:${brand.primary}; color:#fff; padding:12px 22px; text-decoration:none; border-radius:6px; display:inline-block;">
            View order in dashboard
          </a>
        </div>

        <p class="muted" style="font-size:12px; color:#6B7280; margin-top:24px;">
          This is an automatic notification for administrators.
        </p>
      </div>
    </div>
  </div>
  `;
}

// --- Envío al admin ---
async function sendAdminNewOrderNotification(deps, { order, to, subject, brand, logoUrl }) {
  const adminTo = to || process.env.ADMIN_EMAIL;
  if (!safe(adminTo)) return; // o lanza error si prefieres
  const html = renderAdminNewOrderEmailHTML(order, { brand, logoUrl });
  const email = {
    to: adminTo,
    subject: subject || `New Order #${order?.orderNumber} — Nox Cookie Bar`,
    html,
  };
  return deps.sendEmail(email);
}


module.exports = {
  renderAdminNewOrderEmailHTML,
    renderAdminDeliveryCancelledEmailHTML,     
  sendAdminDeliveryCancelledNotification,   
  sendAdminNewOrderNotification,
};
