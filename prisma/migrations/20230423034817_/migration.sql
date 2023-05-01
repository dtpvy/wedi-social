/*
  Warnings:

  - You are about to drop the column `locationId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_locationId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "locationId",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
