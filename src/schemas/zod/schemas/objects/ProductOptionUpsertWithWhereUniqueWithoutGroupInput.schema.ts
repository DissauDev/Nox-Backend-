import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateWithoutGroupInputObjectSchema as ProductOptionUpdateWithoutGroupInputObjectSchema } from './ProductOptionUpdateWithoutGroupInput.schema';
import { ProductOptionUncheckedUpdateWithoutGroupInputObjectSchema as ProductOptionUncheckedUpdateWithoutGroupInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutGroupInput.schema';
import { ProductOptionCreateWithoutGroupInputObjectSchema as ProductOptionCreateWithoutGroupInputObjectSchema } from './ProductOptionCreateWithoutGroupInput.schema';
import { ProductOptionUncheckedCreateWithoutGroupInputObjectSchema as ProductOptionUncheckedCreateWithoutGroupInputObjectSchema } from './ProductOptionUncheckedCreateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductOptionUpdateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutGroupInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductOptionCreateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutGroupInputObjectSchema)])
}).strict();
export const ProductOptionUpsertWithWhereUniqueWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionUpsertWithWhereUniqueWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpsertWithWhereUniqueWithoutGroupInput>;
export const ProductOptionUpsertWithWhereUniqueWithoutGroupInputObjectZodSchema = makeSchema();
