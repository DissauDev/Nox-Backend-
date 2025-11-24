import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueUpdateWithoutOptionValueInputObjectSchema as ProductOptionValueUpdateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUpdateWithoutOptionValueInput.schema';
import { ProductOptionValueUncheckedUpdateWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedUpdateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedUpdateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionValueUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedUpdateWithoutOptionValueInputObjectSchema)])
}).strict();
export const ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInput>;
export const ProductOptionValueUpdateWithWhereUniqueWithoutOptionValueInputObjectZodSchema = makeSchema();
