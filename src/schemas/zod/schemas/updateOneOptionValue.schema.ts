import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './objects/OptionValueSelect.schema';
import { OptionValueIncludeObjectSchema as OptionValueIncludeObjectSchema } from './objects/OptionValueInclude.schema';
import { OptionValueUpdateInputObjectSchema as OptionValueUpdateInputObjectSchema } from './objects/OptionValueUpdateInput.schema';
import { OptionValueUncheckedUpdateInputObjectSchema as OptionValueUncheckedUpdateInputObjectSchema } from './objects/OptionValueUncheckedUpdateInput.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './objects/OptionValueWhereUniqueInput.schema';

export const OptionValueUpdateOneSchema: z.ZodType<Prisma.OptionValueUpdateArgs> = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), data: z.union([OptionValueUpdateInputObjectSchema, OptionValueUncheckedUpdateInputObjectSchema]), where: OptionValueWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OptionValueUpdateArgs>;

export const OptionValueUpdateOneZodSchema = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), data: z.union([OptionValueUpdateInputObjectSchema, OptionValueUncheckedUpdateInputObjectSchema]), where: OptionValueWhereUniqueInputObjectSchema }).strict();