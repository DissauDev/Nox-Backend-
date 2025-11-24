import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateWithoutProductInputObjectSchema as ProductOptionCreateWithoutProductInputObjectSchema } from './ProductOptionCreateWithoutProductInput.schema';
import { ProductOptionUncheckedCreateWithoutProductInputObjectSchema as ProductOptionUncheckedCreateWithoutProductInputObjectSchema } from './ProductOptionUncheckedCreateWithoutProductInput.schema';
import { ProductOptionCreateOrConnectWithoutProductInputObjectSchema as ProductOptionCreateOrConnectWithoutProductInputObjectSchema } from './ProductOptionCreateOrConnectWithoutProductInput.schema';
import { ProductOptionUpsertWithWhereUniqueWithoutProductInputObjectSchema as ProductOptionUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './ProductOptionUpsertWithWhereUniqueWithoutProductInput.schema';
import { ProductOptionCreateManyProductInputEnvelopeObjectSchema as ProductOptionCreateManyProductInputEnvelopeObjectSchema } from './ProductOptionCreateManyProductInputEnvelope.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateWithWhereUniqueWithoutProductInputObjectSchema as ProductOptionUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './ProductOptionUpdateWithWhereUniqueWithoutProductInput.schema';
import { ProductOptionUpdateManyWithWhereWithoutProductInputObjectSchema as ProductOptionUpdateManyWithWhereWithoutProductInputObjectSchema } from './ProductOptionUpdateManyWithWhereWithoutProductInput.schema';
import { ProductOptionScalarWhereInputObjectSchema as ProductOptionScalarWhereInputObjectSchema } from './ProductOptionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionCreateWithoutProductInputObjectSchema).array(), z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductOptionUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductOptionScalarWhereInputObjectSchema), z.lazy(() => ProductOptionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateManyWithoutProductNestedInput>;
export const ProductOptionUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
