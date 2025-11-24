import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderNumber: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional(),
  subtotal: SortOrderSchema.optional(),
  paymentMethod: SortOrderSchema.optional(),
  stripePaymentIntentId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  customerName: SortOrderSchema.optional(),
  customerLastname: SortOrderSchema.optional(),
  customerEmail: SortOrderSchema.optional(),
  customerPhone: SortOrderSchema.optional(),
  customerAddress: SortOrderSchema.optional(),
  apartment: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  billingCity: SortOrderSchema.optional(),
  billingState: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  specifications: SortOrderSchema.optional()
}).strict();
export const OrderMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrderMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderMaxOrderByAggregateInput>;
export const OrderMaxOrderByAggregateInputObjectZodSchema = makeSchema();
