import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueUpdateWithoutProductOptionInputObjectSchema as ProductOptionValueUpdateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUpdateWithoutProductOptionInput.schema';
import { ProductOptionValueUncheckedUpdateWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedUpdateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedUpdateWithoutProductOptionInput.schema';
import { ProductOptionValueCreateWithoutProductOptionInputObjectSchema as ProductOptionValueCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateWithoutProductOptionInput.schema';
import { ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductOptionValueUpdateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedUpdateWithoutProductOptionInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema)])
}).strict();
export const ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInput>;
export const ProductOptionValueUpsertWithWhereUniqueWithoutProductOptionInputObjectZodSchema = makeSchema();
