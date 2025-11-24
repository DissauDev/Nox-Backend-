import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './ProductOptionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProductOptionWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProductOptionWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProductOptionWhereInputObjectSchema).optional()
}).strict();
export const ProductOptionListRelationFilterObjectSchema: z.ZodType<Prisma.ProductOptionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionListRelationFilter>;
export const ProductOptionListRelationFilterObjectZodSchema = makeSchema();
