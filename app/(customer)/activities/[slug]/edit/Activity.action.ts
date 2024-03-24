"use server"

import { ActionError, userAction } from "@/src/safe.action";
import { ActivitySchema } from "./Activity.schema";
import { prisma } from "@/src/prisma";
import { z } from "zod";

const verifySlugUniqueness = async (slug: string, activityId?: string) => {
    const slugExists = await prisma.activity.count({
        where: {
            slug: slug,
            id: activityId ? {
                not: activityId,
            } : undefined
        }
    })

    if (slugExists) {
        throw new ActionError("Slug already exists")
    }
}

export const createActivityAction = userAction(ActivitySchema, async (input, context) => {

    await verifySlugUniqueness(input.slug);

    const activity = await prisma.activity.create({
        data: {
            ...input,
            userId: context.user.id,
        }
    });
    return activity;
});

export const updateActivityAction = userAction(
    z.object({
        id: z.string(),
        data: ActivitySchema,
    }),
    async (input, context) => {
        await verifySlugUniqueness(input.data.slug, input.id);

        const updatedActivity = await prisma.activity.update({
            where: {
                id: input.id,
                userId: context.user.id
            },
            data: input.data
        });

        return updatedActivity
    }
);
