/*
  Warnings:

  - Added the required column `privacy` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "privacy" "Privacy" NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "imgUrl" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
