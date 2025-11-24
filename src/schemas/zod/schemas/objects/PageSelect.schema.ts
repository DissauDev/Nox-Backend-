import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  layout: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  author: z.boolean().optional()
}).strict();
export const PageSelectObjectSchema: z.ZodType<Prisma.PageSelect> = makeSchema() as unknown as z.ZodType<Prisma.PageSelect>;
export const PageSelectObjectZodSchema = makeSchema();
