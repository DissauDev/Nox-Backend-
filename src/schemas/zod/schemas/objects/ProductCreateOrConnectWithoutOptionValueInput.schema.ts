import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutOptionValueInputObjectSchema as ProductCreateWithoutOptionValueInputObjectSchema } from './ProductCreateWithoutOptionValueInput.schema';
import { ProductUncheckedCreateWithoutOptionValueInputObjectSchema as ProductUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductUncheckedCreateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionValueInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutOptionValueInput>;
export const ProductCreateOrConnectWithoutOptionValueInputObjectZodSchema = makeSchema();
