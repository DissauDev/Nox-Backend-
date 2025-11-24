import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateManyProductInputObjectSchema as ProductOptionCreateManyProductInputObjectSchema } from './ProductOptionCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductOptionCreateManyProductInputObjectSchema), z.lazy(() => ProductOptionCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductOptionCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductOptionCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateManyProductInputEnvelope>;
export const ProductOptionCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
