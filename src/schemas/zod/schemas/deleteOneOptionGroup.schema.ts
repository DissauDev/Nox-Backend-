import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './objects/OptionGroupInclude.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './objects/OptionGroupWhereUniqueInput.schema';

export const OptionGroupDeleteOneSchema: z.ZodType<Prisma.OptionGroupDeleteArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), where: OptionGroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OptionGroupDeleteArgs>;

export const OptionGroupDeleteOneZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), where: OptionGroupWhereUniqueInputObjectSchema }).strict();