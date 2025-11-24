import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ProductTypeSchema } from '../enums/ProductType.schema';
import { ProductStatusSchema } from '../enums/ProductStatus.schema';
import { CategoryCreateNestedOneWithoutProductsInputObjectSchema as CategoryCreateNestedOneWithoutProductsInputObjectSchema } from './CategoryCreateNestedOneWithoutProductsInput.schema';
import { ProductOptionCreateNestedManyWithoutProductInputObjectSchema as ProductOptionCreateNestedManyWithoutProductInputObjectSchema } from './ProductOptionCreateNestedManyWithoutProductInput.schema';
import { OrderItemCreateNestedManyWithoutProductInputObjectSchema as OrderItemCreateNestedManyWithoutProductInputObjectSchema } from './OrderItemCreateNestedManyWithoutProductInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  salePrice: z.number().optional().nullable(),
  specifications: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  imageLeft: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  imageRight: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  type: ProductTypeSchema.optional(),
  status: ProductStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sortOrder: z.number().int().optional(),
  isOptionItem: z.boolean().optional(),
  packOptionSurcharge: z.number().optional(),
  packMaxItems: z.number().int().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductsInputObjectSchema),
  options: z.lazy(() => ProductOptionCreateNestedManyWithoutProductInputObjectSchema).optional(),
  OrderItem: z.lazy(() => OrderItemCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutOptionValueInput>;
export const ProductCreateWithoutOptionValueInputObjectZodSchema = makeSchema();
