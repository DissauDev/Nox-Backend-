import * as z from 'zod';

export const OrderStatusSchema = z.enum(['PENDING', 'PAID', 'PROCESSING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED', 'REFUNDED', 'FAILED'])

export type OrderStatus = z.infer<typeof OrderStatusSchema>;