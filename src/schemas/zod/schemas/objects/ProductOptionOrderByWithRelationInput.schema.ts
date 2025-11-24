import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { OptionGroupOrderByWithRelationInputObjectSchema as OptionGroupOrderByWithRelationInputObjectSchema } from './OptionGroupOrderByWithRelationInput.schema';
import { ProductOptionValueOrderByRelationAggregateInputObjectSchema as ProductOptionValueOrderByRelationAggregateInputObjectSchema } from './ProductOptionValueOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  group: z.lazy(() => OptionGroupOrderByWithRelationInputObjectSchema).optional(),
  values: z.lazy(() => ProductOptionValueOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ProductOptionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductOptionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionOrderByWithRelationInput>;
export const ProductOptionOrderByWithRelationInputObjectZodSchema = makeSchema();
