import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './OptionValueWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => OptionValueWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => OptionValueWhereInputObjectSchema).optional()
}).strict();
export const OptionValueScalarRelationFilterObjectSchema: z.ZodType<Prisma.OptionValueScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueScalarRelationFilter>;
export const OptionValueScalarRelationFilterObjectZodSchema = makeSchema();
