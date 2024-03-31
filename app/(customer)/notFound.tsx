"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Layout } from "@/src/components/Layout";


export default function RouteError() {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Activity not found
                    </CardTitle>
                    <CardDescription>The Activity may deleted or you don t have the permission to view it.</CardDescription>
                </CardHeader>
                <CardFooter>
                </CardFooter>
            </Card>
        </Layout>
    )
}

