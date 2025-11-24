import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponIncludeObjectSchema as CouponIncludeObjectSchema } from './objects/CouponInclude.schema';
import { CouponOrderByWithRelationInputObjectSchema as CouponOrderByWithRelationInputObjectSchema } from './objects/CouponOrderByWithRelationInput.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './objects/CouponWhereInput.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './objects/CouponWhereUniqueInput.schema';
import { CouponScalarFieldEnumSchema } from './enums/CouponScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CouponFindFirstSelectSchema: z.ZodType<Prisma.CouponSelect> = z.object({
    id: z.boolean().optional(),
    code: z.boolean().optional(),
    type: z.boolean().optional(),
    discountValue: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    isLimited: z.boolean().optional(),
    usageLimit: z.boolean().optional(),
    usageCount: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    redemptions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CouponSelect>;

export const CouponFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    code: z.boolean().optional(),
    type: z.boolean().optional(),
    discountValue: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    isLimited: z.boolean().optional(),
    usageLimit: z.boolean().optional(),
    usageCount: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    redemptions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CouponFindFirstSchema: z.ZodType<Prisma.CouponFindFirstArgs> = z.object({ select: CouponFindFirstSelectSchema.optional(), include: z.lazy(() => CouponIncludeObjectSchema.optional()), orderBy: z.union([CouponOrderByWithRelationInputObjectSchema, CouponOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponWhereInputObjectSchema.optional(), cursor: CouponWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CouponScalarFieldEnumSchema, CouponScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CouponFindFirstArgs>;

export const CouponFindFirstZodSchema = z.object({ select: CouponFindFirstSelectSchema.optional(), include: z.lazy(() => CouponIncludeObjectSchema.optional()), orderBy: z.union([CouponOrderByWithRelationInputObjectSchema, CouponOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponWhereInputObjectSchema.optional(), cursor: CouponWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CouponScalarFieldEnumSchema, CouponScalarFieldEnumSchema.array()]).optional() }).strict();