import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import Link from "next/link";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { ChevronsLeft } from "lucide-react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { currentUser } from "@/src/auth/current-user";

export default async function RouteParams(props: PageParams<{ id: string }>) {
    const { id } = props.params;

    const user = await currentUser()

    const activities = await prisma.activity.findMany({
        where: {
            user: {
                id: id
            }
        },
        include: {
            user: true,
            candidacies: true
        }
    });

    return (
        <Layout>
            <Link href={`/users/${user?.username}`}>
                <ChevronsLeft size={32} className="" />
            </Link>
            <Card className="p-4 shadow-lg">
                <CardHeader>
                    <div className="flex justify-between">
                        <LayoutTitle>Check all Activities of {user?.username}</LayoutTitle>
                        {(user?.id === id) ? <Link href={"/activities/new"} className="shadow-lg flex items-center justify-center hover:bg-primary transition rounded-md border-2 border-dashed border-primary bg-accent p-2 w-1/5">
                            Create Activity
                        </Link> : null}
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[60vh] w-full rounded-md border">
                        <div className="p-4">
                            {activities.map(activity => (
                                <Link href={`/activities/${activity.slug}`} key={activity.id}>
                                    <Card className="relative mb-4 flex items-center shadow-lg">
                                        {(user?.id === id) &&
                                            (activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length > 0 ? (
                                                <div className=" -translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                                    {activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length}
                                                </div>
                                            ) : null)
                                        }
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
                    </ScrollArea>
                </CardContent>
            </Card>
        </Layout>
    );
}