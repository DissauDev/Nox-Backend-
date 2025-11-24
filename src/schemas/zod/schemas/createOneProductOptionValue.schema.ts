import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './objects/ProductOptionValueInclude.schema';
import { ProductOptionValueCreateInputObjectSchema as ProductOptionValueCreateInputObjectSchema } from './objects/ProductOptionValueCreateInput.schema';
import { ProductOptionValueUncheckedCreateInputObjectSchema as ProductOptionValueUncheckedCreateInputObjectSchema } from './objects/ProductOptionValueUncheckedCreateInput.schema';

export const ProductOptionValueCreateOneSchema: z.ZodType<Prisma.ProductOptionValueCreateArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), data: z.union([ProductOptionValueCreateInputObjectSchema, ProductOptionValueUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueCreateArgs>;

export const ProductOptionValueCreateOneZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), data: z.union([ProductOptionValueCreateInputObjectSchema, ProductOptionValueUncheckedCreateInputObjectSchema]) }).strict();