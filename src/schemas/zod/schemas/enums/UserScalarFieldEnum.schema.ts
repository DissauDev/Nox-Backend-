import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'email', 'name', 'subscribeEmails', 'password', 'role', 'createdAt', 'updatedAt', 'passwordResetToken', 'passwordResetExpires', 'refreshToken'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;