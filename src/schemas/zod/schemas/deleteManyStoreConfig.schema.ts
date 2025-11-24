import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigWhereInputObjectSchema as StoreConfigWhereInputObjectSchema } from './objects/StoreConfigWhereInput.schema';

export const StoreConfigDeleteManySchema: z.ZodType<Prisma.StoreConfigDeleteManyArgs> = z.object({ where: StoreConfigWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigDeleteManyArgs>;

export const StoreConfigDeleteManyZodSchema = z.object({ where: StoreConfigWhereInputObjectSchema.optional() }).strict();