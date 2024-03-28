"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { PropsWithChildren } from "react"
import { SignOutAction } from "./auth.action"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { currentUser } from "@/src/auth/current-user"



interface LoggedInDropDownProps extends PropsWithChildren {
    username: string;
}

export const LoggedInDropDown = (props: LoggedInDropDownProps) => {
    const { username, children } = props;
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={`/users/${username}`}>
                    <DropdownMenuItem >
                        <User size='16' className="mr-2" />
                        Profil
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => {
                    SignOutAction();
                }}>
                    <LogOut size='16' className="mr-2" />
                    LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
