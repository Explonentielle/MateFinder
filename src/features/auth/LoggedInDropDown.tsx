"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { PropsWithChildren, useEffect } from "react"
import { singOutAction } from "./auth.action"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { useChat } from "@/app/(customer)/users/chat/ChatContext"



interface LoggedInDropDownProps extends PropsWithChildren {
    id: string;
    current: {
        id: string,
        name:string,
        email: string,
        photoUrl: string,
      }
}

export const LoggedInDropDown = (props: LoggedInDropDownProps) => {
    const { id, current, children } = props;
    const { setCurrent, setOtherUser } = useChat();

    useEffect(() => {
        setCurrent(current);
    }, [setCurrent, current]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={`/users/${id}`}>
                    <DropdownMenuItem >
                        <User size='16' className="mr-2" />
                        Profil
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => {
                    singOutAction();
                    setCurrent(null);
                    setOtherUser(null);
                }}>
                    <LogOut size='16' className="mr-2" />
                    LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
