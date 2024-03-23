"use client";

import { Button } from "@/src/components/ui/button"
import { LogIn } from "lucide-react";
import { SignInAction } from "./auth.action";

export const SignInButton = async () => {
    return (
        <form>
            <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                    await SignInAction();
                }}
            >
                <LogIn size='16' className="mr-2" />
                Sign In
            </Button>
        </form>
    )
}
