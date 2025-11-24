import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutOptionsInputObjectSchema as ProductUpdateWithoutOptionsInputObjectSchema } from './ProductUpdateWithoutOptionsInput.schema';
import { ProductUncheckedUpdateWithoutOptionsInputObjectSchema as ProductUncheckedUpdateWithoutOptionsInputObjectSchema } from './ProductUncheckedUpdateWithoutOptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOptionsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutOptionsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutOptionsInput>;
export const ProductUpdateToOneWithWhereWithoutOptionsInputObjectZodSchema = makeSchema();
