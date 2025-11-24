import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageOrderByWithRelationInputObjectSchema as PageOrderByWithRelationInputObjectSchema } from './objects/PageOrderByWithRelationInput.schema';
import { PageWhereInputObjectSchema as PageWhereInputObjectSchema } from './objects/PageWhereInput.schema';
import { PageWhereUniqueInputObjectSchema as PageWhereUniqueInputObjectSchema } from './objects/PageWhereUniqueInput.schema';
import { PageCountAggregateInputObjectSchema as PageCountAggregateInputObjectSchema } from './objects/PageCountAggregateInput.schema';
import { PageMinAggregateInputObjectSchema as PageMinAggregateInputObjectSchema } from './objects/PageMinAggregateInput.schema';
import { PageMaxAggregateInputObjectSchema as PageMaxAggregateInputObjectSchema } from './objects/PageMaxAggregateInput.schema';
import { PageAvgAggregateInputObjectSchema as PageAvgAggregateInputObjectSchema } from './objects/PageAvgAggregateInput.schema';
import { PageSumAggregateInputObjectSchema as PageSumAggregateInputObjectSchema } from './objects/PageSumAggregateInput.schema';

export const PageAggregateSchema: z.ZodType<Prisma.PageAggregateArgs> = z.object({ orderBy: z.union([PageOrderByWithRelationInputObjectSchema, PageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PageWhereInputObjectSchema.optional(), cursor: PageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PageCountAggregateInputObjectSchema ]).optional(), _min: PageMinAggregateInputObjectSchema.optional(), _max: PageMaxAggregateInputObjectSchema.optional(), _avg: PageAvgAggregateInputObjectSchema.optional(), _sum: PageSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PageAggregateArgs>;

export const PageAggregateZodSchema = z.object({ orderBy: z.union([PageOrderByWithRelationInputObjectSchema, PageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PageWhereInputObjectSchema.optional(), cursor: PageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PageCountAggregateInputObjectSchema ]).optional(), _min: PageMinAggregateInputObjectSchema.optional(), _max: PageMaxAggregateInputObjectSchema.optional(), _avg: PageAvgAggregateInputObjectSchema.optional(), _sum: PageSumAggregateInputObjectSchema.optional() }).strict();