import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OptionGroupOrderByWithRelationInputObjectSchema as OptionGroupOrderByWithRelationInputObjectSchema } from './OptionGroupOrderByWithRelationInput.schema';
import { ProductOptionValueOrderByRelationAggregateInputObjectSchema as ProductOptionValueOrderByRelationAggregateInputObjectSchema } from './ProductOptionValueOrderByRelationAggregateInput.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  extraPrice: SortOrderSchema.optional(),
  imageUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: SortOrderSchema.optional(),
  isAvailable: SortOrderSchema.optional(),
  productRefId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sortOrder: SortOrderSchema.optional(),
  group: z.lazy(() => OptionGroupOrderByWithRelationInputObjectSchema).optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueOrderByRelationAggregateInputObjectSchema).optional(),
  productRef: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const OptionValueOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OptionValueOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueOrderByWithRelationInput>;
export const OptionValueOrderByWithRelationInputObjectZodSchema = makeSchema();
