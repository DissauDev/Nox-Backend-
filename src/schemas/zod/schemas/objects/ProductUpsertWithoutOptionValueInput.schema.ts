import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUpdateWithoutOptionValueInputObjectSchema as ProductUpdateWithoutOptionValueInputObjectSchema } from './ProductUpdateWithoutOptionValueInput.schema';
import { ProductUncheckedUpdateWithoutOptionValueInputObjectSchema as ProductUncheckedUpdateWithoutOptionValueInputObjectSchema } from './ProductUncheckedUpdateWithoutOptionValueInput.schema';
import { ProductCreateWithoutOptionValueInputObjectSchema as ProductCreateWithoutOptionValueInputObjectSchema } from './ProductCreateWithoutOptionValueInput.schema';
import { ProductUncheckedCreateWithoutOptionValueInputObjectSchema as ProductUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductUncheckedCreateWithoutOptionValueInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOptionValueInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionValueInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutOptionValueInput>;
export const ProductUpsertWithoutOptionValueInputObjectZodSchema = makeSchema();
