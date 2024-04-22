
import React from 'react';
import { Button } from "@/src/components/ui/button"
import { SignInButton } from "./SignInButton";
import { baseAuth } from '@/src/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { LoggedInDropDown } from './LoggedInDropDown';
import { prisma } from '@/src/prisma';
import { UserAvatar } from '@/src/components/UserAvatar';

export const LoggedInButton = async () => {
    const session = await baseAuth()

    if (!session?.user) {
        return <SignInButton />
    }

    if (session.user.id) {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        return (
            <LoggedInDropDown id={user?.username ?? ""} >
                <Button variant="outline" size="sm">
                    <UserAvatar email={session.user.email || ""} image={session.user.image || undefined} />
                </Button>
            </LoggedInDropDown>
        )
    }
}
