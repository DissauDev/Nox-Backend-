import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupUpdateManyMutationInputObjectSchema as OptionGroupUpdateManyMutationInputObjectSchema } from './objects/OptionGroupUpdateManyMutationInput.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './objects/OptionGroupWhereInput.schema';

export const OptionGroupUpdateManySchema: z.ZodType<Prisma.OptionGroupUpdateManyArgs> = z.object({ data: OptionGroupUpdateManyMutationInputObjectSchema, where: OptionGroupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupUpdateManyArgs>;

export const OptionGroupUpdateManyZodSchema = z.object({ data: OptionGroupUpdateManyMutationInputObjectSchema, where: OptionGroupWhereInputObjectSchema.optional() }).strict();