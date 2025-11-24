import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponRedemptionIncludeObjectSchema as CouponRedemptionIncludeObjectSchema } from './objects/CouponRedemptionInclude.schema';
import { CouponRedemptionOrderByWithRelationInputObjectSchema as CouponRedemptionOrderByWithRelationInputObjectSchema } from './objects/CouponRedemptionOrderByWithRelationInput.schema';
import { CouponRedemptionWhereInputObjectSchema as CouponRedemptionWhereInputObjectSchema } from './objects/CouponRedemptionWhereInput.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './objects/CouponRedemptionWhereUniqueInput.schema';
import { CouponRedemptionScalarFieldEnumSchema } from './enums/CouponRedemptionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CouponRedemptionFindManySelectSchema: z.ZodType<Prisma.CouponRedemptionSelect> = z.object({
    id: z.boolean().optional(),
    coupon: z.boolean().optional(),
    couponId: z.boolean().optional(),
    userId: z.boolean().optional(),
    orderId: z.boolean().optional(),
    redeemedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionSelect>;

export const CouponRedemptionFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    coupon: z.boolean().optional(),
    couponId: z.boolean().optional(),
    userId: z.boolean().optional(),
    orderId: z.boolean().optional(),
    redeemedAt: z.boolean().optional()
  }).strict();

export const CouponRedemptionFindManySchema: z.ZodType<Prisma.CouponRedemptionFindManyArgs> = z.object({ select: CouponRedemptionFindManySelectSchema.optional(), include: z.lazy(() => CouponRedemptionIncludeObjectSchema.optional()), orderBy: z.union([CouponRedemptionOrderByWithRelationInputObjectSchema, CouponRedemptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponRedemptionWhereInputObjectSchema.optional(), cursor: CouponRedemptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CouponRedemptionScalarFieldEnumSchema, CouponRedemptionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CouponRedemptionFindManyArgs>;

export const CouponRedemptionFindManyZodSchema = z.object({ select: CouponRedemptionFindManySelectSchema.optional(), include: z.lazy(() => CouponRedemptionIncludeObjectSchema.optional()), orderBy: z.union([CouponRedemptionOrderByWithRelationInputObjectSchema, CouponRedemptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponRedemptionWhereInputObjectSchema.optional(), cursor: CouponRedemptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CouponRedemptionScalarFieldEnumSchema, CouponRedemptionScalarFieldEnumSchema.array()]).optional() }).strict();