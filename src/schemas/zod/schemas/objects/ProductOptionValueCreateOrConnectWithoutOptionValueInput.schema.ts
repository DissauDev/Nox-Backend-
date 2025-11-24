import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueCreateWithoutOptionValueInputObjectSchema as ProductOptionValueCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueCreateWithoutOptionValueInput.schema';
import { ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedCreateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductOptionValueCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema)])
}).strict();
export const ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateOrConnectWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateOrConnectWithoutOptionValueInput>;
export const ProductOptionValueCreateOrConnectWithoutOptionValueInputObjectZodSchema = makeSchema();
