import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionCreateManyInputObjectSchema as ProductOptionCreateManyInputObjectSchema } from './objects/ProductOptionCreateManyInput.schema';

export const ProductOptionCreateManyAndReturnSchema: z.ZodType<Prisma.ProductOptionCreateManyAndReturnArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), data: z.union([ ProductOptionCreateManyInputObjectSchema, z.array(ProductOptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionCreateManyAndReturnArgs>;

export const ProductOptionCreateManyAndReturnZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), data: z.union([ ProductOptionCreateManyInputObjectSchema, z.array(ProductOptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();