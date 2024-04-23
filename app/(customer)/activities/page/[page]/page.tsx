import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import Link from "next/link";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { PageParams } from "@/src/types/next";
import { UserAvatar } from "@/src/components/UserAvatar";

export default async function RouteParams(props: PageParams<{ page: string }>) {


    function splitString(str: string) {
        let page = '';
        let location = '';
        for (let i = 0; i < str.length; i++) {
            if (i === 0) {
                page = str[i];
            }
            else {
                location += str[i]
            }
        }
        return { page, location };
    }

    const { page, location } = splitString(props.params.page)
    const ITEMS_PER_PAGE = 8;
    const offset = (Number(page) - 1) * ITEMS_PER_PAGE;
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
                    image: true,
                    email: true,
                }
            },
            candidacies: true,
        },
        where: {
            Date: {
                gte: currentDate
            },
            Departement: location
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
                <CardHeader className="p-2 md:p-6">
                    <div className="flex justify-between items-center">
                        <LayoutTitle className="text-xl md:text-4xl">Check all Activities</LayoutTitle>
                        <Link href={"/activities/new"} className="shadow-lg flex items-center justify-center text-center hover:bg-primary transition rounded-md border-2 border-dashed border-primary bg-accent p-2 w-1/3 md:w-1/5">
                            Create Activity
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="p-2 pt-6 md:p-6">
                    <ScrollArea className="h-[62vh] w-full rounded-md border">
                        <div className="p-2 md:p-4">
                            {activities.length ? (
                                <div>
                                    {activities.map(activity => (
                                        <Link key={activity.id} href={`/activities/${activity.slug}`}>
                                            <Card key={activity.id} className="mb-4 flex flex-col md:flex-row items-center shadow-lg">
                                                <CardHeader className="p-2 md:p-4 flex flex-row justify-between items-center w-full md:w-1/3">
                                                    <span className="font-mono mr-4">{`${activity.Title.slice(0, 18)}...`}</span>
                                                    {activity.user.name ? (
                                                        <CardDescription className="flex justify-center items-center" >
                                                            <UserAvatar email={activity.user.email || ""} image={activity.user.image || undefined}/>                                                   
                                                        </CardDescription>
                                                    ) : null}
                                                </CardHeader>
                                                <div className="p-2 flex flex-col md:flex-row w-full md:w-2/3 items-center justify-end">
                                                    <div className="w-full flex items-center justify-between">
                                                        <LucideIcons name={activity.Icon as IconName} size={24} />
                                                        <CardDescription className="font-mono px-2 md:px-6">{activity.categorie}</CardDescription>
                                                        <CardDescription className="font-mono px-2 md:px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                                                    </div>
                                                    <div  className="w-full flex items-center justify-between">
                                                        <CardDescription className="font-mono px-2 md:px-6"> {(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                                            `${parseInt(activity.Hour, 10)}h` :
                                                            activity.Hour}
                                                        </CardDescription>
                                                        <CardDescription className="font-mono px-2 md:px-6">{activity.Location}</CardDescription>
                                                        <CardDescription className="font-mono px-2 md:px-6">{activity.candidacies.filter(candidacy => candidacy.status === "APPROVED").length} / {Number(activity.userWanted)} places</CardDescription>
                                                    </div>
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
                        {Number(page) > 1 && (
                            <Link href={`/activities/page/${Number(page) - 1}${location}`}>
                                Previous Page
                            </Link>
                        )}
                        {activities.length === ITEMS_PER_PAGE && (
                            <Link className="ml-4" href={`/activities/page/${Number(page) + 1}${location}`}>
                                Next Page
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );

}