/*
  Warnings:

  - Added the required column `Departement` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "Departement" TEXT NOT NULL;
