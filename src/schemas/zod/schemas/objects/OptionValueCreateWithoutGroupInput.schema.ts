import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateNestedManyWithoutOptionValueInputObjectSchema as ProductOptionValueCreateNestedManyWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateNestedManyWithoutOptionValueInput.schema';
import { ProductCreateNestedOneWithoutOptionValueInputObjectSchema as ProductCreateNestedOneWithoutOptionValueInputObjectSchema } from './ProductCreateNestedOneWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  extraPrice: z.number().optional(),
  imageUrl: z.string().optional().nullable(),
  description: z.string().optional(),
  isAvailable: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueCreateNestedManyWithoutOptionValueInputObjectSchema).optional(),
  productRef: z.lazy(() => ProductCreateNestedOneWithoutOptionValueInputObjectSchema).optional()
}).strict();
export const OptionValueCreateWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueCreateWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateWithoutGroupInput>;
export const OptionValueCreateWithoutGroupInputObjectZodSchema = makeSchema();
