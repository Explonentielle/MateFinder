/*
  Warnings:

  - Made the column `Title` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "Title" SET NOT NULL;
