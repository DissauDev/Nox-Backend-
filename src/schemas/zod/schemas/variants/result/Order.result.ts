import * as z from 'zod';
import { OrderStatusSchema } from '../../enums/OrderStatus.schema';
// prettier-ignore
export const OrderResultSchema = z.object({
    id: z.string(),
    orderNumber: z.string(),
    status: OrderStatusSchema,
    createdAt: z.date(),
    totalAmount: z.number(),
    subtotal: z.number(),
    paymentMethod: z.string(),
    stripePaymentIntentId: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    customerName: z.string(),
    customerLastname: z.string().nullable(),
    customerEmail: z.string(),
    customerPhone: z.string().nullable(),
    customerAddress: z.string(),
    apartment: z.string().nullable(),
    company: z.string().nullable(),
    billingCity: z.string().nullable(),
    billingState: z.string().nullable(),
    zipcode: z.string().nullable(),
    specifications: z.string().nullable(),
    items: z.array(z.unknown())
}).strict();

export type OrderResultType = z.infer<typeof OrderResultSchema>;
