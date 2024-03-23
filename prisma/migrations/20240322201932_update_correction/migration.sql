/*
  Warnings:

  - You are about to drop the column `Categorie` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "Categorie",
ADD COLUMN     "categorie" TEXT;
