import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './ProductOptionSelect.schema';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './ProductOptionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductOptionSelectObjectSchema).optional(),
  include: z.lazy(() => ProductOptionIncludeObjectSchema).optional()
}).strict();
export const ProductOptionArgsObjectSchema = makeSchema();
export const ProductOptionArgsObjectZodSchema = makeSchema();
