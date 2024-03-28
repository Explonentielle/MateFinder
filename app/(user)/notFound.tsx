"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Layout } from "@/src/components/Layout";
import { SignInButton } from "@/src/features/auth/SignInButton";


export default function RouteError() {
    return (
        <Layout>
            <Card className="flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle className="p-8 font-bold">
                        Sorry you need to be logged in to view this page or user not found
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center flex-col items-center">
                    <SignInButton />
                    <CardDescription className="p-8 w-2/3">The User may deleted or you don't have the permission to view it.</CardDescription>
                </CardContent>
            </Card>
        </Layout>
    )
}

