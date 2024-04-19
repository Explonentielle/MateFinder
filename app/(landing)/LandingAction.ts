"use server"

import { currentUser } from "@/src/auth/current-user";
import { prisma } from "@/src/prisma";
import {  User } from "@prisma/client";

interface Activity {
    id: string;
    Title: string;
    slug: string;
    Icon: string;
    Free: boolean;
    Location: string;
    categorie: string;
    Date: Date;
    Hour: string;
    userWanted: string;
    user: {
        image: string | null; 
        name: string | null;
    };
}



export const getUser = async (): Promise<User | null> => {
    const user: User | null = await currentUser();
    return user;
 }


export const getActivities = async (userLocation: string) => { 
    const currentDate = new Date();
    const activities: Activity[] = await prisma.activity.findMany({ 
        where: {
            Date: {
                gte: currentDate
            },
            Location: userLocation 
        },
        take: 10,
        orderBy: {
            Date: "asc",
        },
        include: {
            user: {
                select: {
                    image: true,
                    name: true,
                }
            }
        },
    });

    return activities; 
}