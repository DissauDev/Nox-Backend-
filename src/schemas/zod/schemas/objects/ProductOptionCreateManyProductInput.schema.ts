import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  groupId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductOptionCreateManyProductInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateManyProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateManyProductInput>;
export const ProductOptionCreateManyProductInputObjectZodSchema = makeSchema();
