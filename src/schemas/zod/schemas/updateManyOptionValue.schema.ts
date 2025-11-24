import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueUpdateManyMutationInputObjectSchema as OptionValueUpdateManyMutationInputObjectSchema } from './objects/OptionValueUpdateManyMutationInput.schema';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './objects/OptionValueWhereInput.schema';

export const OptionValueUpdateManySchema: z.ZodType<Prisma.OptionValueUpdateManyArgs> = z.object({ data: OptionValueUpdateManyMutationInputObjectSchema, where: OptionValueWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueUpdateManyArgs>;

export const OptionValueUpdateManyZodSchema = z.object({ data: OptionValueUpdateManyMutationInputObjectSchema, where: OptionValueWhereInputObjectSchema.optional() }).strict();