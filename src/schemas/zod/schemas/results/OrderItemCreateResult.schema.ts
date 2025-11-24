import * as z from 'zod';
export const OrderItemCreateResultSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number().int(),
  price: z.number(),
  chosenOptions: z.unknown().optional(),
  order: z.unknown(),
  product: z.unknown()
});