import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueCreateManyInputObjectSchema as ProductOptionValueCreateManyInputObjectSchema } from './objects/ProductOptionValueCreateManyInput.schema';

export const ProductOptionValueCreateManyAndReturnSchema: z.ZodType<Prisma.ProductOptionValueCreateManyAndReturnArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), data: z.union([ ProductOptionValueCreateManyInputObjectSchema, z.array(ProductOptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyAndReturnArgs>;

export const ProductOptionValueCreateManyAndReturnZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), data: z.union([ ProductOptionValueCreateManyInputObjectSchema, z.array(ProductOptionValueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();