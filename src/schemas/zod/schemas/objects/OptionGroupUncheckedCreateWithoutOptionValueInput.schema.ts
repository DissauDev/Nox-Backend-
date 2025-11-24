import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionUncheckedCreateNestedManyWithoutGroupInputObjectSchema as ProductOptionUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './ProductOptionUncheckedCreateNestedManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  required: z.boolean().optional(),
  minSelectable: z.number().int().optional(),
  maxSelectable: z.number().int().optional(),
  isAvailable: z.boolean().optional(),
  showImages: z.boolean().optional(),
  selectionTitle: z.string().optional().nullable(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutGroupInputObjectSchema).optional()
}).strict();
export const OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.OptionGroupUncheckedCreateWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUncheckedCreateWithoutOptionValueInput>;
export const OptionGroupUncheckedCreateWithoutOptionValueInputObjectZodSchema = makeSchema();
