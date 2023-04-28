/*
  Warnings:

  - Added the required column `endDate` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TripStatus" ADD VALUE 'INPROGRESS';

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "bgUrl" VARCHAR(255),
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
