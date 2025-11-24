import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './PageSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PageSelectObjectSchema).optional()
}).strict();
export const PageArgsObjectSchema = makeSchema();
export const PageArgsObjectZodSchema = makeSchema();
