import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateManyProductRefInputObjectSchema as OptionValueCreateManyProductRefInputObjectSchema } from './OptionValueCreateManyProductRefInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OptionValueCreateManyProductRefInputObjectSchema), z.lazy(() => OptionValueCreateManyProductRefInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OptionValueCreateManyProductRefInputEnvelopeObjectSchema: z.ZodType<Prisma.OptionValueCreateManyProductRefInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateManyProductRefInputEnvelope>;
export const OptionValueCreateManyProductRefInputEnvelopeObjectZodSchema = makeSchema();
