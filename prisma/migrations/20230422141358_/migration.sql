-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "deletedAt" DROP NOT NULL;
