/*
  Warnings:

  - Added the required column `status` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('PENDING', 'ACCEPT', 'REJECT');

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "status" "FriendStatus" NOT NULL;
