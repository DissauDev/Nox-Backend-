import * as z from 'zod';
import { OrderStatusSchema } from '../../enums/OrderStatus.schema';
// prettier-ignore
export const OrderInputSchema = z.object({
    id: z.string(),
    orderNumber: z.string(),
    status: OrderStatusSchema,
    createdAt: z.date(),
    totalAmount: z.number(),
    subtotal: z.number(),
    paymentMethod: z.string(),
    stripePaymentIntentId: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    customerName: z.string(),
    customerLastname: z.string().optional().nullable(),
    customerEmail: z.string(),
    customerPhone: z.string().optional().nullable(),
    customerAddress: z.string(),
    apartment: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
    billingCity: z.string().optional().nullable(),
    billingState: z.string().optional().nullable(),
    zipcode: z.string().optional().nullable(),
    specifications: z.string().optional().nullable(),
    items: z.array(z.unknown())
}).strict();

export type OrderInputType = z.infer<typeof OrderInputSchema>;
