import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionCreateWithoutValuesInputObjectSchema as ProductOptionCreateWithoutValuesInputObjectSchema } from './ProductOptionCreateWithoutValuesInput.schema';
import { ProductOptionUncheckedCreateWithoutValuesInputObjectSchema as ProductOptionUncheckedCreateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedCreateWithoutValuesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductOptionCreateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutValuesInputObjectSchema)])
}).strict();
export const ProductOptionCreateOrConnectWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutValuesInput>;
export const ProductOptionCreateOrConnectWithoutValuesInputObjectZodSchema = makeSchema();
