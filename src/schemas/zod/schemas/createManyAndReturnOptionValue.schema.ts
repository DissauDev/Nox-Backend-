import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './objects/OptionValueSelect.schema';
import { OptionValueCreateManyInputObjectSchema as OptionValueCreateManyInputObjectSchema } from './objects/OptionValueCreateManyInput.schema';

export const OptionValueCreateManyAndReturnSchema: z.ZodType<Prisma.OptionValueCreateManyAndReturnArgs> = z.object({ select: OptionValueSelectObjectSchema.optional(), data: z.union([ OptionValueCreateManyInputObjectSchema, z.array(OptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueCreateManyAndReturnArgs>;

export const OptionValueCreateManyAndReturnZodSchema = z.object({ select: OptionValueSelectObjectSchema.optional(), data: z.union([ OptionValueCreateManyInputObjectSchema, z.array(OptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();