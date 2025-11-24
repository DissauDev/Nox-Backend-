import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionUpdateWithoutValuesInputObjectSchema as ProductOptionUpdateWithoutValuesInputObjectSchema } from './ProductOptionUpdateWithoutValuesInput.schema';
import { ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema as ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutValuesInput.schema';
import { ProductOptionCreateWithoutValuesInputObjectSchema as ProductOptionCreateWithoutValuesInputObjectSchema } from './ProductOptionCreateWithoutValuesInput.schema';
import { ProductOptionUncheckedCreateWithoutValuesInputObjectSchema as ProductOptionUncheckedCreateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedCreateWithoutValuesInput.schema';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './ProductOptionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductOptionUpdateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductOptionCreateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutValuesInputObjectSchema)]),
  where: z.lazy(() => ProductOptionWhereInputObjectSchema).optional()
}).strict();
export const ProductOptionUpsertWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionUpsertWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpsertWithoutValuesInput>;
export const ProductOptionUpsertWithoutValuesInputObjectZodSchema = makeSchema();
