// src/utils/orderEmail.util.js

const currency = (n) => (typeof n === "number" ? `$${n.toFixed(2)}` : n);
const safe = (v) => v !== null && v !== undefined && String(v).trim() !== "";
const joinNonEmpty = (...parts) => parts.filter(safe).join(" ");

function buildAddressParts(order) {
  const address = order?.customerAddress; // line1
  const aptCompany = [order?.apartment, order?.company].filter(safe).join(" · ");
  const cityState = [order?.billingCity, order?.billingState].filter(safe).join(", ");
  const cityStateZip = [cityState, order?.zipcode].filter(safe).join(" ");
  return { address, aptCompany, cityStateZip };
}

// Valida que la URL sea http(s) absoluto
function getEnvLogoUrl() {
  const raw = process.env.ASSETS_URL || ""; // Debe ser la URL COMPLETA a la imagen
  const ok = /^https?:\/\//i.test(raw);
  return ok ? raw : "";
}

// Tabla “key → value”, omitiendo vacíos (2 columnas fluidas y apilables)
function renderTableRows(pairs) {
  return pairs
    .filter(([_, v]) => safe(v))
    .map(
      ([k, v]) => `
      <tr>
        <td class="cell key mobile-block"
            style="padding:8px 12px; border-bottom:1px solid #eee; color:#445; font-weight:600; vertical-align:top;">
          ${k}
        </td>
        <td class="cell val mobile-block"
            style="padding:8px 12px; border-bottom:1px solid #eee; color:#333; vertical-align:top; word-break:break-word;">
          ${v}
        </td>
      </tr>`
    )
    .join("");
}

