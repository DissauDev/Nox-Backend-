import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutOptionsInputObjectSchema as ProductCreateWithoutOptionsInputObjectSchema } from './ProductCreateWithoutOptionsInput.schema';
import { ProductUncheckedCreateWithoutOptionsInputObjectSchema as ProductUncheckedCreateWithoutOptionsInputObjectSchema } from './ProductUncheckedCreateWithoutOptionsInput.schema';
import { ProductCreateOrConnectWithoutOptionsInputObjectSchema as ProductCreateOrConnectWithoutOptionsInputObjectSchema } from './ProductCreateOrConnectWithoutOptionsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOptionsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutOptionsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutOptionsInput>;
export const ProductCreateNestedOneWithoutOptionsInputObjectZodSchema = makeSchema();
