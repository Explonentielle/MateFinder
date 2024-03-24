"use server"

import { ActionError, userAction } from "@/src/safe.action";
import { CandidacySchema } from "./Candidacy.schema";
import { prisma } from "@/src/prisma";
import { z } from "zod";


export const createCandidacyAction = userAction(CandidacySchema, async (input, context) => {

});

export const updateCandidacyAction = userAction(
    z.object({
        id: z.string(),
        data: CandidacySchema,
    }),
    async (input, context) => {

        const updatedCandidacy = await prisma.activity.update({
            where: {
                id: input.id,
                userId: context.user.id
            },
            data: input.data
        });

        return updatedCandidacy
    }
);
