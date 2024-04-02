import { currentUser } from "@/src/auth/current-user";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { prisma } from "@/src/prisma";
import { Review } from "@prisma/client";
import Link from "next/link";
import ProfileUpdateForm from "./ProfilUpdateForm";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Star } from "lucide-react";


export const Landing = async () => {

    const user = await currentUser()

    function calculateAverageRating(reviews: Review[]) {
        const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
        return totalRating / reviews.length;
    }

    if (!user || (user.username && user.age && user.name)) {

        const activities = await prisma.activity.findMany({
            take: 6,
            orderBy: {
                Date: "desc",
            },
            include: {
                user: true,
            },
        })
        const popularActivities = await prisma.activity.findMany({
            include: {
                user: true,
                reviews: true,
            }
        });

        const popularActivitiesWithReviews = popularActivities.filter(activity => activity.reviews && activity.reviews.length > 0);

        const sortedActivities = popularActivitiesWithReviews.sort((a, b) => {
            const avgRatingA = calculateAverageRating(a.reviews);
            const avgRatingB = calculateAverageRating(b.reviews);
            return avgRatingB - avgRatingA;
        });

        const top10Activities = sortedActivities.slice(0, 10);



        return (
            <div className="size-full">
                <Layout>
                    <LayoutTitle className="flex items-center">
                        <p className="mr-4 text-4xl">Welcome to</p><p className="titleBorder font-extrabold text-5xl">Mate Finder</p>
                    </LayoutTitle>
                    <h1 className="text-2xl  pl-6">Discover your perfect mate with Mate Finder</h1>
                    <Link href={"/activities"}>
                        <Button variant="ghost" className="shadow-lg w-full py-6 border-primary border-dashed border-2">
                            Check All Activities
                        </Button>
                    </Link>
                    <Card className="shadow-lg">
                        <ScrollArea className="h-[50vh] w-full">
                            <CardHeader className="py-2 font-bold text-2xl">
                                Upcoming Activities Recently
                            </CardHeader>
                            <CardContent className="flex flex-wrap">
                                {activities.map(activity => (
                                    <Link key={activity.id} className="w-1/2 p-4" href={`/activities/${activity.slug}`}>
                                        <Card className="shadow-lg h-full" key={activity.id}>
                                            <CardHeader className="font-bold text-2xl flex flex-row justify-between">
                                                {`${activity.Title.slice(0, 18)}...`}
                                                <div className="flex">
                                                    <Avatar className='size-6 mr-4'>
                                                        <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                                        {activity.user.image ? (
                                                            <AvatarImage src={activity.user.image} alt={`${activity.user.name}'s profile picture`} />
                                                        ) : null}
                                                    </Avatar>
                                                    <LucideIcons name={activity.Icon as IconName} size={24} />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="py-4 w-full flex flex-col items-center">
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
                                                    <CardDescription className="w-full font-mono px-3">{activity.userWanted} places</CardDescription>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </CardContent>
                        </ScrollArea>
                    </Card>
                    <Card className="mt-12 shadow-lg ">
                        <ScrollArea className="h-[50vh] w-full">
                            <CardHeader className=" py-2 font-bold text-2xl">
                                Most Appreciated Activities
                            </CardHeader>
                            <CardContent className="flex flex-wrap">
                                {top10Activities.map(activity => {
                                    const totalRating = activity.reviews.reduce((sum, review) => sum + Number(review.rating), 0)
                                    const averageRating = totalRating / activity.reviews.length
                                    return (
                                        < Link key={activity.id} className="w-1/2 p-4" href={`/activities/${activity.slug}`}>
                                            <Card className="shadow-lg h-full" key={activity.id}>
                                                <CardHeader className="font-bold text-2xl flex flex-row justify-between">
                                                    {`${activity.Title.slice(0, 18)}...`}
                                                    <div className="flex">
                                                        <Avatar className='size-6 mr-4'>
                                                            <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                                            {activity.user.image ? (
                                                                <AvatarImage src={activity.user.image} alt={`${activity.user.name}'s profile picture`} />
                                                            ) : null}
                                                        </Avatar>
                                                        <LucideIcons name={activity.Icon as IconName} size={24} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="py-4 w-full flex flex-col items-center">
                                                    <div className="my-4 flex items-center w-full">
                                                        {Array.from({ length: Math.floor(averageRating) }).map((_, index) => (
                                                            <Star color="gold" key={index} size={16} />
                                                        ))}
                                                        <span>/ 5</span>
                                                    </div>
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
                                                        <CardDescription className="w-full font-mono px-3">{activity.userWanted} places</CardDescription>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>)
                                })}
                            </CardContent>
                        </ScrollArea>
                    </Card>
                </Layout>
            </div >
        )
    } else {

        return (
            <div>
                <ProfileUpdateForm userId={user?.id} />
            </div>
        )
    }

}
