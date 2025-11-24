import * as z from 'zod';
// prettier-ignore
export const OrderItemModelSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    productId: z.string(),
    quantity: z.number().int(),
    price: z.number(),
    chosenOptions: z.unknown().nullable(),
    order: z.unknown(),
    product: z.unknown()
}).strict();

export type OrderItemPureType = z.infer<typeof OrderItemModelSchema>;
