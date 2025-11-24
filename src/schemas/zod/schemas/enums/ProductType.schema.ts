import * as z from 'zod';

export const ProductTypeSchema = z.enum(['REGULAR', 'SEASONAL'])

export type ProductType = z.infer<typeof ProductTypeSchema>;