import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateWithoutGroupInputObjectSchema as ProductOptionUpdateWithoutGroupInputObjectSchema } from './ProductOptionUpdateWithoutGroupInput.schema';
import { ProductOptionUncheckedUpdateWithoutGroupInputObjectSchema as ProductOptionUncheckedUpdateWithoutGroupInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionUpdateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutGroupInputObjectSchema)])
}).strict();
export const ProductOptionUpdateWithWhereUniqueWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateWithWhereUniqueWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateWithWhereUniqueWithoutGroupInput>;
export const ProductOptionUpdateWithWhereUniqueWithoutGroupInputObjectZodSchema = makeSchema();