// Tabla de items (3 columnas, se apilan en móvil)
function renderItems(items = []) {
  if (!Array.isArray(items) || items.length === 0) return "";

  const rows = items
    .map((it) => {
      // 👇 si la línea es de catering, usamos el nombre de catering
      const isCateringLine = Boolean(it.isCateringLine);
      const displayName =
        isCateringLine && it.product?.cateringName
          ? it.product.cateringName
          : it.product?.name ?? it.productId;

      return `
        <tr>
          <td class="mobile-block" style="padding:8px 12px; border-bottom:1px solid #eee; word-break:break-word;">
            ${displayName}
          </td>
          <td class="mobile-block" style="padding:8px 12px; border-bottom:1px solid #eee; text-align:center;">
            ${it.quantity}
          </td>
          <td class="mobile-block" style="padding:8px 12px; border-bottom:1px solid #eee; text-align:right;">
            ${currency(Number(it.price || 0))}
          </td>
        </tr>`;
    })
    .join("");

  return `
    <h3 style="margin:24px 0 8px; color:#2f3b79;">Items</h3>
    <table class="table" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <thead>
        <tr>
          <th class="mobile-block" style="text-align:left; padding:8px 12px; border-bottom:2px solid #2f3b79; color:#2f3b79;">Product</th>
          <th class="mobile-block" style="text-align:center; padding:8px 12px; border-bottom:2px solid #2f3b79; color:#2f3b79;">Qty</th>
          <th class="mobile-block" style="text-align:right; padding:8px 12px; border-bottom:2px solid #2f3b79; color:#2f3b79;">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderOrderEmailHTML(order, opts = {}) {
  const resolvedLogo = safe(opts.logoUrl) ? opts.logoUrl : getEnvLogoUrl();

  const brand = {
    // Colores base
    primary: "#2f3b79",   // textos/accent
    bg: "#F5F7FB",        // fondo exterior
    surface: "#FFFFFF",   // tarjeta principal
    text: "#1F2937",      // texto normal
    logoBar: "#0F172A",   // barra OSCURA detrás del logo (Outlook-friendly)
    logoUrl: resolvedLogo,
    ...(opts.brand || {}),
  };

  const { address, aptCompany, cityStateZip } = buildAddressParts(order);

  const infoPairs = [
    ["Order #", order?.orderNumber],
    ["Status", order?.status],
    ["Customer", joinNonEmpty(order?.customerName, order?.customerLastname)],
    ["Email", order?.customerEmail],
    ["Phone", order?.customerPhone],
    // Dirección (reordenada y clara)
    ["Address", address],
    [safe(aptCompany) ? "Apartment · Company" : null, safe(aptCompany) ? aptCompany : null],
    [safe(cityStateZip) ? "City, State ZIP" : null, safe(cityStateZip) ? cityStateZip : null],
    // Totales
    ["Subtotal", safe(order?.subtotal) ? currency(Number(order.subtotal)) : null],
    ["Total", safe(order?.totalAmount) ? currency(Number(order.totalAmount)) : null],
    ["Payment Method", order?.paymentMethod],
    ["Specifications", order?.specifications],
  ].filter(([k]) => safe(k));

  const tableRows = renderTableRows(infoPairs);
  const itemsBlock = renderItems(order?.items);
  const orderUrl = `${process.env.FRONT_URL}/ordersClient/${order?.id}`;

  return `
  <div style="background-color:${brand.bg}; padding:40px; font-family: Arial, sans-serif; color:${brand.text};">
    <style>
      img { max-width: 100%; height: auto; display: block; border: 0; }
      .container { max-width: 640px; margin: auto; background:${brand.surface}; border-radius:10px; padding:0; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
      .inner { padding:30px; }
      .table { width: 100%; }
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
      <!-- Barra oscura para el logo (Outlook compatible con VML) -->
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

      <!-- Versión estándar (no Outlook) -->
      <!--[if !mso]><!-- -->
      <div style="background:${brand.logoBar}; text-align:center; padding:14px 0; border-radius:10px 10px 0 0;">
        ${safe(brand.logoUrl)
          ? `<img src="${brand.logoUrl}" width="220" alt="Nox Cookie Bar" style="margin:0 auto; display:block;">`
          : `<div style="color:#FFFFFF; font-weight:700; font-size:18px;">Nox Cookie Bar</div>`}
      </div>
      <!--<![endif]-->

      <div class="inner">
        <h2 style="margin:0; color:${brand.primary};">Thanks for your purchase!</h2>
        <p style="font-size:15px; line-height:1.6; color:${brand.text}; margin-top:6px;">
          Hi <strong>${order?.customerName ?? "Customer"}</strong>, we’ve received your order. Here are the details:
        </p>

        <table class="table" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-top:12px;">
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        ${itemsBlock}

        <div style="text-align:center; margin:28px 0 8px;">
          <a href="${orderUrl}"
            class="btn"
            style="background-color:${brand.primary}; color:#fff; padding:12px 22px; text-decoration:none; border-radius:6px; display:inline-block;">
            View your order
          </a>
        </div>

        <p class="muted" style="font-size:12px; color:#6B7280; margin-top:24px;">
          If you have any questions, just reply to this email and we'll be happy to help.
        </p>
        <p class="muted" style="font-size:12px; color:#6B7280; margin-top:18px;">
          — Nox Cookie Bar Team
        </p>
      </div>
    </div>
  </div>
  `;
}


/**
 * Envía el correo de confirmación de orden.
 * @param {Object} deps { sendEmail }
 * @param {Object} params { order, to, attachPdf=false, pdfBuffer?, subject?, brand?, logoUrl? }
 */
async function sendOrderConfirmation(deps, { order, to, attachPdf = false, pdfBuffer, subject, brand, logoUrl }) {
  const html = renderOrderEmailHTML(order, { brand, logoUrl });
  const email = {
    to: to ?? order?.customerEmail,
    subject: subject ?? `Your Order #${order?.orderNumber} - Nox Cookie Bar`,
    html,
  };

  if (attachPdf && pdfBuffer) {
    email.attachments = [
      { filename: `Order_${order?.orderNumber}.pdf`, content: pdfBuffer },
    ];
  }

  return deps.sendEmail(email);
}

module.exports = {
  renderOrderEmailHTML,
  sendOrderConfirmation,
};
