-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "specifications" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "hasSpecifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "specificationsTitle" TEXT DEFAULT 'Specifications';
