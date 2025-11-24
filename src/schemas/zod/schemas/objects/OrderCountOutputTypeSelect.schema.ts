import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCountOutputTypeCountItemsArgsObjectSchema as OrderCountOutputTypeCountItemsArgsObjectSchema } from './OrderCountOutputTypeCountItemsArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeCountItemsArgsObjectSchema)]).optional()
}).strict();
export const OrderCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OrderCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderCountOutputTypeSelect>;
export const OrderCountOutputTypeSelectObjectZodSchema = makeSchema();
