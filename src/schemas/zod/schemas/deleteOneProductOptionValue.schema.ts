import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './objects/ProductOptionValueInclude.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './objects/ProductOptionValueWhereUniqueInput.schema';

export const ProductOptionValueDeleteOneSchema: z.ZodType<Prisma.ProductOptionValueDeleteArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), where: ProductOptionValueWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueDeleteArgs>;

export const ProductOptionValueDeleteOneZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), where: ProductOptionValueWhereUniqueInputObjectSchema }).strict();