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
  sortOrder: z.number().int().optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema).optional()
}).strict();
export const OptionValueUncheckedCreateWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedCreateWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedCreateWithoutProductRefInput>;
export const OptionValueUncheckedCreateWithoutProductRefInputObjectZodSchema = makeSchema();
