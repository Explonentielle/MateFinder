import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import Link from "next/link";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { UserAvatar } from "@/src/components/UserAvatar";
import { PropsWithChildren } from "react";
import { Button } from "@/src/components/ui/button";


export type LandingProps = PropsWithChildren<{
    location: string;
}>;

export const LandiongActivities = async (props: LandingProps) => {

    const currentDate = new Date();

    const activities = await prisma.activity.findMany({
        where: {
            Date: {
                gte: currentDate
            },
            Departement: props.location
        },
        take: 10,
        orderBy: {
            Date: "asc",
        },
        include: {
            user: {
                select: {
                    image: true,
                    name: true,
                    email: true,
                },
            },
            candidacies: true

        },
    });
    return (
        <>
            <Link className="pb-4" href={`/activities/page/1${props.location}`}>
                <Button variant="ghost" className="shadow-lg w-full py-6 border-primary border-dashed border-2">
                    Voir toutes les activités proche de vous
                </Button>
            </Link>
            <Card className="shadow-lg">
                <ScrollArea className="h-[70vh] w-full">
                    <CardHeader className="py-4 font-bold text-lg md:text-2xl">
                        Activités à venir récemment près de chez vous.
                    </CardHeader>
                    <CardContent className="p-2 md:p-6 flex flex-col md:flex-row md:flex-wrap">
                        {activities.map(activity => (
                            <Link key={activity.id} className="w-full md:w-1/2 p-2 md:p-4" href={`/activities/${activity.slug}`}>
                                <Card className="shadow-lg h-full" key={activity.id}>
                                    <CardHeader className="p-2 font-bold text-md md:text-2xl flex flex-row justify-between items-center">
                                        {`${activity.Title.slice(0, 20)}...`}
                                        <div className="flex items-center">
                                            <UserAvatar className={`mr-2`} size="size-8" email={activity.user.email || ""} image={activity.user.image || undefined} />
                                            <LucideIcons name={activity.Icon as IconName} size={24} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-2 w-full flex flex-col items-center">
                                        <div className="flex w-full items-center justify-center">
                                            <CardDescription className="w-full font-mono px-3">{activity.Location}</CardDescription>
                                            <CardDescription className="w-1/2 font-mono px-3">{activity.Date?.toLocaleDateString()}</CardDescription>
                                            <CardDescription className="w-1/2 font-mono px-3"> {(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                                `${parseInt(activity.Hour, 10)}h` :
                                                activity.Hour}
                                            </CardDescription>
                                            <CardDescription className="w-full font-mono px-3">{activity.candidacies.filter(candidacy => candidacy.status === "APPROVED").length} / {Number(activity.userWanted)} places</CardDescription>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </CardContent>
                </ScrollArea>
            </Card>
        </>
    );
};