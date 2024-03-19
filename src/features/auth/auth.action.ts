"use server"

import { signOut } from "@/src/auth/auth"

export const SignOutAction = async () => {
    await signOut()
}