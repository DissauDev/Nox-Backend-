import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereInputObjectSchema as ProductOptionValueWhereInputObjectSchema } from './ProductOptionValueWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProductOptionValueWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProductOptionValueWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProductOptionValueWhereInputObjectSchema).optional()
}).strict();
export const ProductOptionValueListRelationFilterObjectSchema: z.ZodType<Prisma.ProductOptionValueListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueListRelationFilter>;
export const ProductOptionValueListRelationFilterObjectZodSchema = makeSchema();
