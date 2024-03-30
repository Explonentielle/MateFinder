"use server"

import { ActionError, userAction } from "@/src/safe.action";
import { prisma } from "@/src/prisma";
import { z } from "zod";
import { CandidacySchema } from "./Candidacy.schema";


const CreateCandidacySchema = z.object({
  activityId: z.string(),
});


export const createCandidacyAction = userAction(CreateCandidacySchema, async (input, context) => {
  const existingCandidacy = await prisma.candidacy.findFirst({
    where: {
      userId: context.user.id,
      activityId: input.activityId,
    },
  });

  if (existingCandidacy) {
    throw new ActionError("You already have a candidacy for this activity.");
  }

  const newCandidacy = await prisma.candidacy.create({
    data: {
      userId: context.user.id,
      activityId: input.activityId,
      status: "PENDING",
    },
  });
  return newCandidacy;
});

export const updateCandidacyAction = userAction(
  z.object({
    id: z.string(),
    data: CandidacySchema,
  }),
  async (input) => {
    const updatedCandidacy = await prisma.candidacy.update({
      where: {
        id: input.id,
      },
      data: {
        userId: input.data.userId,
        activityId: input.data.activityId,
        status: input.data.status,
      },
    });

    return updatedCandidacy;
  }
);
