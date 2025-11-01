-- DropIndex
DROP INDEX "OptionValue_groupId_name_idx";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "sortOrder" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "OptionValue" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sortOrder" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "ProductOption" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Category_sortOrder_name_idx" ON "Category"("sortOrder", "name");

-- CreateIndex
CREATE INDEX "OptionValue_groupId_sortOrder_name_idx" ON "OptionValue"("groupId", "sortOrder", "name");

-- CreateIndex
CREATE INDEX "Product_status_idx" ON "Product"("status");

-- CreateIndex
CREATE INDEX "Product_categoryId_sortOrder_name_idx" ON "Product"("categoryId", "sortOrder", "name");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "ProductOption_productId_sortOrder_idx" ON "ProductOption"("productId", "sortOrder");
