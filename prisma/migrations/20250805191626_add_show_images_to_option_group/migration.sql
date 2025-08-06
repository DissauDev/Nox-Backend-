/*
  Warnings:

  - You are about to drop the column `showImages` on the `OptionValue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OptionGroup" ADD COLUMN     "showImages" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "OptionValue" DROP COLUMN "showImages";
