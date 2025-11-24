import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './objects/OptionValueSelect.schema';
import { OptionValueIncludeObjectSchema as OptionValueIncludeObjectSchema } from './objects/OptionValueInclude.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './objects/OptionValueWhereUniqueInput.schema';
import { OptionValueCreateInputObjectSchema as OptionValueCreateInputObjectSchema } from './objects/OptionValueCreateInput.schema';
import { OptionValueUncheckedCreateInputObjectSchema as OptionValueUncheckedCreateInputObjectSchema } from './objects/OptionValueUncheckedCreateInput.schema';
import { OptionValueUpdateInputObjectSchema as OptionValueUpdateInputObjectSchema } from './objects/OptionValueUpdateInput.schema';
import { OptionValueUncheckedUpdateInputObjectSchema as OptionValueUncheckedUpdateInputObjectSchema } from './objects/OptionValueUncheckedUpdateInput.schema';

export const OptionValueUpsertOneSchema: z.ZodType<Prisma.OptionValueUpsertArgs> = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), where: OptionValueWhereUniqueInputObjectSchema, create: z.union([ OptionValueCreateInputObjectSchema, OptionValueUncheckedCreateInputObjectSchema ]), update: z.union([ OptionValueUpdateInputObjectSchema, OptionValueUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OptionValueUpsertArgs>;

export const OptionValueUpsertOneZodSchema = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), where: OptionValueWhereUniqueInputObjectSchema, create: z.union([ OptionValueCreateInputObjectSchema, OptionValueUncheckedCreateInputObjectSchema ]), update: z.union([ OptionValueUpdateInputObjectSchema, OptionValueUncheckedUpdateInputObjectSchema ]) }).strict();