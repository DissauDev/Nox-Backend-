import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './objects/ProductOptionInclude.schema';
import { ProductOptionOrderByWithRelationInputObjectSchema as ProductOptionOrderByWithRelationInputObjectSchema } from './objects/ProductOptionOrderByWithRelationInput.schema';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './objects/ProductOptionWhereInput.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './objects/ProductOptionWhereUniqueInput.schema';
import { ProductOptionScalarFieldEnumSchema } from './enums/ProductOptionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductOptionFindFirstSelectSchema: z.ZodType<Prisma.ProductOptionSelect> = z.object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    groupId: z.boolean().optional(),
    product: z.boolean().optional(),
    group: z.boolean().optional(),
    values: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductOptionSelect>;

export const ProductOptionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    groupId: z.boolean().optional(),
    product: z.boolean().optional(),
    group: z.boolean().optional(),
    values: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ProductOptionFindFirstSchema: z.ZodType<Prisma.ProductOptionFindFirstArgs> = z.object({ select: ProductOptionFindFirstSelectSchema.optional(), include: z.lazy(() => ProductOptionIncludeObjectSchema.optional()), orderBy: z.union([ProductOptionOrderByWithRelationInputObjectSchema, ProductOptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductOptionWhereInputObjectSchema.optional(), cursor: ProductOptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductOptionScalarFieldEnumSchema, ProductOptionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionFindFirstArgs>;

export const ProductOptionFindFirstZodSchema = z.object({ select: ProductOptionFindFirstSelectSchema.optional(), include: z.lazy(() => ProductOptionIncludeObjectSchema.optional()), orderBy: z.union([ProductOptionOrderByWithRelationInputObjectSchema, ProductOptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductOptionWhereInputObjectSchema.optional(), cursor: ProductOptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductOptionScalarFieldEnumSchema, ProductOptionScalarFieldEnumSchema.array()]).optional() }).strict();