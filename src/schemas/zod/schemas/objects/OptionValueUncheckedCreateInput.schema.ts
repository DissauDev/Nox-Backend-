import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  groupId: z.string(),
  name: z.string(),
  extraPrice: z.number().optional(),
  imageUrl: z.string().optional().nullable(),
  description: z.string().optional(),
  isAvailable: z.boolean().optional(),
  productRefId: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema)
}).strict();
export const OptionValueUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedCreateInput>;
export const OptionValueUncheckedCreateInputObjectZodSchema = makeSchema();
