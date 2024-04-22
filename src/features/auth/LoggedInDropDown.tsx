"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { PropsWithChildren } from "react"
import { SignOutAction } from "./auth.action"
import { LogOut, User } from "lucide-react"
import Link from "next/link"



interface LoggedInDropDownProps extends PropsWithChildren {
    id: string;
}

export const LoggedInDropDown = (props: LoggedInDropDownProps) => {
    const { id, children } = props;
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {/* <Link href={`/users/${id}`}>
                    <DropdownMenuItem >
                        <User size='16' className="mr-2" />
                        Profil
                    </DropdownMenuItem>
                </Link> */}
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
