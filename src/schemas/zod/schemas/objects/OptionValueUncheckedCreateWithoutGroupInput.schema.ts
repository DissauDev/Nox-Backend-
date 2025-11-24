import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  extraPrice: z.number().optional(),
  imageUrl: z.string().optional().nullable(),
  description: z.string().optional(),
  isAvailable: z.boolean().optional(),
  productRefId: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema).optional()
}).strict();
export const OptionValueUncheckedCreateWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedCreateWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedCreateWithoutGroupInput>;
export const OptionValueUncheckedCreateWithoutGroupInputObjectZodSchema = makeSchema();
