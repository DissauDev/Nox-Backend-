import * as z from 'zod';
import { RolesSchema } from '../../enums/Roles.schema';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().optional().nullable(),
    subscribeEmails: z.boolean(),
    password: z.string(),
    role: RolesSchema,
    orders: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
    passwordResetToken: z.string().optional().nullable(),
    passwordResetExpires: z.date().optional().nullable(),
    refreshToken: z.string().optional().nullable()
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
