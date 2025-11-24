import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageWhereUniqueInputObjectSchema as PageWhereUniqueInputObjectSchema } from './objects/PageWhereUniqueInput.schema';

export const PageFindUniqueOrThrowSchema: z.ZodType<Prisma.PageFindUniqueOrThrowArgs> = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PageFindUniqueOrThrowArgs>;

export const PageFindUniqueOrThrowZodSchema = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema }).strict();