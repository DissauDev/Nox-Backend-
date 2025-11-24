import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  groupId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductOptionCreateManyInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateManyInput>;
export const ProductOptionCreateManyInputObjectZodSchema = makeSchema();
