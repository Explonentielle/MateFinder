"use server"

import { ActionError, userAction } from "@/src/safe.action";
import { ReviewSchema } from "./Review.schema";
import { prisma } from "@/src/prisma";
import { z } from "zod";

const verifyReviewUniqueness = async (activityId: string, userId: string) => {

    const reviewExists = await prisma.review.count({
        where: {
            activityId: activityId,
            userId: userId,
        }
    });

    if (reviewExists) {
        throw new ActionError("User already reviewed this activity");
    }
}

export const createReviewAction = userAction(ReviewSchema, async (input, context) => {
    const userId = context.user.id;

    await verifyReviewUniqueness(input.activityId, userId);

    const review = await prisma.review.create({
        data: {
            ...input,
            userId: userId,
            activityId: input.activityId,
        }
    });

    return review;
});
