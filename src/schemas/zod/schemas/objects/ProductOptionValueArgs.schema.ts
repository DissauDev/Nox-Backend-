import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './ProductOptionValueSelect.schema';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './ProductOptionValueInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductOptionValueSelectObjectSchema).optional(),
  include: z.lazy(() => ProductOptionValueIncludeObjectSchema).optional()
}).strict();
export const ProductOptionValueArgsObjectSchema = makeSchema();
export const ProductOptionValueArgsObjectZodSchema = makeSchema();
