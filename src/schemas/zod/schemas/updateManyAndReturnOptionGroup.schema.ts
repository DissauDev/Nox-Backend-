import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupUpdateManyMutationInputObjectSchema as OptionGroupUpdateManyMutationInputObjectSchema } from './objects/OptionGroupUpdateManyMutationInput.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './objects/OptionGroupWhereInput.schema';

export const OptionGroupUpdateManyAndReturnSchema: z.ZodType<Prisma.OptionGroupUpdateManyAndReturnArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), data: OptionGroupUpdateManyMutationInputObjectSchema, where: OptionGroupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupUpdateManyAndReturnArgs>;

export const OptionGroupUpdateManyAndReturnZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), data: OptionGroupUpdateManyMutationInputObjectSchema, where: OptionGroupWhereInputObjectSchema.optional() }).strict();