"use server"

import { ActionError, userAction } from "@/src/safe.action";
import { UserSchema } from "./User.schema";
import { prisma } from "@/src/prisma";
import { z } from "zod";

export const verifyUserUniqueness = async (username: string, userId: string) => {

    const userExists = await prisma.user.findFirst({
        where: {
            username: username,
            id: {
                not: userId,
            },
        }
    });

    if (userExists) {
        throw new ActionError("User already exists with this username");
    }
}

export const updateUserAction = userAction(UserSchema, async (input, context) => {

    const userId = context.user.id;

    await verifyUserUniqueness(input.username, userId);

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...input,
        }
    });

    return user;
});