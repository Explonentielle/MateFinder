import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import Link from "next/link";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { PageParams } from "@/src/types/next";

export default async function RouteParams(props: PageParams<{ page: string }>) {
    
    const ITEMS_PER_PAGE = 10;
    const offset = (Number(props.params.page) - 1) * ITEMS_PER_PAGE;
    const currentDate = new Date();


    const activities = await prisma.activity.findMany({
        select: {
            id: true,
            Title: true,
            slug: true,
            Icon: true,
            categorie: true,
            Date: true,
            Hour: true,
            Location: true,
            userWanted: true,
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        where: {
            Date: {
                gte: currentDate 
            }
        },
        skip: offset,
        take: ITEMS_PER_PAGE,
        orderBy: {
            Date: 'asc'
        }
    });

    return (
        <Layout>
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
                    <ScrollArea className="h-[65vh] w-full rounded-md border">
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
                    <div className="flex justify-center mt-4">
                        {Number(props.params.page) > 1 && (
                            <Link href={`/activities/page/${Number(props.params.page) - 1}`}>
                                Previous Page
                            </Link>
                        )}
                        {activities.length === ITEMS_PER_PAGE && (
                            <Link href={`/activities/page/${Number(props.params.page) + 1}`}>
                               Next Page
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );

}