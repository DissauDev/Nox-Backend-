import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './objects/OptionValueSelect.schema';
import { OptionValueIncludeObjectSchema as OptionValueIncludeObjectSchema } from './objects/OptionValueInclude.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './objects/OptionValueWhereUniqueInput.schema';

export const OptionValueFindUniqueOrThrowSchema: z.ZodType<Prisma.OptionValueFindUniqueOrThrowArgs> = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), where: OptionValueWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OptionValueFindUniqueOrThrowArgs>;

export const OptionValueFindUniqueOrThrowZodSchema = z.object({ select: OptionValueSelectObjectSchema.optional(), include: OptionValueIncludeObjectSchema.optional(), where: OptionValueWhereUniqueInputObjectSchema }).strict();