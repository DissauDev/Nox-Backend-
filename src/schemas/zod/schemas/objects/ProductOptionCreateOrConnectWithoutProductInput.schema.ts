import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionCreateWithoutProductInputObjectSchema as ProductOptionCreateWithoutProductInputObjectSchema } from './ProductOptionCreateWithoutProductInput.schema';
import { ProductOptionUncheckedCreateWithoutProductInputObjectSchema as ProductOptionUncheckedCreateWithoutProductInputObjectSchema } from './ProductOptionUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductOptionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const ProductOptionCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutProductInput>;
export const ProductOptionCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
