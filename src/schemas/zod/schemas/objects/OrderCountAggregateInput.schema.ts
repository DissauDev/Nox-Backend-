import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  orderNumber: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  totalAmount: z.literal(true).optional(),
  subtotal: z.literal(true).optional(),
  paymentMethod: z.literal(true).optional(),
  stripePaymentIntentId: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  customerName: z.literal(true).optional(),
  customerLastname: z.literal(true).optional(),
  customerEmail: z.literal(true).optional(),
  customerPhone: z.literal(true).optional(),
  customerAddress: z.literal(true).optional(),
  apartment: z.literal(true).optional(),
  company: z.literal(true).optional(),
  billingCity: z.literal(true).optional(),
  billingState: z.literal(true).optional(),
  zipcode: z.literal(true).optional(),
  specifications: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const OrderCountAggregateInputObjectSchema: z.ZodType<Prisma.OrderCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrderCountAggregateInputType>;
export const OrderCountAggregateInputObjectZodSchema = makeSchema();
