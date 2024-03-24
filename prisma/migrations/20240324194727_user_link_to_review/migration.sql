/*
  Warnings:

  - The values [PREMIMUM] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('FREE', 'PREMIUM');
ALTER TABLE "User" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "plan" TYPE "Plan_new" USING ("plan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "Plan_old";
ALTER TABLE "User" ALTER COLUMN "plan" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
