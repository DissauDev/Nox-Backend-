-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "lastRefundAt" TIMESTAMP(3),
ADD COLUMN     "notesFromStore" TEXT DEFAULT '',
ADD COLUMN     "refundReason" TEXT,
ADD COLUMN     "refundedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0;
