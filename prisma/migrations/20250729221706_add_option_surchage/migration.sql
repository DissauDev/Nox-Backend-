-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isOptionItem" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "packOptionSurcharge" DOUBLE PRECISION NOT NULL DEFAULT 0;
