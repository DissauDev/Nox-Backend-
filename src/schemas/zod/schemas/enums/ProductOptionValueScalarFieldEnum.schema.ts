import * as z from 'zod';

export const ProductOptionValueScalarFieldEnumSchema = z.enum(['id', 'productOptionId', 'valueId'])

export type ProductOptionValueScalarFieldEnum = z.infer<typeof ProductOptionValueScalarFieldEnumSchema>;