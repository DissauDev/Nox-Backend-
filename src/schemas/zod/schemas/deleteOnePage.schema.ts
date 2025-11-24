import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageWhereUniqueInputObjectSchema as PageWhereUniqueInputObjectSchema } from './objects/PageWhereUniqueInput.schema';

export const PageDeleteOneSchema: z.ZodType<Prisma.PageDeleteArgs> = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PageDeleteArgs>;

export const PageDeleteOneZodSchema = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema }).strict();