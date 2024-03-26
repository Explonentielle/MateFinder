
import React from 'react';
import { Button } from "@/src/components/ui/button"
import { SignInButton } from "./SignInButton";

import { baseAuth } from '@/src/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { LoggedInDropDown } from './LoggedInDropDown';

export const LoggedInButton = async () => {
    const session = await baseAuth()

    console.log(session)

    if (!session?.user) {
        return <SignInButton />
    }

    return (
        <LoggedInDropDown>
            <Button variant="outline" size="sm">
                <Avatar className='size-6'>
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                    {session.user.image ? (
                        <AvatarImage src={session.user.image} alt={`${session.user.name}'s profile picture`} />
                    ) : null}
                </Avatar>
            </Button>
        </LoggedInDropDown>
    )
}
