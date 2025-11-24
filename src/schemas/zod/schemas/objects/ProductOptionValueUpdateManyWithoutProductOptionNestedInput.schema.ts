import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateWithoutProductOptionInputObjectSchema as ProductOptionValueCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateWithoutProductOptionInput.schema';
import { ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutProductOptionInput.schema';
import { ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema as ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateOrConnectWithoutProductOptionInput.schema';
import { ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInputObjectSchema as ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInputObjectSchema } from './ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInput.schema';
import { ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema as ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema } from './ProductOptionValueCreateManyProductOptionInputEnvelope.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInputObjectSchema as ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInputObjectSchema } from './ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInput.schema';
import { ProductOptionValueUpdateManyWithWhereWithoutProductOptionInputObjectSchema as ProductOptionValueUpdateManyWithWhereWithoutProductOptionInputObjectSchema } from './ProductOptionValueUpdateManyWithWhereWithoutProductOptionInput.schema';
import { ProductOptionValueScalarWhereInputObjectSchema as ProductOptionValueScalarWhereInputObjectSchema } from './ProductOptionValueScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueCreateWithoutProductOptionInputObjectSchema).array(), z.lazy(() => ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductOptionValueUpdateManyWithWhereWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUpdateManyWithWhereWithoutProductOptionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema), z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionValueUpdateManyWithoutProductOptionNestedInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateManyWithoutProductOptionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyWithoutProductOptionNestedInput>;
export const ProductOptionValueUpdateManyWithoutProductOptionNestedInputObjectZodSchema = makeSchema();
