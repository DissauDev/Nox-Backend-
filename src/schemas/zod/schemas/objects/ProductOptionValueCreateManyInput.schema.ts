import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productOptionId: z.string(),
  valueId: z.string()
}).strict();
export const ProductOptionValueCreateManyInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyInput>;
export const ProductOptionValueCreateManyInputObjectZodSchema = makeSchema();
