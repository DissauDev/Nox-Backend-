import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutOptionValueInputObjectSchema as ProductCreateWithoutOptionValueInputObjectSchema } from './ProductCreateWithoutOptionValueInput.schema';
import { ProductUncheckedCreateWithoutOptionValueInputObjectSchema as ProductUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductUncheckedCreateWithoutOptionValueInput.schema';
import { ProductCreateOrConnectWithoutOptionValueInputObjectSchema as ProductCreateOrConnectWithoutOptionValueInputObjectSchema } from './ProductCreateOrConnectWithoutOptionValueInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionValueInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOptionValueInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutOptionValueInput>;
export const ProductCreateNestedOneWithoutOptionValueInputObjectZodSchema = makeSchema();
