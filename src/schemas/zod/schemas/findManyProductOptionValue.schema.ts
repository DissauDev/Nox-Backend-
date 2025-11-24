import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './objects/ProductOptionValueInclude.schema';
import { ProductOptionValueOrderByWithRelationInputObjectSchema as ProductOptionValueOrderByWithRelationInputObjectSchema } from './objects/ProductOptionValueOrderByWithRelationInput.schema';
import { ProductOptionValueWhereInputObjectSchema as ProductOptionValueWhereInputObjectSchema } from './objects/ProductOptionValueWhereInput.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './objects/ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueScalarFieldEnumSchema } from './enums/ProductOptionValueScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductOptionValueFindManySelectSchema: z.ZodType<Prisma.ProductOptionValueSelect> = z.object({
    id: z.boolean().optional(),
    productOptionId: z.boolean().optional(),
    valueId: z.boolean().optional(),
    productOption: z.boolean().optional(),
    optionValue: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueSelect>;

export const ProductOptionValueFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    productOptionId: z.boolean().optional(),
    valueId: z.boolean().optional(),
    productOption: z.boolean().optional(),
    optionValue: z.boolean().optional()
  }).strict();

export const ProductOptionValueFindManySchema: z.ZodType<Prisma.ProductOptionValueFindManyArgs> = z.object({ select: ProductOptionValueFindManySelectSchema.optional(), include: z.lazy(() => ProductOptionValueIncludeObjectSchema.optional()), orderBy: z.union([ProductOptionValueOrderByWithRelationInputObjectSchema, ProductOptionValueOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductOptionValueWhereInputObjectSchema.optional(), cursor: ProductOptionValueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductOptionValueScalarFieldEnumSchema, ProductOptionValueScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueFindManyArgs>;

export const ProductOptionValueFindManyZodSchema = z.object({ select: ProductOptionValueFindManySelectSchema.optional(), include: z.lazy(() => ProductOptionValueIncludeObjectSchema.optional()), orderBy: z.union([ProductOptionValueOrderByWithRelationInputObjectSchema, ProductOptionValueOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductOptionValueWhereInputObjectSchema.optional(), cursor: ProductOptionValueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductOptionValueScalarFieldEnumSchema, ProductOptionValueScalarFieldEnumSchema.array()]).optional() }).strict();