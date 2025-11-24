import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateManyGroupInputObjectSchema as ProductOptionCreateManyGroupInputObjectSchema } from './ProductOptionCreateManyGroupInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductOptionCreateManyGroupInputObjectSchema), z.lazy(() => ProductOptionCreateManyGroupInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductOptionCreateManyGroupInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductOptionCreateManyGroupInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateManyGroupInputEnvelope>;
export const ProductOptionCreateManyGroupInputEnvelopeObjectZodSchema = makeSchema();
