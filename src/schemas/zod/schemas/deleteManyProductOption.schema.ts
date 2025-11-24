import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './objects/ProductOptionWhereInput.schema';

export const ProductOptionDeleteManySchema: z.ZodType<Prisma.ProductOptionDeleteManyArgs> = z.object({ where: ProductOptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionDeleteManyArgs>;

export const ProductOptionDeleteManyZodSchema = z.object({ where: ProductOptionWhereInputObjectSchema.optional() }).strict();