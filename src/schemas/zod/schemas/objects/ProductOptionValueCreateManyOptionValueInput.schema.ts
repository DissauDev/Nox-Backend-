import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productOptionId: z.string()
}).strict();
export const ProductOptionValueCreateManyOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateManyOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyOptionValueInput>;
export const ProductOptionValueCreateManyOptionValueInputObjectZodSchema = makeSchema();
