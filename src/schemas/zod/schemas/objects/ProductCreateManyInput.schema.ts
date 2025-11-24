import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ProductTypeSchema } from '../enums/ProductType.schema';
import { ProductStatusSchema } from '../enums/ProductStatus.schema'

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
  categoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sortOrder: z.number().int().optional(),
  isOptionItem: z.boolean().optional(),
  packOptionSurcharge: z.number().optional(),
  packMaxItems: z.number().int().optional().nullable()
}).strict();
export const ProductCreateManyInputObjectSchema: z.ZodType<Prisma.ProductCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyInput>;
export const ProductCreateManyInputObjectZodSchema = makeSchema();
