import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigCreateManyInputObjectSchema as StoreConfigCreateManyInputObjectSchema } from './objects/StoreConfigCreateManyInput.schema';

export const StoreConfigCreateManySchema: z.ZodType<Prisma.StoreConfigCreateManyArgs> = z.object({ data: z.union([ StoreConfigCreateManyInputObjectSchema, z.array(StoreConfigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigCreateManyArgs>;

export const StoreConfigCreateManyZodSchema = z.object({ data: z.union([ StoreConfigCreateManyInputObjectSchema, z.array(StoreConfigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();