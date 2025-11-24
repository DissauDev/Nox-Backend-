import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateWithoutOptionValueInputObjectSchema as ProductOptionValueCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateWithoutOptionValueInput.schema';
import { ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutOptionValueInput.schema';
import { ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema as ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateOrConnectWithoutOptionValueInput.schema';
import { ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInputObjectSchema as ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInputObjectSchema } from './ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInput.schema';
import { ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema as ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema } from './ProductOptionValueCreateManyOptionValueInputEnvelope.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInputObjectSchema as ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInputObjectSchema } from './ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInput.schema';
import { ProductOptionValueUpdateManyWithWhereWithoutOptionValueInputObjectSchema as ProductOptionValueUpdateManyWithWhereWithoutOptionValueInputObjectSchema } from './ProductOptionValueUpdateManyWithWhereWithoutOptionValueInput.schema';
import { ProductOptionValueScalarWhereInputObjectSchema as ProductOptionValueScalarWhereInputObjectSchema } from './ProductOptionValueScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueCreateWithoutOptionValueInputObjectSchema).array(), z.lazy(() => ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductOptionValueUpdateManyWithWhereWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUpdateManyWithWhereWithoutOptionValueInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema), z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionValueUpdateManyWithoutOptionValueNestedInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateManyWithoutOptionValueNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyWithoutOptionValueNestedInput>;
export const ProductOptionValueUpdateManyWithoutOptionValueNestedInputObjectZodSchema = makeSchema();
