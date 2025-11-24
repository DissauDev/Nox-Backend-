import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupCreateManyInputObjectSchema as OptionGroupCreateManyInputObjectSchema } from './objects/OptionGroupCreateManyInput.schema';

export const OptionGroupCreateManySchema: z.ZodType<Prisma.OptionGroupCreateManyArgs> = z.object({ data: z.union([ OptionGroupCreateManyInputObjectSchema, z.array(OptionGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupCreateManyArgs>;

export const OptionGroupCreateManyZodSchema = z.object({ data: z.union([ OptionGroupCreateManyInputObjectSchema, z.array(OptionGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();