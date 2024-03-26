import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout, LayoutTitle } from "@/src/components/Layout"
import { Button } from "@/src/components/ui/button"
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/src/components/ui/card"
import { prisma } from "@/src/prisma"
import type { PageParams } from "@/src/types/next"
import Link from "next/link"
import RouteError from "./error"
import { ChevronsLeft, Star } from "lucide-react"
import LucideIcons, { IconName } from "@/src/components/LucideIcons"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { notFound } from "next/navigation"

export default async function RouteParams(props: PageParams<{ slug: string }>) {

    try {

        const activity = await prisma.activity.findUnique({
            where: {
                slug: props.params.slug
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    }
                },
                user: true
            }
        })

        if (!activity) {
            return notFound()
        }

        return (
            <Layout>
                <Link href={`/activities/${props.params.slug}`}>
                    <ChevronsLeft size={32} className="" />
                </Link>
                <Card key={activity.id} className="my-4">
                    <CardHeader className="flex justify-between flex-row">
                        <CardTitle>{activity.Title}</CardTitle>
                        <div className="flex items-center">
                            <CardDescription className="font-mono px-6">{activity.Date?.toLocaleDateString()}</CardDescription>
                            <span className="mr-4">{activity.user.name?.split(' ')[0]}</span>
                            <Avatar className='size-6 mr-4'>
                                <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                {activity.user.image ? (
                                    <AvatarImage src={activity.user.image} alt={`${activity.user.name}'s profile picture`} />
                                ) : null}
                            </Avatar>
                            <LucideIcons name={activity.Icon as IconName} size={24} />
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-wrap">
                        <CardDescription></CardDescription>
                        {activity.reviews.map(async (review) => {
                            const reviewUser = await prisma.user.findUnique({
                                where: {
                                    id: review.userId
                                }
                            });

                            return (
                                <Card key={review.id} className="w-1/3 m-2 py-4 flex flex-col items-center">
                                    <CardHeader className="py-4 font-bold flex w-full flex-row items-center justify-between">
                                        <CardTitle>{review.Title}</CardTitle>
                                        {reviewUser && (
                                            <div className="flex">
                                                <CardDescription className="mr-4">{review.createdAt.toLocaleDateString()}</CardDescription>
                                                <Avatar className='size-6 mr-4'>
                                                    <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                                    <AvatarImage src={reviewUser.image ?? ""} alt={`${activity.user.name}'s profile picture`} />
                                                </Avatar>
                                            </div>


                                        )}

                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="flex flex-row px-4 justify-center">
                                            {Array.from({ length: Math.floor(Number(review.rating)) }).map((_, index) => (
                                                <Star color="gold" key={index} size={24} />
                                            ))}
                                        </CardDescription>
                                        <CardDescription className="px-4">{review.content}</CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </CardContent>
                </Card>


                <Link href={`/activities/${props.params.slug}/reviews/new`}>
                    <Button className="w-full">
                        {`Create a Review for ${props.params.slug}`}
                    </Button>
                </Link>
            </Layout>
        )
    } catch (error) {
        return <RouteError />;
    }
}
