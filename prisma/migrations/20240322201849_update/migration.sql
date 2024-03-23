/*
  Warnings:

  - You are about to drop the column `categorie` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "categorie",
ADD COLUMN     "Categorie" TEXT;
