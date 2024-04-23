"use client";

import { Button } from "@/src/components/ui/button"
import { LogIn } from "lucide-react";
import { signInAction } from "./auth.action";

export const SignInButton = async () => {
    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={() => {
                signInAction();
            }}
        >
            <LogIn size={16} className="mr-2" />
            Sign In
        </Button>
    )
}
  

