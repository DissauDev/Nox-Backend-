import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueUpdateWithoutOptionValueInputObjectSchema as ProductOptionValueUpdateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUpdateWithoutOptionValueInput.schema';
import { ProductOptionValueUncheckedUpdateWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedUpdateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedUpdateWithoutOptionValueInput.schema';
import { ProductOptionValueCreateWithoutOptionValueInputObjectSchema as ProductOptionValueCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateWithoutOptionValueInput.schema';
import { ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductOptionValueUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedUpdateWithoutOptionValueInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema)])
}).strict();
export const ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInput>;
export const ProductOptionValueUpsertWithWhereUniqueWithoutOptionValueInputObjectZodSchema = makeSchema();
