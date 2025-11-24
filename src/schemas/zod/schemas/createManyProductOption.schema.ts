import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionCreateManyInputObjectSchema as ProductOptionCreateManyInputObjectSchema } from './objects/ProductOptionCreateManyInput.schema';

export const ProductOptionCreateManySchema: z.ZodType<Prisma.ProductOptionCreateManyArgs> = z.object({ data: z.union([ ProductOptionCreateManyInputObjectSchema, z.array(ProductOptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionCreateManyArgs>;

export const ProductOptionCreateManyZodSchema = z.object({ data: z.union([ ProductOptionCreateManyInputObjectSchema, z.array(ProductOptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();