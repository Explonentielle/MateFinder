"use server"

import { ActionError, userAction } from "@/src/safe.action";
import { prisma } from "@/src/prisma";
import { z } from "zod";
import { CandidacySchema } from "./Candidacy.schema";
import { sendEmail } from "@/src/features/email/sendEmail";



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

  const activity = await prisma.activity.findUnique({
    where: {
      id: input.activityId,
    },
    select: {
      Title: true,
      userWanted: true,
      user: {
        select: {
          email: true,
        },
      },
      candidacies: {
        where: {
          status: "APPROVED"
        }
      }
    },
  });

  if (existingCandidacy) {
    throw new ActionError("You already have a candidacy for this activity.");
  }

  if (Number(activity?.userWanted) - Number(activity?.candidacies.length) <= 0) {
    throw new ActionError("No places remaining for this activity.");
  }


  const newCandidacy = await prisma.candidacy.create({
    data: {
      userId: context.user.id,
      activityId: input.activityId,
      status: "PENDING",
    },
  });


  sendEmail((activity?.user.email || ""), `New candidacy for activity ${activity?.Title}`, `You just receive a new candidacy for activity ${activity?.Title} from ${context.user.name} `)
  return newCandidacy;
});



export const updateCandidacyAction = userAction(
  z.object({
    id: z.string(),
    data: CandidacySchema,
  }),
  async (input) => {

    const candidacy = await prisma.candidacy.findUnique({
      where: {
        id: input.id,
      },
      include: {
        user: true,
        activity: {
          select: {
            Title: true,
            userWanted: true,
            candidacies: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (Number(candidacy?.activity?.userWanted) - Number(candidacy?.activity?.candidacies.length) <= 0) {
      throw new ActionError("No places remaining for this activity.");
    }

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



    if (input.data.status === "APPROVED") {
      sendEmail((candidacy?.user.email || ""), `Candidacy for ${candidacy?.activity.Title} was ${input.data.status}  `, `We are happy to inform you that your candidacy for activity ${candidacy?.activity.Title} was just ${input.data.status}!`)
    }
    else {
      sendEmail((candidacy?.user.email || ""), `Candidacy for ${candidacy?.activity.Title} was ${input.data.status}  `, `We are sorry, your candidacy for activity ${candidacy?.activity.Title} was just ${input.data.status}, but you will probably find other exciting opportunities to participate in. Keep exploring!`)
    }
    return updatedCandidacy;
  }
);
