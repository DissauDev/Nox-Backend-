import * as z from 'zod';

export const OptionGroupScalarFieldEnumSchema = z.enum(['id', 'name', 'required', 'minSelectable', 'maxSelectable', 'isAvailable', 'showImages', 'selectionTitle'])

export type OptionGroupScalarFieldEnum = z.infer<typeof OptionGroupScalarFieldEnumSchema>;