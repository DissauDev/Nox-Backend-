import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './OptionValueWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => OptionValueWhereInputObjectSchema).optional(),
  some: z.lazy(() => OptionValueWhereInputObjectSchema).optional(),
  none: z.lazy(() => OptionValueWhereInputObjectSchema).optional()
}).strict();
export const OptionValueListRelationFilterObjectSchema: z.ZodType<Prisma.OptionValueListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueListRelationFilter>;
export const OptionValueListRelationFilterObjectZodSchema = makeSchema();
