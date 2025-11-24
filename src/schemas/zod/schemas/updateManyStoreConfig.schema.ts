import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigUpdateManyMutationInputObjectSchema as StoreConfigUpdateManyMutationInputObjectSchema } from './objects/StoreConfigUpdateManyMutationInput.schema';
import { StoreConfigWhereInputObjectSchema as StoreConfigWhereInputObjectSchema } from './objects/StoreConfigWhereInput.schema';

export const StoreConfigUpdateManySchema: z.ZodType<Prisma.StoreConfigUpdateManyArgs> = z.object({ data: StoreConfigUpdateManyMutationInputObjectSchema, where: StoreConfigWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigUpdateManyArgs>;

export const StoreConfigUpdateManyZodSchema = z.object({ data: StoreConfigUpdateManyMutationInputObjectSchema, where: StoreConfigWhereInputObjectSchema.optional() }).strict();