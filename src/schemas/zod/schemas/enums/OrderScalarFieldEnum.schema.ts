import * as z from 'zod';

export const OrderScalarFieldEnumSchema = z.enum(['id', 'orderNumber', 'status', 'createdAt', 'totalAmount', 'subtotal', 'paymentMethod', 'stripePaymentIntentId', 'userId', 'customerName', 'customerLastname', 'customerEmail', 'customerPhone', 'customerAddress', 'apartment', 'company', 'billingCity', 'billingState', 'zipcode', 'specifications'])

export type OrderScalarFieldEnum = z.infer<typeof OrderScalarFieldEnumSchema>;