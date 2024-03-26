import { requiredCurrentUser } from "@/src/auth/current-user";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import RouteError from "./error";
import Link from "next/link";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { ChevronsLeft } from "lucide-react";

export default async function RouteParams(props: PageParams<{}>) {

    const activities = await prisma.activity.findMany({

    })


    return (
        <Layout>
            <Link href={"/"}>
                <ChevronsLeft size={32} className="" />
            </Link>
            <Card className="p-4 shadow-lg">
                <CardHeader>
                    <div className="flex justify-between">
                        <LayoutTitle>Check all Activities</LayoutTitle>
                        <Link href={"/activities/new"} className="shadow-lg flex items-center justify-center hover:bg-primary transition-color rounded-md border-2 border-dashed border-primary bg-accent p-2 w-1/5">
                            Create Activity
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {activities.length ? (
                        <div>
                            {activities.map(activity => (
                                <Link href={`/activities/${activity.slug}`}>
                                    <Card key={activity.id} className="mb-4 flex items-center shadow-lg">
                                        <CardHeader className="flex flex-row items-center w-full">
                                            <span className="font-mono mr-4">{activity.Title}</span>
                                        </CardHeader>
                                        <div className="flex w-full">
                                            <LucideIcons name={activity.Icon as IconName} size={24} />
                                            <CardDescription className="font-mono px-6">{activity.categorie}</CardDescription>
                                            <CardDescription className="font-mono px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                                            <CardDescription className="font-mono px-6">{activity.userWanted} places</CardDescription>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Link href={"/activities/new"} className="flex items-center justify-center hover:bg-accent transition-color rounded-md border-2 border-dashed border-primary py-8-lg p-12 w-full">
                            Create Activity
                        </Link>
                    )}
                </CardContent>
            </Card>
        </Layout>
    );

}
