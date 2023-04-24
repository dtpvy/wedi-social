/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `PostReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "imgUrl",
ADD COLUMN     "imgUrls" VARCHAR(255)[];

-- AlterTable
ALTER TABLE "PostReaction" DROP CONSTRAINT "PostReaction_pkey",
ADD CONSTRAINT "PostReaction_pkey" PRIMARY KEY ("postId", "userId");
