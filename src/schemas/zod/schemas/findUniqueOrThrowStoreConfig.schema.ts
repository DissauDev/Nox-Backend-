import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './objects/StoreConfigSelect.schema';
import { StoreConfigWhereUniqueInputObjectSchema as StoreConfigWhereUniqueInputObjectSchema } from './objects/StoreConfigWhereUniqueInput.schema';

export const StoreConfigFindUniqueOrThrowSchema: z.ZodType<Prisma.StoreConfigFindUniqueOrThrowArgs> = z.object({ select: StoreConfigSelectObjectSchema.optional(),  where: StoreConfigWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoreConfigFindUniqueOrThrowArgs>;

export const StoreConfigFindUniqueOrThrowZodSchema = z.object({ select: StoreConfigSelectObjectSchema.optional(),  where: StoreConfigWhereUniqueInputObjectSchema }).strict();