import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageCreateManyInputObjectSchema as PageCreateManyInputObjectSchema } from './objects/PageCreateManyInput.schema';

export const PageCreateManyAndReturnSchema: z.ZodType<Prisma.PageCreateManyAndReturnArgs> = z.object({ select: PageSelectObjectSchema.optional(), data: z.union([ PageCreateManyInputObjectSchema, z.array(PageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PageCreateManyAndReturnArgs>;

export const PageCreateManyAndReturnZodSchema = z.object({ select: PageSelectObjectSchema.optional(), data: z.union([ PageCreateManyInputObjectSchema, z.array(PageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();