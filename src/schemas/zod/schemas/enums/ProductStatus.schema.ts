import * as z from 'zod';

export const ProductStatusSchema = z.enum(['AVAILABLE', 'DISABLED', 'OUT_OF_STOCK'])

export type ProductStatus = z.infer<typeof ProductStatusSchema>;