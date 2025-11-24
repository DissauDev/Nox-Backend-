import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './objects/StoreConfigSelect.schema';
import { StoreConfigWhereUniqueInputObjectSchema as StoreConfigWhereUniqueInputObjectSchema } from './objects/StoreConfigWhereUniqueInput.schema';

export const StoreConfigDeleteOneSchema: z.ZodType<Prisma.StoreConfigDeleteArgs> = z.object({ select: StoreConfigSelectObjectSchema.optional(),  where: StoreConfigWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoreConfigDeleteArgs>;

export const StoreConfigDeleteOneZodSchema = z.object({ select: StoreConfigSelectObjectSchema.optional(),  where: StoreConfigWhereUniqueInputObjectSchema }).strict();