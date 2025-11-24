import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponOrderByWithRelationInputObjectSchema as CouponOrderByWithRelationInputObjectSchema } from './objects/CouponOrderByWithRelationInput.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './objects/CouponWhereInput.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './objects/CouponWhereUniqueInput.schema';
import { CouponCountAggregateInputObjectSchema as CouponCountAggregateInputObjectSchema } from './objects/CouponCountAggregateInput.schema';
import { CouponMinAggregateInputObjectSchema as CouponMinAggregateInputObjectSchema } from './objects/CouponMinAggregateInput.schema';
import { CouponMaxAggregateInputObjectSchema as CouponMaxAggregateInputObjectSchema } from './objects/CouponMaxAggregateInput.schema';
import { CouponAvgAggregateInputObjectSchema as CouponAvgAggregateInputObjectSchema } from './objects/CouponAvgAggregateInput.schema';
import { CouponSumAggregateInputObjectSchema as CouponSumAggregateInputObjectSchema } from './objects/CouponSumAggregateInput.schema';

export const CouponAggregateSchema: z.ZodType<Prisma.CouponAggregateArgs> = z.object({ orderBy: z.union([CouponOrderByWithRelationInputObjectSchema, CouponOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponWhereInputObjectSchema.optional(), cursor: CouponWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CouponCountAggregateInputObjectSchema ]).optional(), _min: CouponMinAggregateInputObjectSchema.optional(), _max: CouponMaxAggregateInputObjectSchema.optional(), _avg: CouponAvgAggregateInputObjectSchema.optional(), _sum: CouponSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CouponAggregateArgs>;

export const CouponAggregateZodSchema = z.object({ orderBy: z.union([CouponOrderByWithRelationInputObjectSchema, CouponOrderByWithRelationInputObjectSchema.array()]).optional(), where: CouponWhereInputObjectSchema.optional(), cursor: CouponWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CouponCountAggregateInputObjectSchema ]).optional(), _min: CouponMinAggregateInputObjectSchema.optional(), _max: CouponMaxAggregateInputObjectSchema.optional(), _avg: CouponAvgAggregateInputObjectSchema.optional(), _sum: CouponSumAggregateInputObjectSchema.optional() }).strict();