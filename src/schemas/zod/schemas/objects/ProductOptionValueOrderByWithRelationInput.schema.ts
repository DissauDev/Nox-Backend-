import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOptionOrderByWithRelationInputObjectSchema as ProductOptionOrderByWithRelationInputObjectSchema } from './ProductOptionOrderByWithRelationInput.schema';
import { OptionValueOrderByWithRelationInputObjectSchema as OptionValueOrderByWithRelationInputObjectSchema } from './OptionValueOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productOptionId: SortOrderSchema.optional(),
  valueId: SortOrderSchema.optional(),
  productOption: z.lazy(() => ProductOptionOrderByWithRelationInputObjectSchema).optional(),
  optionValue: z.lazy(() => OptionValueOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ProductOptionValueOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductOptionValueOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueOrderByWithRelationInput>;
export const ProductOptionValueOrderByWithRelationInputObjectZodSchema = makeSchema();
