import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  groupId: z.string(),
  name: z.string(),
  extraPrice: z.number().optional(),
  imageUrl: z.string().optional().nullable(),
  description: z.string().optional(),
  isAvailable: z.boolean().optional(),
  productRefId: z.string().optional().nullable(),
  sortOrder: z.number().int().optional()
}).strict();
export const OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedCreateWithoutProductOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedCreateWithoutProductOptionValueInput>;
export const OptionValueUncheckedCreateWithoutProductOptionValueInputObjectZodSchema = makeSchema();
