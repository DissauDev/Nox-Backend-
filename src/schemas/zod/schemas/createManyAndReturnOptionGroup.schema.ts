import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupCreateManyInputObjectSchema as OptionGroupCreateManyInputObjectSchema } from './objects/OptionGroupCreateManyInput.schema';

export const OptionGroupCreateManyAndReturnSchema: z.ZodType<Prisma.OptionGroupCreateManyAndReturnArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), data: z.union([ OptionGroupCreateManyInputObjectSchema, z.array(OptionGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupCreateManyAndReturnArgs>;

export const OptionGroupCreateManyAndReturnZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), data: z.union([ OptionGroupCreateManyInputObjectSchema, z.array(OptionGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();