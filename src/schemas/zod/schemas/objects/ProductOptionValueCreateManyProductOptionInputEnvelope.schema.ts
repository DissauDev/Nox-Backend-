import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateManyProductOptionInputObjectSchema as ProductOptionValueCreateManyProductOptionInputObjectSchema } from './ProductOptionValueCreateManyProductOptionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductOptionValueCreateManyProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueCreateManyProductOptionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateManyProductOptionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyProductOptionInputEnvelope>;
export const ProductOptionValueCreateManyProductOptionInputEnvelopeObjectZodSchema = makeSchema();
