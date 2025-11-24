import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateManyGroupInputObjectSchema as OptionValueCreateManyGroupInputObjectSchema } from './OptionValueCreateManyGroupInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OptionValueCreateManyGroupInputObjectSchema), z.lazy(() => OptionValueCreateManyGroupInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OptionValueCreateManyGroupInputEnvelopeObjectSchema: z.ZodType<Prisma.OptionValueCreateManyGroupInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateManyGroupInputEnvelope>;
export const OptionValueCreateManyGroupInputEnvelopeObjectZodSchema = makeSchema();
