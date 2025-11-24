import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './objects/StoreConfigSelect.schema';
import { StoreConfigCreateManyInputObjectSchema as StoreConfigCreateManyInputObjectSchema } from './objects/StoreConfigCreateManyInput.schema';

export const StoreConfigCreateManyAndReturnSchema: z.ZodType<Prisma.StoreConfigCreateManyAndReturnArgs> = z.object({ select: StoreConfigSelectObjectSchema.optional(), data: z.union([ StoreConfigCreateManyInputObjectSchema, z.array(StoreConfigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigCreateManyAndReturnArgs>;

export const StoreConfigCreateManyAndReturnZodSchema = z.object({ select: StoreConfigSelectObjectSchema.optional(), data: z.union([ StoreConfigCreateManyInputObjectSchema, z.array(StoreConfigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();