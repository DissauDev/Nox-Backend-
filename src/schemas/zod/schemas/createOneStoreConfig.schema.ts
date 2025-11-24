import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './objects/StoreConfigSelect.schema';
import { StoreConfigCreateInputObjectSchema as StoreConfigCreateInputObjectSchema } from './objects/StoreConfigCreateInput.schema';
import { StoreConfigUncheckedCreateInputObjectSchema as StoreConfigUncheckedCreateInputObjectSchema } from './objects/StoreConfigUncheckedCreateInput.schema';

export const StoreConfigCreateOneSchema: z.ZodType<Prisma.StoreConfigCreateArgs> = z.object({ select: StoreConfigSelectObjectSchema.optional(),  data: z.union([StoreConfigCreateInputObjectSchema, StoreConfigUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StoreConfigCreateArgs>;

export const StoreConfigCreateOneZodSchema = z.object({ select: StoreConfigSelectObjectSchema.optional(),  data: z.union([StoreConfigCreateInputObjectSchema, StoreConfigUncheckedCreateInputObjectSchema]) }).strict();