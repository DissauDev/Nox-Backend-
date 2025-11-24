import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateWithoutValuesInputObjectSchema as ProductOptionCreateWithoutValuesInputObjectSchema } from './ProductOptionCreateWithoutValuesInput.schema';
import { ProductOptionUncheckedCreateWithoutValuesInputObjectSchema as ProductOptionUncheckedCreateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedCreateWithoutValuesInput.schema';
import { ProductOptionCreateOrConnectWithoutValuesInputObjectSchema as ProductOptionCreateOrConnectWithoutValuesInputObjectSchema } from './ProductOptionCreateOrConnectWithoutValuesInput.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionCreateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutValuesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductOptionCreateOrConnectWithoutValuesInputObjectSchema).optional(),
  connect: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductOptionCreateNestedOneWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateNestedOneWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateNestedOneWithoutValuesInput>;
export const ProductOptionCreateNestedOneWithoutValuesInputObjectZodSchema = makeSchema();
