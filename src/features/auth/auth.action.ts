"use server"

import { signIn, signOut } from "@/src/auth/auth"

export const SignOutAction = async () => {
    await signOut()
}

export const SignInAction = async () => {
    await signIn()
    console.error("sign in")
}