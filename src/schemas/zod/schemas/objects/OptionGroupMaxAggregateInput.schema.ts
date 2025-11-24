import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  required: z.literal(true).optional(),
  minSelectable: z.literal(true).optional(),
  maxSelectable: z.literal(true).optional(),
  isAvailable: z.literal(true).optional(),
  showImages: z.literal(true).optional(),
  selectionTitle: z.literal(true).optional()
}).strict();
export const OptionGroupMaxAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupMaxAggregateInputType>;
export const OptionGroupMaxAggregateInputObjectZodSchema = makeSchema();
