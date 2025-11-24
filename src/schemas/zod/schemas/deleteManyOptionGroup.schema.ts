import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './objects/OptionGroupWhereInput.schema';

export const OptionGroupDeleteManySchema: z.ZodType<Prisma.OptionGroupDeleteManyArgs> = z.object({ where: OptionGroupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupDeleteManyArgs>;

export const OptionGroupDeleteManyZodSchema = z.object({ where: OptionGroupWhereInputObjectSchema.optional() }).strict();