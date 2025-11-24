import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './objects/StoreConfigSelect.schema';
import { StoreConfigWhereUniqueInputObjectSchema as StoreConfigWhereUniqueInputObjectSchema } from './objects/StoreConfigWhereUniqueInput.schema';
import { StoreConfigCreateInputObjectSchema as StoreConfigCreateInputObjectSchema } from './objects/StoreConfigCreateInput.schema';
import { StoreConfigUncheckedCreateInputObjectSchema as StoreConfigUncheckedCreateInputObjectSchema } from './objects/StoreConfigUncheckedCreateInput.schema';
import { StoreConfigUpdateInputObjectSchema as StoreConfigUpdateInputObjectSchema } from './objects/StoreConfigUpdateInput.schema';
import { StoreConfigUncheckedUpdateInputObjectSchema as StoreConfigUncheckedUpdateInputObjectSchema } from './objects/StoreConfigUncheckedUpdateInput.schema';

export const StoreConfigUpsertOneSchema: z.ZodType<Prisma.StoreConfigUpsertArgs> = z.object({ select: StoreConfigSelectObjectSchema.optional(),  where: StoreConfigWhereUniqueInputObjectSchema, create: z.union([ StoreConfigCreateInputObjectSchema, StoreConfigUncheckedCreateInputObjectSchema ]), update: z.union([ StoreConfigUpdateInputObjectSchema, StoreConfigUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StoreConfigUpsertArgs>;

export const StoreConfigUpsertOneZodSchema = z.object({ select: StoreConfigSelectObjectSchema.optional(),  where: StoreConfigWhereUniqueInputObjectSchema, create: z.union([ StoreConfigCreateInputObjectSchema, StoreConfigUncheckedCreateInputObjectSchema ]), update: z.union([ StoreConfigUpdateInputObjectSchema, StoreConfigUncheckedUpdateInputObjectSchema ]) }).strict();