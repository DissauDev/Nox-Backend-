import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './ProductOptionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ProductOptionWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ProductOptionWhereInputObjectSchema).optional()
}).strict();
export const ProductOptionScalarRelationFilterObjectSchema: z.ZodType<Prisma.ProductOptionScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionScalarRelationFilter>;
export const ProductOptionScalarRelationFilterObjectZodSchema = makeSchema();
