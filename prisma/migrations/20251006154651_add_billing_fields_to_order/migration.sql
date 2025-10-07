-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "zipcode" TEXT,
ALTER COLUMN "customerPhone" DROP NOT NULL;
