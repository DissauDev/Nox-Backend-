import * as z from 'zod';

export const OptionValueScalarFieldEnumSchema = z.enum(['id', 'groupId', 'name', 'extraPrice', 'imageUrl', 'description', 'isAvailable', 'productRefId', 'sortOrder'])

export type OptionValueScalarFieldEnum = z.infer<typeof OptionValueScalarFieldEnumSchema>;