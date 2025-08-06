-- AlterTable
ALTER TABLE "OptionValue" ADD COLUMN     "showImages" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "imageUrl" DROP NOT NULL;
