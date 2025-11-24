import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateNestedOneWithoutOptionValueInputObjectSchema as OptionGroupCreateNestedOneWithoutOptionValueInputObjectSchema } from './OptionGroupCreateNestedOneWithoutOptionValueInput.schema';
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
  group: z.lazy(() => OptionGroupCreateNestedOneWithoutOptionValueInputObjectSchema),
  ProductOptionValue: z.lazy(() => ProductOptionValueCreateNestedManyWithoutOptionValueInputObjectSchema),
  productRef: z.lazy(() => ProductCreateNestedOneWithoutOptionValueInputObjectSchema).optional()
}).strict();
export const OptionValueCreateInputObjectSchema: z.ZodType<Prisma.OptionValueCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateInput>;
export const OptionValueCreateInputObjectZodSchema = makeSchema();
