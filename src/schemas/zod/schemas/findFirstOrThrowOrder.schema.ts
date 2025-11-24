import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderIncludeObjectSchema as OrderIncludeObjectSchema } from './objects/OrderInclude.schema';
import { OrderOrderByWithRelationInputObjectSchema as OrderOrderByWithRelationInputObjectSchema } from './objects/OrderOrderByWithRelationInput.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './objects/OrderWhereInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './objects/OrderWhereUniqueInput.schema';
import { OrderScalarFieldEnumSchema } from './enums/OrderScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrderFindFirstOrThrowSelectSchema: z.ZodType<Prisma.OrderSelect> = z.object({
    id: z.boolean().optional(),
    orderNumber: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    totalAmount: z.boolean().optional(),
    subtotal: z.boolean().optional(),
    paymentMethod: z.boolean().optional(),
    stripePaymentIntentId: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
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
    items: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OrderSelect>;

export const OrderFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    orderNumber: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    totalAmount: z.boolean().optional(),
    subtotal: z.boolean().optional(),
    paymentMethod: z.boolean().optional(),
    stripePaymentIntentId: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
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
    items: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const OrderFindFirstOrThrowSchema: z.ZodType<Prisma.OrderFindFirstOrThrowArgs> = z.object({ select: OrderFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => OrderIncludeObjectSchema.optional()), orderBy: z.union([OrderOrderByWithRelationInputObjectSchema, OrderOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderWhereInputObjectSchema.optional(), cursor: OrderWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderScalarFieldEnumSchema, OrderScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OrderFindFirstOrThrowArgs>;

export const OrderFindFirstOrThrowZodSchema = z.object({ select: OrderFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => OrderIncludeObjectSchema.optional()), orderBy: z.union([OrderOrderByWithRelationInputObjectSchema, OrderOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderWhereInputObjectSchema.optional(), cursor: OrderWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderScalarFieldEnumSchema, OrderScalarFieldEnumSchema.array()]).optional() }).strict();