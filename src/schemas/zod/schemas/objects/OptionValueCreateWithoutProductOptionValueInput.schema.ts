import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateNestedOneWithoutOptionValueInputObjectSchema as OptionGroupCreateNestedOneWithoutOptionValueInputObjectSchema } from './OptionGroupCreateNestedOneWithoutOptionValueInput.schema';
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
  productRef: z.lazy(() => ProductCreateNestedOneWithoutOptionValueInputObjectSchema).optional()
}).strict();
export const OptionValueCreateWithoutProductOptionValueInputObjectSchema: z.ZodType<Prisma.OptionValueCreateWithoutProductOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateWithoutProductOptionValueInput>;
export const OptionValueCreateWithoutProductOptionValueInputObjectZodSchema = makeSchema();
