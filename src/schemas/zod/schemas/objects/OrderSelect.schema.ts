import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { OrderCountOutputTypeArgsObjectSchema as OrderCountOutputTypeArgsObjectSchema } from './OrderCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderNumber: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  totalAmount: z.boolean().optional(),
  subtotal: z.boolean().optional(),
  paymentMethod: z.boolean().optional(),
  stripePaymentIntentId: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  customerName: z.boolean().optional(),
  customerLastname: z.boolean().optional(),
  customerEmail: z.boolean().optional(),
  customerPhone: z.boolean().optional(),
  customerAddress: z.boolean().optional(),
  apartment: z.boolean().optional(),
  company: z.boolean().optional(),
  billingCity: z.boolean().optional(),
  billingState: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  specifications: z.boolean().optional(),
  items: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrderSelectObjectSchema: z.ZodType<Prisma.OrderSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderSelect>;
export const OrderSelectObjectZodSchema = makeSchema();
