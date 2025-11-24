import * as z from 'zod';

export const RolesSchema = z.enum(['USER', 'ADMIN', 'EMPLOYEE'])

export type Roles = z.infer<typeof RolesSchema>;