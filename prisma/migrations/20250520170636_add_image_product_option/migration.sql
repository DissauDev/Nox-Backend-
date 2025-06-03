/*
  Warnings:

  - Made the column `maxSelectable` on table `OptionGroup` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `imageUrl` to the `OptionValue` table without a default value. This is not possible if the table is not empty.
  - Made the column `extraPrice` on table `OptionValue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OptionGroup" ADD COLUMN     "minSelectable" INTEGER NOT NULL DEFAULT 2,
ALTER COLUMN "required" SET DEFAULT true,
ALTER COLUMN "maxSelectable" SET NOT NULL,
ALTER COLUMN "maxSelectable" SET DEFAULT 3;

-- AlterTable
ALTER TABLE "OptionValue" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "extraPrice" SET NOT NULL,
ALTER COLUMN "extraPrice" SET DEFAULT 0;
