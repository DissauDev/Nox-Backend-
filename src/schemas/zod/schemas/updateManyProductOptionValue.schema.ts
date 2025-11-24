import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueUpdateManyMutationInputObjectSchema as ProductOptionValueUpdateManyMutationInputObjectSchema } from './objects/ProductOptionValueUpdateManyMutationInput.schema';
import { ProductOptionValueWhereInputObjectSchema as ProductOptionValueWhereInputObjectSchema } from './objects/ProductOptionValueWhereInput.schema';

export const ProductOptionValueUpdateManySchema: z.ZodType<Prisma.ProductOptionValueUpdateManyArgs> = z.object({ data: ProductOptionValueUpdateManyMutationInputObjectSchema, where: ProductOptionValueWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyArgs>;

export const ProductOptionValueUpdateManyZodSchema = z.object({ data: ProductOptionValueUpdateManyMutationInputObjectSchema, where: ProductOptionValueWhereInputObjectSchema.optional() }).strict();