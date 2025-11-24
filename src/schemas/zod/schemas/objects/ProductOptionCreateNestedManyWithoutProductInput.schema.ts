import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateWithoutProductInputObjectSchema as ProductOptionCreateWithoutProductInputObjectSchema } from './ProductOptionCreateWithoutProductInput.schema';
import { ProductOptionUncheckedCreateWithoutProductInputObjectSchema as ProductOptionUncheckedCreateWithoutProductInputObjectSchema } from './ProductOptionUncheckedCreateWithoutProductInput.schema';
import { ProductOptionCreateOrConnectWithoutProductInputObjectSchema as ProductOptionCreateOrConnectWithoutProductInputObjectSchema } from './ProductOptionCreateOrConnectWithoutProductInput.schema';
import { ProductOptionCreateManyProductInputEnvelopeObjectSchema as ProductOptionCreateManyProductInputEnvelopeObjectSchema } from './ProductOptionCreateManyProductInputEnvelope.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionCreateWithoutProductInputObjectSchema).array(), z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateNestedManyWithoutProductInput>;
export const ProductOptionCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
