import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCountOutputTypeSelectObjectSchema as ProductOptionCountOutputTypeSelectObjectSchema } from './ProductOptionCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductOptionCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ProductOptionCountOutputTypeArgsObjectSchema = makeSchema();
export const ProductOptionCountOutputTypeArgsObjectZodSchema = makeSchema();
