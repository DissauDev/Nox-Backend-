-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "OptionValue_groupId_name_idx" ON "OptionValue"("groupId", "name");

-- CreateIndex
CREATE INDEX "OptionValue_groupId_productRefId_idx" ON "OptionValue"("groupId", "productRefId");
