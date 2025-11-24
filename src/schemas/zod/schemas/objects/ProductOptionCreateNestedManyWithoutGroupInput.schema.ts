import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateWithoutGroupInputObjectSchema as ProductOptionCreateWithoutGroupInputObjectSchema } from './ProductOptionCreateWithoutGroupInput.schema';
import { ProductOptionUncheckedCreateWithoutGroupInputObjectSchema as ProductOptionUncheckedCreateWithoutGroupInputObjectSchema } from './ProductOptionUncheckedCreateWithoutGroupInput.schema';
import { ProductOptionCreateOrConnectWithoutGroupInputObjectSchema as ProductOptionCreateOrConnectWithoutGroupInputObjectSchema } from './ProductOptionCreateOrConnectWithoutGroupInput.schema';
import { ProductOptionCreateManyGroupInputEnvelopeObjectSchema as ProductOptionCreateManyGroupInputEnvelopeObjectSchema } from './ProductOptionCreateManyGroupInputEnvelope.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionCreateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionCreateWithoutGroupInputObjectSchema).array(), z.lazy(() => ProductOptionUncheckedCreateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutGroupInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductOptionCreateOrConnectWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionCreateOrConnectWithoutGroupInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyGroupInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductOptionWhereUniqueInputObjectSchema), z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductOptionCreateNestedManyWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateNestedManyWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateNestedManyWithoutGroupInput>;
export const ProductOptionCreateNestedManyWithoutGroupInputObjectZodSchema = makeSchema();
