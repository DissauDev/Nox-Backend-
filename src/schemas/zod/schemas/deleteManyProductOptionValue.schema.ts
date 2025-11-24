import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueWhereInputObjectSchema as ProductOptionValueWhereInputObjectSchema } from './objects/ProductOptionValueWhereInput.schema';

export const ProductOptionValueDeleteManySchema: z.ZodType<Prisma.ProductOptionValueDeleteManyArgs> = z.object({ where: ProductOptionValueWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueDeleteManyArgs>;

export const ProductOptionValueDeleteManyZodSchema = z.object({ where: ProductOptionValueWhereInputObjectSchema.optional() }).strict();