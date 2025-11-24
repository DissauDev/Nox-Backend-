import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUpdateWithoutOptionsInputObjectSchema as ProductUpdateWithoutOptionsInputObjectSchema } from './ProductUpdateWithoutOptionsInput.schema';
import { ProductUncheckedUpdateWithoutOptionsInputObjectSchema as ProductUncheckedUpdateWithoutOptionsInputObjectSchema } from './ProductUncheckedUpdateWithoutOptionsInput.schema';
import { ProductCreateWithoutOptionsInputObjectSchema as ProductCreateWithoutOptionsInputObjectSchema } from './ProductCreateWithoutOptionsInput.schema';
import { ProductUncheckedCreateWithoutOptionsInputObjectSchema as ProductUncheckedCreateWithoutOptionsInputObjectSchema } from './ProductUncheckedCreateWithoutOptionsInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOptionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionsInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutOptionsInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutOptionsInput>;
export const ProductUpsertWithoutOptionsInputObjectZodSchema = makeSchema();
