import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponOrderByWithRelationInputObjectSchema as CouponOrderByWithRelationInputObjectSchema } from './objects/CouponOrderByWithRelationInput.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './objects/CouponWhereInput.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './objects/CouponWhereUniqueInput.schema';
import { CouponCountAggregateInputObjectSchema as CouponCountAggregateInputObjectSchema } from './objects/CouponCountAggregateInput.schema';

export const CouponCountSchema: z.ZodType<Prisma.CouponCountArgs> = z.object({ orderBy: z.union([CouponOrderByWithRelationInputObjectSchema, CouponOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponWhereInputObjectSchema.optional(), cursor: CouponWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CouponCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CouponCountArgs>;

export const CouponCountZodSchema = z.object({ orderBy: z.union([CouponOrderByWithRelationInputObjectSchema, CouponOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponWhereInputObjectSchema.optional(), cursor: CouponWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CouponCountAggregateInputObjectSchema ]).optional() }).strict();