import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => OptionGroupWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => OptionGroupWhereInputObjectSchema).optional()
}).strict();
export const OptionGroupScalarRelationFilterObjectSchema: z.ZodType<Prisma.OptionGroupScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupScalarRelationFilter>;
export const OptionGroupScalarRelationFilterObjectZodSchema = makeSchema();
