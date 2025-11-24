import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './objects/StoreConfigSelect.schema';
import { StoreConfigUpdateManyMutationInputObjectSchema as StoreConfigUpdateManyMutationInputObjectSchema } from './objects/StoreConfigUpdateManyMutationInput.schema';
import { StoreConfigWhereInputObjectSchema as StoreConfigWhereInputObjectSchema } from './objects/StoreConfigWhereInput.schema';

export const StoreConfigUpdateManyAndReturnSchema: z.ZodType<Prisma.StoreConfigUpdateManyAndReturnArgs> = z.object({ select: StoreConfigSelectObjectSchema.optional(), data: StoreConfigUpdateManyMutationInputObjectSchema, where: StoreConfigWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigUpdateManyAndReturnArgs>;

export const StoreConfigUpdateManyAndReturnZodSchema = z.object({ select: StoreConfigSelectObjectSchema.optional(), data: StoreConfigUpdateManyMutationInputObjectSchema, where: StoreConfigWhereInputObjectSchema.optional() }).strict();