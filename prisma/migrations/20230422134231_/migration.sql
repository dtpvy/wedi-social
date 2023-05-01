/*
  Warnings:

  - The primary key for the `JoinSchedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tripId` on the `JoinSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrls` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JoinSchedule" DROP CONSTRAINT "JoinSchedule_tripId_fkey";

-- AlterTable
ALTER TABLE "JoinSchedule" DROP CONSTRAINT "JoinSchedule_pkey",
DROP COLUMN "tripId",
ADD CONSTRAINT "JoinSchedule_pkey" PRIMARY KEY ("userId", "scheduleId");

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "imgUrls",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "tripId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
