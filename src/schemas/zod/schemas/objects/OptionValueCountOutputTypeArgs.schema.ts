import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCountOutputTypeSelectObjectSchema as OptionValueCountOutputTypeSelectObjectSchema } from './OptionValueCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OptionValueCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const OptionValueCountOutputTypeArgsObjectSchema = makeSchema();
export const OptionValueCountOutputTypeArgsObjectZodSchema = makeSchema();
