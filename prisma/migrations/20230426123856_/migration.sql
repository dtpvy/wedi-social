/*
  Warnings:

  - You are about to drop the column `cityId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `wardId` on the `Location` table. All the data in the column will be lost.
  - Added the required column `address` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_districtId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_wardId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "cityId",
DROP COLUMN "countryId",
DROP COLUMN "districtId",
DROP COLUMN "street",
DROP COLUMN "wardId",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "imgUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
