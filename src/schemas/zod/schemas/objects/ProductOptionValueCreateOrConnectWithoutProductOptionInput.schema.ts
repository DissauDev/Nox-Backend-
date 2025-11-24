import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueCreateWithoutProductOptionInputObjectSchema as ProductOptionValueCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateWithoutProductOptionInput.schema';
import { ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema)])
}).strict();
export const ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateOrConnectWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateOrConnectWithoutProductOptionInput>;
export const ProductOptionValueCreateOrConnectWithoutProductOptionInputObjectZodSchema = makeSchema();
