/*
  Warnings:

  - You are about to drop the column `remindTime` on the `JoinSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JoinSchedule" DROP COLUMN "remindTime",
ADD COLUMN     "reminderTime" TIMESTAMP(3);
