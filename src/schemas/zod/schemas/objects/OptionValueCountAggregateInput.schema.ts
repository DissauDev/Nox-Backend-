import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  groupId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  extraPrice: z.literal(true).optional(),
  imageUrl: z.literal(true).optional(),
  description: z.literal(true).optional(),
  isAvailable: z.literal(true).optional(),
  productRefId: z.literal(true).optional(),
  sortOrder: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const OptionValueCountAggregateInputObjectSchema: z.ZodType<Prisma.OptionValueCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCountAggregateInputType>;
export const OptionValueCountAggregateInputObjectZodSchema = makeSchema();
