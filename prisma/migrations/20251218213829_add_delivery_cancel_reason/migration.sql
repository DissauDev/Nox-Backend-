-- CreateEnum
CREATE TYPE "DeliveryCancelSource" AS ENUM ('CUSTOMER', 'DRIVER', 'MERCHANT', 'SUPPORT', 'SYSTEM', 'OTHER');

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "cancelSource" "DeliveryCancelSource",
ADD COLUMN     "cancelledAt" TIMESTAMP(3);
