-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "onlyForCatering" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Product_hasCatering_onlyForCatering_idx" ON "Product"("hasCatering", "onlyForCatering");
