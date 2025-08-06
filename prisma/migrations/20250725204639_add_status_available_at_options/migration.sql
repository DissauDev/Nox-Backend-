-- AlterTable
ALTER TABLE "OptionGroup" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "OptionValue" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
