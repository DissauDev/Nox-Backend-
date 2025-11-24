import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueCreateWithoutOptionValueInputObjectSchema as ProductOptionValueCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateWithoutOptionValueInput.schema';
import { ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutOptionValueInput.schema';
import { ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema as ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateOrConnectWithoutOptionValueInput.schema';
import { ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema as ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema } from './ProductOptionValueCreateManyOptionValueInputEnvelope.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueCreateWithoutOptionValueInputObjectSchema).array(), z.lazy(() => ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionValueCreateManyOptionValueInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInput>;
export const ProductOptionValueUncheckedCreateNestedManyWithoutOptionValueInputObjectZodSchema = makeSchema();
