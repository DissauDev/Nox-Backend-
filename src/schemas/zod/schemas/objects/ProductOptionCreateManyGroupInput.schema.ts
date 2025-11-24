import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductOptionCreateManyGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateManyGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateManyGroupInput>;
export const ProductOptionCreateManyGroupInputObjectZodSchema = makeSchema();
