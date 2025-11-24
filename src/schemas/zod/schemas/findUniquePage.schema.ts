import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageWhereUniqueInputObjectSchema as PageWhereUniqueInputObjectSchema } from './objects/PageWhereUniqueInput.schema';

export const PageFindUniqueSchema: z.ZodType<Prisma.PageFindUniqueArgs> = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PageFindUniqueArgs>;

export const PageFindUniqueZodSchema = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema }).strict();