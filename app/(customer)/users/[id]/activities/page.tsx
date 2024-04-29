import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import Link from "next/link";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { currentUser } from "@/src/auth/current-user";
import { UserAvatar } from "@/src/components/UserAvatar";

export default async function RouteParams(props: PageParams<{ id: string }>) {
    const { id } = props.params;

    const user = await currentUser()

    const activities = await prisma.activity.findMany({
        where: {
            user: {
                username: id
            }
        },
        include: {
            user: true,
            candidacies: true
        }
    });

    return (
        <Layout>
            <Card className="p-4 shadow-lg">
                <CardHeader className="p-2 md:p-6">
                    <div className="flex justify-between">
                        <LayoutTitle className="text-lg md:text-4xl">Voir toutes les activités de {id}</LayoutTitle>
                        {(user?.username === id) ? <Link href={"/activities/new"} className="shadow-lg flex items-center justify-center text-center hover:bg-primary transition rounded-md border-2 border-dashed border-primary bg-accent p-2 w-1/3 md:w-1/5">
                            Crer une activité
                        </Link> : null}
                    </div>
                </CardHeader>
                <CardContent className="p-2 py-6 md:p-6">
                    <ScrollArea className="h-[62vh] w-full rounded-md border">
                        <div className="p-2 md:p-4">
                            {activities.map(activity => (
                                <Link href={`/activities/${activity.slug}`} key={activity.id}>
                                    <Card className="relative mb-4 flex flex-col md:flex-row items-center shadow-lg">
                                        {(user?.username === id) &&
                                            (activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length > 0 ? (
                                                <div className=" -translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                                    {activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length}
                                                </div>
                                            ) : null)
                                        }
                                        <CardHeader className="p-2 md:p-4 flex flex-row justify-between items-center w-full md:w-1/3">
                                            <span className="font-mono mr-4">{activity.Title}</span>
                                            {activity.user.name ? (
                                                <CardDescription className="flex justify-center items-center" >
                                                    <UserAvatar email={activity.user.email || ""} image={activity.user.image || undefined} />
                                                </CardDescription>
                                            ) : null}
                                        </CardHeader>
                                        <div className="w-full flex items-center justify-between">
                                            <LucideIcons name={activity.Icon as IconName} size={24} />
                                            <CardDescription className="font-mono px-2 md:px-6">{activity.categorie}</CardDescription>
                                            <CardDescription className="font-mono px-2 md:px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                                        </div>
                                        <div className="w-full flex items-center justify-between">
                                            <CardDescription className="font-mono px-2 md:px-6"> {(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                                `${parseInt(activity.Hour, 10)}h` :
                                                activity.Hour}
                                            </CardDescription>
                                            <CardDescription className="font-mono px-2 md:px-6">{activity.Location}</CardDescription>
                                            <CardDescription className="font-mono px-2 md:px-6">{activity.candidacies.filter(candidacy => candidacy.status === "APPROVED").length} / {Number(activity.userWanted)} places</CardDescription>
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