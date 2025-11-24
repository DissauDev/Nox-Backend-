import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './objects/OptionGroupInclude.schema';
import { OptionGroupCreateInputObjectSchema as OptionGroupCreateInputObjectSchema } from './objects/OptionGroupCreateInput.schema';
import { OptionGroupUncheckedCreateInputObjectSchema as OptionGroupUncheckedCreateInputObjectSchema } from './objects/OptionGroupUncheckedCreateInput.schema';

export const OptionGroupCreateOneSchema: z.ZodType<Prisma.OptionGroupCreateArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), data: z.union([OptionGroupCreateInputObjectSchema, OptionGroupUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OptionGroupCreateArgs>;

export const OptionGroupCreateOneZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), data: z.union([OptionGroupCreateInputObjectSchema, OptionGroupUncheckedCreateInputObjectSchema]) }).strict();