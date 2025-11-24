import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './objects/OptionGroupSelect.schema';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './objects/OptionGroupInclude.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './objects/OptionGroupWhereUniqueInput.schema';

export const OptionGroupFindUniqueOrThrowSchema: z.ZodType<Prisma.OptionGroupFindUniqueOrThrowArgs> = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), where: OptionGroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OptionGroupFindUniqueOrThrowArgs>;

export const OptionGroupFindUniqueOrThrowZodSchema = z.object({ select: OptionGroupSelectObjectSchema.optional(), include: OptionGroupIncludeObjectSchema.optional(), where: OptionGroupWhereUniqueInputObjectSchema }).strict();