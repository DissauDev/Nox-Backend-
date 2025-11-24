import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateWithoutGroupInputObjectSchema as ProductOptionCreateWithoutGroupInputObjectSchema } from './ProductOptionCreateWithoutGroupInput.schema';
import { ProductOptionUncheckedCreateWithoutGroupInputObjectSchema as ProductOptionUncheckedCreateWithoutGroupInputObjectSchema } from './ProductOptionUncheckedCreateWithoutGroupInput.schema';
import { ProductOptionCreateOrConnectWithoutGroupInputObjectSchema as ProductOptionCreateOrConnectWithoutGroupInputObjectSchema } from './ProductOptionCreateOrConnectWithoutGroupInput.schema';
import { ProductOptionUpsertWithWhereUniqueWithoutGroupInputObjectSchema as ProductOptionUpsertWithWhereUniqueWithoutGroupInputObjectSchema } from './ProductOptionUpsertWithWhereUniqueWithoutGroupInput.schema';
import { ProductOptionCreateManyGroupInputEnvelopeObjectSchema as ProductOptionCreateManyGroupInputEnvelopeObjectSchema } from './ProductOptionCreateManyGroupInputEnvelope.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateWithWhereUniqueWithoutGroupInputObjectSchema as ProductOptionUpdateWithWhereUniqueWithoutGroupInputObjectSchema } from './ProductOptionUpdateWithWhereUniqueWithoutGroupInput.schema';
import { ProductOptionUpdateManyWithWhereWithoutGroupInputObjectSchema as ProductOptionUpdateManyWithWhereWithoutGroupInputObjectSchema } from './ProductOptionUpdateManyWithWhereWithoutGroupInput.schema';
import { ProductOptionScalarWhereInputObjectSchema as ProductOptionScalarWhereInputObjectSchema } from './ProductOptionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionCreateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionCreateWithoutGroupInputObjectSchema).array(), z.lazy(() => ProductOptionUncheckedCreateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutGroupInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionCreateOrConnectWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionCreateOrConnectWithoutGroupInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutGroupInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyGroupInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutGroupInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductOptionUpdateManyWithWhereWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUpdateManyWithWhereWithoutGroupInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductOptionScalarWhereInputObjectSchema), z.lazy(() => ProductOptionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionUncheckedUpdateManyWithoutGroupNestedInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutGroupNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutGroupNestedInput>;
export const ProductOptionUncheckedUpdateManyWithoutGroupNestedInputObjectZodSchema = makeSchema();
