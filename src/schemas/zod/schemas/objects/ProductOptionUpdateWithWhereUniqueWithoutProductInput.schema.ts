import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateWithoutProductInputObjectSchema as ProductOptionUpdateWithoutProductInputObjectSchema } from './ProductOptionUpdateWithoutProductInput.schema';
import { ProductOptionUncheckedUpdateWithoutProductInputObjectSchema as ProductOptionUncheckedUpdateWithoutProductInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionUpdateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const ProductOptionUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateWithWhereUniqueWithoutProductInput>;
export const ProductOptionUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
