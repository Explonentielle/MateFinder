import { Layout, LayoutTitle } from "@/src/components/Layout";
import LucideIcons, { IconName } from "@/src/components/LucideIcons";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import { Review } from "@prisma/client";
import Link from "next/link";


export const Landing = async () => {

    const activities = await prisma.activity.findMany({
        take: 4,
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

    const top5Activities = sortedActivities.slice(0, 5);

    function calculateAverageRating(reviews: Review[]) {
        const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
        return totalRating / reviews.length;
    }

    return (
        <div className="h-full w-full">
            <Layout>
                <LayoutTitle className="flex items-center">
                    <p className="font-ligth mr-4 text-4xl">Welcome to</p><p className="titleBorder font-extrabold text-5xl">Mate Finder</p>
                </LayoutTitle>
                <h1 className="text-2xl font-ligth pl-6">Discover your perfect mate with Mate Finder</h1>
                <Link href={"/activities"}>
                    <Button variant="ghost" className="shadow-lg w-full py-6 border-primary border-dashed border-2">
                        Check All Activities
                    </Button>
                </Link>
                <Card className="shadow-lg">
                    <CardHeader className="font-bold text-2xl">
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
                                    <CardContent className="p-4 flex wrap items-center">
                                        <CardDescription className="w-1/2 font-mono px-6">{activity.categorie}</CardDescription>
                                        <CardDescription className="w-1/2 font-mono px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                                        <CardDescription className="w-1/2 font-mono px-6">{activity.userWanted} places</CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                <Card className="mt-12 shadow-lg ">
                    <CardHeader className="font-bold text-2xl">
                        Most Appreciated Activities
                    </CardHeader>
                    <CardContent className="flex flex-wrap">
                        {top5Activities.map(activity => (
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
                                    <CardContent className="p-4 flex wrap items-center">
                                        <CardDescription className="w-1/2 font-mono px-6">{activity.categorie}</CardDescription>
                                        <CardDescription className="w-1/2 font-mono px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                                        <CardDescription className="w-1/2 font-mono px-6">{activity.userWanted} places</CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </Layout>
        </div>
    )
}
