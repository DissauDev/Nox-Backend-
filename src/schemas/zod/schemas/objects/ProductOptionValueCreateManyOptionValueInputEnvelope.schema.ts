import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateManyOptionValueInputObjectSchema as ProductOptionValueCreateManyOptionValueInputObjectSchema } from './ProductOptionValueCreateManyOptionValueInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductOptionValueCreateManyOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueCreateManyOptionValueInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateManyOptionValueInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyOptionValueInputEnvelope>;
export const ProductOptionValueCreateManyOptionValueInputEnvelopeObjectZodSchema = makeSchema();
