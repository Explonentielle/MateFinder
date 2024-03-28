/*
  Warnings:

  - You are about to drop the column `free` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `Hour` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Location` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "free",
DROP COLUMN "hour",
DROP COLUMN "link",
DROP COLUMN "location",
ADD COLUMN     "Free" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "Hour" TEXT NOT NULL,
ADD COLUMN     "Link" TEXT,
ADD COLUMN     "Location" TEXT NOT NULL;
