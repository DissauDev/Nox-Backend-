import * as z from 'zod';

export const PageScalarFieldEnumSchema = z.enum(['id', 'title', 'slug', 'layout', 'isPublished', 'createdAt', 'updatedAt', 'author'])

export type PageScalarFieldEnum = z.infer<typeof PageScalarFieldEnumSchema>;