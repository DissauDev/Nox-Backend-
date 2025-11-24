import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueCreateManyInputObjectSchema as OptionValueCreateManyInputObjectSchema } from './objects/OptionValueCreateManyInput.schema';

export const OptionValueCreateManySchema: z.ZodType<Prisma.OptionValueCreateManyArgs> = z.object({ data: z.union([ OptionValueCreateManyInputObjectSchema, z.array(OptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueCreateManyArgs>;

export const OptionValueCreateManyZodSchema = z.object({ data: z.union([ OptionValueCreateManyInputObjectSchema, z.array(OptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();