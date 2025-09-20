// src/lib/stripe.js
const Stripe = require('stripe');
function makeStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
}
module.exports = { makeStripe };
