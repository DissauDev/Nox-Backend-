// src/utils/email.js
const nodemailer = require('nodemailer');
require('dotenv').config();
async function sendEmail({ to, subject, html }) {
  // Ejemplo usando nodemailer/gmail. Ajusta según tu proveedor SMTP.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ||'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true si usas SSL
    auth: {
        user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM, 
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };
