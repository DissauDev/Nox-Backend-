import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueSelectObjectSchema as OptionValueSelectObjectSchema } from './OptionValueSelect.schema';
import { OptionValueIncludeObjectSchema as OptionValueIncludeObjectSchema } from './OptionValueInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OptionValueSelectObjectSchema).optional(),
  include: z.lazy(() => OptionValueIncludeObjectSchema).optional()
}).strict();
export const OptionValueArgsObjectSchema = makeSchema();
export const OptionValueArgsObjectZodSchema = makeSchema();
