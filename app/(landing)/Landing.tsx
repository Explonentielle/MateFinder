import { Layout, LayoutTitle } from "@/src/components/Layout";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import Link from "next/link";
import ProfileUpdateForm from "./ProfilUpdateForm";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { currentUser } from "@/src/auth/current-user";
import { LocationForm } from "./LocationForm";
import { UserAvatar } from "@/src/components/UserAvatar";



export const Landing = async () => {

    const user = await currentUser();

    if (!user) {
        return <LocationForm />
    }
    else if (user && (!user?.username || !user.age || !user.name)) {
        return <ProfileUpdateForm userId={user?.id} />

    } else {

        if (!user?.location) {
            throw Error
        }

        const currentDate = new Date();
        const activities = await prisma.activity.findMany({
            where: {
                Date: {
                    gte: currentDate
                },
                Departement: user.location
            },
            take: 6,
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
            <div className="size-full">
                <Layout>
                    <LayoutTitle className="flex items-center">
                        <p className="mr-2 md:mr-4 text-lg md:text-4xl">Welcome to</p><p className="titleBorder font-extrabold text-2xl md:text-5xl">Mate Finder</p>
                    </LayoutTitle>
                    <h1 className="text-xl md:text-2xl  pl-6">Discover your perfect mate with Mate Finder</h1>
                    <Link href={`/activities/page/1${user.location}`}>
                        <Button variant="ghost" className="shadow-lg w-full py-6 border-primary border-dashed border-2">
                            Check All Activities Next to you
                        </Button>
                    </Link>
                    <Card className="shadow-lg">
                        <ScrollArea className="h-[55vh] w-full">
                            <CardHeader className="py-2 font-bold text-lg md:text-2xl">
                                Upcoming Activities Recently next to you
                            </CardHeader>
                            <CardContent className="p-2 md:p-6 flex flex-col md:flex-row md:flex-wrap">
                                {activities.map(activity => (
                                    <Link key={activity.id} className="w-full md:w-1/2 p-2 md:p-4" href={`/activities/${activity.slug}`}>
                                        <Card className="shadow-lg h-full" key={activity.id}>
                                            <CardHeader className="p-2 md:p-6 font-bold text-md md:text-2xl flex flex-row justify-between items-center">
                                                {`${activity.Title.slice(0, 18)}...`}
                                                <div className="flex">
                                                    <UserAvatar email={activity.user.email || ""} image={activity.user.image || undefined} />
                                                    <LucideIcons name={activity.Icon as IconName} size={24} />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-2 md:p-6 w-full flex flex-col items-center">
                                                <div className="flex w-full items-center justify-center">
                                                    <CardDescription className="w-1/2 font-mono px-3">{activity.Free ? "Free" : "Not Free"}</CardDescription>
                                                    <CardDescription className="w-full font-mono px-3">{activity.Location}</CardDescription>
                                                </div>
                                                <div className="flex w-full items-center justify-center">
                                                    <CardDescription className="w-full font-mono px-3">{activity.categorie}</CardDescription>
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
                </Layout>
            </div >
        )
    }

}
