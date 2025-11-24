import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './objects/OptionValueSelect.schema';
import { OptionValueUpdateManyMutationInputObjectSchema as OptionValueUpdateManyMutationInputObjectSchema } from './objects/OptionValueUpdateManyMutationInput.schema';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './objects/OptionValueWhereInput.schema';

export const OptionValueUpdateManyAndReturnSchema: z.ZodType<Prisma.OptionValueUpdateManyAndReturnArgs> = z.object({ select: OptionValueSelectObjectSchema.optional(), data: OptionValueUpdateManyMutationInputObjectSchema, where: OptionValueWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueUpdateManyAndReturnArgs>;

export const OptionValueUpdateManyAndReturnZodSchema = z.object({ select: OptionValueSelectObjectSchema.optional(), data: OptionValueUpdateManyMutationInputObjectSchema, where: OptionValueWhereInputObjectSchema.optional() }).strict();