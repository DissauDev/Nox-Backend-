import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutOptionsInputObjectSchema as ProductCreateWithoutOptionsInputObjectSchema } from './ProductCreateWithoutOptionsInput.schema';
import { ProductUncheckedCreateWithoutOptionsInputObjectSchema as ProductUncheckedCreateWithoutOptionsInputObjectSchema } from './ProductUncheckedCreateWithoutOptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutOptionsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutOptionsInput>;
export const ProductCreateOrConnectWithoutOptionsInputObjectZodSchema = makeSchema();
