import { requiredCurrentUser } from "@/src/auth/current-user";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import RouteError from "./error";
import Link from "next/link";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { ChevronsLeft } from "lucide-react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

export default async function RouteParams(props: PageParams<{}>) {

    const activities = await prisma.activity.findMany({
        include: {
            user: true
        }

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
                        <Link href={"/activities/new"} className="shadow-lg flex items-center justify-center hover:bg-primary transition rounded-md border-2 border-dashed border-primary bg-accent p-2 w-1/5">
                            Create Activity
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[60vh] w-full rounded-md border">
                        <div className="p-4">
                            {activities.length ? (
                                <div>
                                    {activities.map(activity => (
                                        <Link key={activity.id} href={`/activities/${activity.slug}`}>
                                            <Card key={activity.id} className="mb-4 flex items-center shadow-lg">
                                                <CardHeader className="flex flex-row items-center w-1/3">
                                                    <span className="font-mono mr-4">{activity.Title}</span>
                                                    {activity.user.name ? (
                                                        <CardDescription className="flex justify-center items-center" >
                                                            <Avatar className='size-6'>
                                                                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                                                                {activity.user.image ? (
                                                                    <AvatarImage src={activity.user.image} alt={`${activity}'s profile picture`} />
                                                                ) : null}
                                                            </Avatar>
                                                        </CardDescription>
                                                    ) : null}
                                                </CardHeader>
                                                <div className="flex w-2/3 items-center justify-end">
                                                    <LucideIcons name={activity.Icon as IconName} size={24} />
                                                    <CardDescription className="font-mono px-6">{activity.categorie}</CardDescription>
                                                    <CardDescription className="font-mono px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                                                    <CardDescription className="font-mono px-6"> {(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                                        `${parseInt(activity.Hour, 10)}h` :
                                                        activity.Hour}
                                                    </CardDescription>
                                                    <CardDescription className="font-mono px-6">{activity.Location}</CardDescription>
                                                    <CardDescription className="font-mono px-6">{activity.userWanted} places</CardDescription>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link href={"/activities/new"} className="flex items-center justify-center hover:bg-accent transition rounded-md border-2 border-dashed border-primary py-8 p-12 w-full">
                                    Create Activity
                                </Link>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </Layout>
    );

}
