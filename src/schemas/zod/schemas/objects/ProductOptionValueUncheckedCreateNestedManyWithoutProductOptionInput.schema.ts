import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateWithoutProductOptionInputObjectSchema as ProductOptionValueCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateWithoutProductOptionInput.schema';
import { ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutProductOptionInput.schema';
import { ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema as ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateOrConnectWithoutProductOptionInput.schema';
import { ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema as ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema } from './ProductOptionValueCreateManyProductOptionInputEnvelope.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueCreateWithoutProductOptionInputObjectSchema).array(), z.lazy(() => ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionValueCreateManyProductOptionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInput>;
export const ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectZodSchema = makeSchema();
