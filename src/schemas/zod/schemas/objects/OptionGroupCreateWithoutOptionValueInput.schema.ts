import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateNestedManyWithoutGroupInputObjectSchema as ProductOptionCreateNestedManyWithoutGroupInputObjectSchema } from './ProductOptionCreateNestedManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  required: z.boolean().optional(),
  minSelectable: z.number().int().optional(),
  maxSelectable: z.number().int().optional(),
  isAvailable: z.boolean().optional(),
  showImages: z.boolean().optional(),
  selectionTitle: z.string().optional().nullable(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutGroupInputObjectSchema).optional()
}).strict();
export const OptionGroupCreateWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateWithoutOptionValueInput>;
export const OptionGroupCreateWithoutOptionValueInputObjectZodSchema = makeSchema();
