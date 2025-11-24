import * as z from 'zod';
import { RolesSchema } from '../../enums/Roles.schema';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable(),
    subscribeEmails: z.boolean(),
    password: z.string(),
    role: RolesSchema,
    orders: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
    passwordResetToken: z.string().nullable(),
    passwordResetExpires: z.date().nullable(),
    refreshToken: z.string().nullable()
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
