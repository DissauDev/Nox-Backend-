import * as z from 'zod';

export const StoreConfigScalarFieldEnumSchema = z.enum(['id', 'taxEnabled', 'taxPercent', 'taxFixed', 'createdAt', 'updatedAt', 'taxLabel'])

export type StoreConfigScalarFieldEnum = z.infer<typeof StoreConfigScalarFieldEnumSchema>;