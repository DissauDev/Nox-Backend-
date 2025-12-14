-- CreateEnum
CREATE TYPE "FulfillmentType" AS ENUM ('PICKUP', 'DELIVERY');

-- CreateEnum
CREATE TYPE "DeliveryProvider" AS ENUM ('DOORDASH');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('REQUESTED', 'SENT', 'ACCEPTED', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "fulfillmentType" "FulfillmentType" NOT NULL DEFAULT 'PICKUP';

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "provider" "DeliveryProvider" NOT NULL DEFAULT 'DOORDASH',
    "externalDeliveryId" TEXT NOT NULL,
    "doordashDeliveryId" TEXT,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'REQUESTED',
    "pickupAddress" TEXT,
    "dropoffAddress" TEXT,
    "dropoffName" TEXT,
    "dropoffPhone" TEXT,
    "trackingUrl" TEXT,
    "deliveryFee" DOUBLE PRECISION,
    "tipAmount" DOUBLE PRECISION,
    "currency" TEXT DEFAULT 'USD',
    "driverName" TEXT,
    "driverPhone" TEXT,
    "etaPickup" TIMESTAMP(3),
    "etaDropoff" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "rawRequest" JSONB,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_orderId_key" ON "Delivery"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_externalDeliveryId_key" ON "Delivery"("externalDeliveryId");

-- CreateIndex
CREATE INDEX "Delivery_provider_status_idx" ON "Delivery"("provider", "status");

-- CreateIndex
CREATE INDEX "Delivery_doordashDeliveryId_idx" ON "Delivery"("doordashDeliveryId");

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
