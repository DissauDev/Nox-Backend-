import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './objects/OptionGroupInclude.schema';
import { OptionGroupUpdateInputObjectSchema as OptionGroupUpdateInputObjectSchema } from './objects/OptionGroupUpdateInput.schema';
import { OptionGroupUncheckedUpdateInputObjectSchema as OptionGroupUncheckedUpdateInputObjectSchema } from './objects/OptionGroupUncheckedUpdateInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './objects/OptionGroupWhereUniqueInput.schema';

export const OptionGroupUpdateOneSchema: z.ZodType<Prisma.OptionGroupUpdateArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), data: z.union([OptionGroupUpdateInputObjectSchema, OptionGroupUncheckedUpdateInputObjectSchema]), where: OptionGroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OptionGroupUpdateArgs>;

export const OptionGroupUpdateOneZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), data: z.union([OptionGroupUpdateInputObjectSchema, OptionGroupUncheckedUpdateInputObjectSchema]), where: OptionGroupWhereUniqueInputObjectSchema }).strict();