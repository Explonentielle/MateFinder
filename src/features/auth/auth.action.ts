"use server"

import { signIn, signOut } from "@/src/auth/auth"

export const singOutAction = async () => {
    await signOut();
  };
  
  export const signInAction = async () => {
    await signIn();
  };