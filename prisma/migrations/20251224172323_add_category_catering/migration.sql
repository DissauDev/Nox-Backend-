-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isCateringCategory" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cateringCategoryId" TEXT,
ADD COLUMN     "cateringDescription" TEXT,
ADD COLUMN     "cateringMinQty" INTEGER,
ADD COLUMN     "cateringName" TEXT;

-- CreateIndex
CREATE INDEX "Product_cateringCategoryId_idx" ON "Product"("cateringCategoryId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cateringCategoryId_fkey" FOREIGN KEY ("cateringCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
