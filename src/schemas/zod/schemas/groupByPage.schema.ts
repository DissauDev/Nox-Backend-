import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageWhereInputObjectSchema as PageWhereInputObjectSchema } from './objects/PageWhereInput.schema';
import { PageOrderByWithAggregationInputObjectSchema as PageOrderByWithAggregationInputObjectSchema } from './objects/PageOrderByWithAggregationInput.schema';
import { PageScalarWhereWithAggregatesInputObjectSchema as PageScalarWhereWithAggregatesInputObjectSchema } from './objects/PageScalarWhereWithAggregatesInput.schema';
import { PageScalarFieldEnumSchema } from './enums/PageScalarFieldEnum.schema';
import { PageCountAggregateInputObjectSchema as PageCountAggregateInputObjectSchema } from './objects/PageCountAggregateInput.schema';
import { PageMinAggregateInputObjectSchema as PageMinAggregateInputObjectSchema } from './objects/PageMinAggregateInput.schema';
import { PageMaxAggregateInputObjectSchema as PageMaxAggregateInputObjectSchema } from './objects/PageMaxAggregateInput.schema';
import { PageAvgAggregateInputObjectSchema as PageAvgAggregateInputObjectSchema } from './objects/PageAvgAggregateInput.schema';
import { PageSumAggregateInputObjectSchema as PageSumAggregateInputObjectSchema } from './objects/PageSumAggregateInput.schema';

export const PageGroupBySchema: z.ZodType<Prisma.PageGroupByArgs> = z.object({ where: PageWhereInputObjectSchema.optional(), orderBy: z.union([PageOrderByWithAggregationInputObjectSchema, PageOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PageScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PageScalarFieldEnumSchema), _count: z.union([ z.literal(true), PageCountAggregateInputObjectSchema ]).optional(), _min: PageMinAggregateInputObjectSchema.optional(), _max: PageMaxAggregateInputObjectSchema.optional(), _avg: PageAvgAggregateInputObjectSchema.optional(), _sum: PageSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PageGroupByArgs>;

export const PageGroupByZodSchema = z.object({ where: PageWhereInputObjectSchema.optional(), orderBy: z.union([PageOrderByWithAggregationInputObjectSchema, PageOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PageScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PageScalarFieldEnumSchema), _count: z.union([ z.literal(true), PageCountAggregateInputObjectSchema ]).optional(), _min: PageMinAggregateInputObjectSchema.optional(), _max: PageMaxAggregateInputObjectSchema.optional(), _avg: PageAvgAggregateInputObjectSchema.optional(), _sum: PageSumAggregateInputObjectSchema.optional() }).strict();