/*
  Warnings:

  - Added the required column `hour` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "free" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hour" TEXT NOT NULL,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "location" TEXT NOT NULL;
