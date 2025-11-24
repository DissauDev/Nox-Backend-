import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutOptionValueInputObjectSchema as ProductUpdateWithoutOptionValueInputObjectSchema } from './ProductUpdateWithoutOptionValueInput.schema';
import { ProductUncheckedUpdateWithoutOptionValueInputObjectSchema as ProductUncheckedUpdateWithoutOptionValueInputObjectSchema } from './ProductUncheckedUpdateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOptionValueInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutOptionValueInput>;
export const ProductUpdateToOneWithWhereWithoutOptionValueInputObjectZodSchema = makeSchema();
