import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './objects/OptionValueSelect.schema';
import { OptionValueIncludeObjectSchema as OptionValueIncludeObjectSchema } from './objects/OptionValueInclude.schema';
import { OptionValueCreateInputObjectSchema as OptionValueCreateInputObjectSchema } from './objects/OptionValueCreateInput.schema';
import { OptionValueUncheckedCreateInputObjectSchema as OptionValueUncheckedCreateInputObjectSchema } from './objects/OptionValueUncheckedCreateInput.schema';

export const OptionValueCreateOneSchema: z.ZodType<Prisma.OptionValueCreateArgs> = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), data: z.union([OptionValueCreateInputObjectSchema, OptionValueUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OptionValueCreateArgs>;

export const OptionValueCreateOneZodSchema = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), data: z.union([OptionValueCreateInputObjectSchema, OptionValueUncheckedCreateInputObjectSchema]) }).strict();