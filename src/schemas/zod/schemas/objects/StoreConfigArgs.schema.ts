import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreConfigSelectObjectSchema as StoreConfigSelectObjectSchema } from './StoreConfigSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StoreConfigSelectObjectSchema).optional()
}).strict();
export const StoreConfigArgsObjectSchema = makeSchema();
export const StoreConfigArgsObjectZodSchema = makeSchema();
