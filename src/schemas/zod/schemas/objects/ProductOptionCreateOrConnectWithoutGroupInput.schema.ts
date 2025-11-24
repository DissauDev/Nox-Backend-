import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionCreateWithoutGroupInputObjectSchema as ProductOptionCreateWithoutGroupInputObjectSchema } from './ProductOptionCreateWithoutGroupInput.schema';
import { ProductOptionUncheckedCreateWithoutGroupInputObjectSchema as ProductOptionUncheckedCreateWithoutGroupInputObjectSchema } from './ProductOptionUncheckedCreateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductOptionCreateWithoutGroupInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutGroupInputObjectSchema)])
}).strict();
export const ProductOptionCreateOrConnectWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutGroupInput>;
export const ProductOptionCreateOrConnectWithoutGroupInputObjectZodSchema = makeSchema();
