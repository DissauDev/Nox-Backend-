import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './ProductOptionWhereInput.schema';
import { ProductOptionUpdateWithoutValuesInputObjectSchema as ProductOptionUpdateWithoutValuesInputObjectSchema } from './ProductOptionUpdateWithoutValuesInput.schema';
import { ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema as ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutValuesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductOptionUpdateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema)])
}).strict();
export const ProductOptionUpdateToOneWithWhereWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateToOneWithWhereWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateToOneWithWhereWithoutValuesInput>;
export const ProductOptionUpdateToOneWithWhereWithoutValuesInputObjectZodSchema = makeSchema();
