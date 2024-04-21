"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { SignInButton } from "@/src/features/auth/SignInButton"
import { Layout } from "@/src/components/Layout";


export default function RouteError() {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Sorry you need to be logged in to view this page
                    </CardTitle>
                </CardHeader>
                <CardFooter>
                    <SignInButton />
                </CardFooter>
            </Card>
        </Layout>
    )
}

