import * as z from 'zod';

export const CategoryScalarFieldEnumSchema = z.enum(['id', 'name', 'status', 'onCarousel', 'imageUrl', 'shortDescription', 'longDescription', 'createdAt', 'sortOrder'])

export type CategoryScalarFieldEnum = z.infer<typeof CategoryScalarFieldEnumSchema>;