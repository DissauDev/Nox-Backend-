import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageCreateManyInputObjectSchema as PageCreateManyInputObjectSchema } from './objects/PageCreateManyInput.schema';

export const PageCreateManySchema: z.ZodType<Prisma.PageCreateManyArgs> = z.object({ data: z.union([ PageCreateManyInputObjectSchema, z.array(PageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PageCreateManyArgs>;

export const PageCreateManyZodSchema = z.object({ data: z.union([ PageCreateManyInputObjectSchema, z.array(PageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();