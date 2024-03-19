"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { PropsWithChildren } from "react"
import { SignOutAction } from "./auth.action"
import { LogOut } from "lucide-react"


export type LoggedInDropDownProps = PropsWithChildren

export const LoggedInDropDown = (props: LoggedInDropDownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {props.children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
