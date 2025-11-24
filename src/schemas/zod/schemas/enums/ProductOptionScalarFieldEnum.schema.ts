import * as z from 'zod';

export const ProductOptionScalarFieldEnumSchema = z.enum(['id', 'productId', 'groupId', 'sortOrder'])

export type ProductOptionScalarFieldEnum = z.infer<typeof ProductOptionScalarFieldEnumSchema>;