import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  taxEnabled: SortOrderSchema.optional(),
  taxPercent: SortOrderSchema.optional(),
  taxFixed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  taxLabel: SortOrderSchema.optional()
}).strict();
export const StoreConfigOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StoreConfigOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigOrderByWithRelationInput>;
export const StoreConfigOrderByWithRelationInputObjectZodSchema = makeSchema();
