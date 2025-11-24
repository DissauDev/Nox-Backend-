import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueUpdateWithoutProductOptionInputObjectSchema as ProductOptionValueUpdateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUpdateWithoutProductOptionInput.schema';
import { ProductOptionValueUncheckedUpdateWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedUpdateWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedUpdateWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionValueUpdateWithoutProductOptionInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedUpdateWithoutProductOptionInputObjectSchema)])
}).strict();
export const ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInput>;
export const ProductOptionValueUpdateWithWhereUniqueWithoutProductOptionInputObjectZodSchema = makeSchema();
