import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './objects/OptionGroupInclude.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './objects/OptionGroupWhereUniqueInput.schema';
import { OptionGroupCreateInputObjectSchema as OptionGroupCreateInputObjectSchema } from './objects/OptionGroupCreateInput.schema';
import { OptionGroupUncheckedCreateInputObjectSchema as OptionGroupUncheckedCreateInputObjectSchema } from './objects/OptionGroupUncheckedCreateInput.schema';
import { OptionGroupUpdateInputObjectSchema as OptionGroupUpdateInputObjectSchema } from './objects/OptionGroupUpdateInput.schema';
import { OptionGroupUncheckedUpdateInputObjectSchema as OptionGroupUncheckedUpdateInputObjectSchema } from './objects/OptionGroupUncheckedUpdateInput.schema';

export const OptionGroupUpsertOneSchema: z.ZodType<Prisma.OptionGroupUpsertArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), where: OptionGroupWhereUniqueInputObjectSchema, create: z.union([ OptionGroupCreateInputObjectSchema, OptionGroupUncheckedCreateInputObjectSchema ]), update: z.union([ OptionGroupUpdateInputObjectSchema, OptionGroupUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OptionGroupUpsertArgs>;

export const OptionGroupUpsertOneZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), where: OptionGroupWhereUniqueInputObjectSchema, create: z.union([ OptionGroupCreateInputObjectSchema, OptionGroupUncheckedCreateInputObjectSchema ]), update: z.union([ OptionGroupUpdateInputObjectSchema, OptionGroupUncheckedUpdateInputObjectSchema ]) }).strict();