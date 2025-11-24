import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './objects/ProductOptionValueInclude.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './objects/ProductOptionValueWhereUniqueInput.schema';

export const ProductOptionValueFindUniqueOrThrowSchema: z.ZodType<Prisma.ProductOptionValueFindUniqueOrThrowArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), where: ProductOptionValueWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueFindUniqueOrThrowArgs>;

export const ProductOptionValueFindUniqueOrThrowZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), where: ProductOptionValueWhereUniqueInputObjectSchema }).strict();