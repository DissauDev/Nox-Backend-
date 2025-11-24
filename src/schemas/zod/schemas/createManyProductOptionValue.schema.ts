import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueCreateManyInputObjectSchema as ProductOptionValueCreateManyInputObjectSchema } from './objects/ProductOptionValueCreateManyInput.schema';

export const ProductOptionValueCreateManySchema: z.ZodType<Prisma.ProductOptionValueCreateManyArgs> = z.object({ data: z.union([ ProductOptionValueCreateManyInputObjectSchema, z.array(ProductOptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyArgs>;

export const ProductOptionValueCreateManyZodSchema = z.object({ data: z.union([ ProductOptionValueCreateManyInputObjectSchema, z.array(ProductOptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();