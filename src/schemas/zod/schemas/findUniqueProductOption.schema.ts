import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './objects/ProductOptionInclude.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './objects/ProductOptionWhereUniqueInput.schema';

export const ProductOptionFindUniqueSchema: z.ZodType<Prisma.ProductOptionFindUniqueArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), where: ProductOptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductOptionFindUniqueArgs>;

export const ProductOptionFindUniqueZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), where: ProductOptionWhereUniqueInputObjectSchema }).strict();