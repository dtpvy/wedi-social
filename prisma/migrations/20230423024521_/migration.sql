/*
  Warnings:

  - You are about to drop the column `deleted` on the `Location` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "deleted",
ADD COLUMN     "placeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
