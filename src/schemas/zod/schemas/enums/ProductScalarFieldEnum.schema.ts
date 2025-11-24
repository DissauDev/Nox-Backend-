import * as z from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'name', 'price', 'salePrice', 'specifications', 'description', 'imageLeft', 'imageRight', 'type', 'status', 'categoryId', 'createdAt', 'updatedAt', 'sortOrder', 'isOptionItem', 'packOptionSurcharge', 'packMaxItems'])

export type ProductScalarFieldEnum = z.infer<typeof ProductScalarFieldEnumSchema>;