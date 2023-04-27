/*
  Warnings:

  - You are about to drop the column `isCreator` on the `JoinSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JoinSchedule" DROP COLUMN "isCreator",
ALTER COLUMN "remindTime" DROP NOT NULL;
