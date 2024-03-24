/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `Information` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Date` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userWanted` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Icon` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categorie` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "Information" SET NOT NULL,
ALTER COLUMN "Date" SET NOT NULL,
ALTER COLUMN "userWanted" SET NOT NULL,
ALTER COLUMN "Icon" SET NOT NULL,
ALTER COLUMN "categorie" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
