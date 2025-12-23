-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "hasCatering" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ProductCateringTier" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "minQty" INTEGER NOT NULL,
    "maxQty" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCateringTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductCateringTier_productId_minQty_maxQty_idx" ON "ProductCateringTier"("productId", "minQty", "maxQty");

-- AddForeignKey
ALTER TABLE "ProductCateringTier" ADD CONSTRAINT "ProductCateringTier_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
