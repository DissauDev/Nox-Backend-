import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateWithoutProductInputObjectSchema as ProductOptionUpdateWithoutProductInputObjectSchema } from './ProductOptionUpdateWithoutProductInput.schema';
import { ProductOptionUncheckedUpdateWithoutProductInputObjectSchema as ProductOptionUncheckedUpdateWithoutProductInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutProductInput.schema';
import { ProductOptionCreateWithoutProductInputObjectSchema as ProductOptionCreateWithoutProductInputObjectSchema } from './ProductOptionCreateWithoutProductInput.schema';
import { ProductOptionUncheckedCreateWithoutProductInputObjectSchema as ProductOptionUncheckedCreateWithoutProductInputObjectSchema } from './ProductOptionUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductOptionUpdateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductOptionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const ProductOptionUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpsertWithWhereUniqueWithoutProductInput>;
export const ProductOptionUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
