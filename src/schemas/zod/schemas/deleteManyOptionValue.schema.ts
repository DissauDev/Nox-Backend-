import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './objects/OptionValueWhereInput.schema';

export const OptionValueDeleteManySchema: z.ZodType<Prisma.OptionValueDeleteManyArgs> = z.object({ where: OptionValueWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueDeleteManyArgs>;

export const OptionValueDeleteManyZodSchema = z.object({ where: OptionValueWhereInputObjectSchema.optional() }).strict();