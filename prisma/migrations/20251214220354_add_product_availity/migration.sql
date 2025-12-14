-- CreateEnum
CREATE TYPE "ProductAvailability" AS ENUM ('PICKUP_ONLY', 'DELIVERY_ONLY', 'BOTH');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "availability" "ProductAvailability" NOT NULL DEFAULT 'BOTH';

-- CreateIndex
CREATE INDEX "Product_availability_idx" ON "Product"("availability");
