-- CreateEnum
CREATE TYPE "CandidacyStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Candidacy" (
    "id" TEXT NOT NULL,
    "status" "CandidacyStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidacy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Candidacy" ADD CONSTRAINT "Candidacy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidacy" ADD CONSTRAINT "Candidacy_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
