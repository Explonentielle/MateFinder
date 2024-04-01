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
import { useRouter } from "next/navigation"
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area"
import { Description } from "@radix-ui/react-dialog"

export default async function RouteParams(props: PageParams<{ slug: string }>) {


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
                        <LayoutTitle>{activity.Title}</LayoutTitle>
                        <div className="flex items-center">
                            <CardDescription className="font-mono px-6">{activity.Location}</CardDescription>
                            <CardDescription className="font-mono px-6">{(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                `${parseInt(activity.Hour, 10)}h` :
                                activity.Hour}
                            </CardDescription>
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
                    <ScrollArea className="w-full">
                        <CardContent className="flex justify-center">
                            <CardDescription></CardDescription>
                            {activity.reviews.map(async (review) => {
                                const reviewUser = await prisma.user.findUnique({
                                    where: {
                                        id: review.userId
                                    }
                                });

                                return (
                                    <Card key={review.id} className="w-[20vw] m-4 mx-8 py-4 flex flex-col items-center">

                                        <CardHeader className="py-4 font-bold flex w-full flex-col items-center justify-between">
                                            {reviewUser && (
                                                <div className="flex items-center justify-center">
                                                    <CardTitle>{review.Title}</CardTitle>
                                                    <Link className="m-2 w-1/3  justify-center flex " href={`/users/${reviewUser.username}`}>
                                                        <Avatar className='size-6 ml-4'>
                                                            <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                                            <AvatarImage src={reviewUser.image ?? ""} alt={`${activity.user.name}'s profile picture`} />
                                                        </Avatar>
                                                    </Link>
                                                </div>
                                            )}

                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-center items-center">
                                                <CardDescription className="flex flex-row px-4 justify-center">
                                                    {Array.from({ length: Math.floor(Number(review.rating)) }).map((_, index) => (
                                                        <Star color="gold" key={index} size={24} />
                                                    ))}
                                                </CardDescription>
                                                <CardDescription className="mr-4">{review.createdAt.toLocaleDateString()}</CardDescription>
                                            </div>
                                            <CardDescription className="px-4">{review.content}</CardDescription>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                            <Card className="w-[20vw] m-4 mx-8 py-4 flex flex-col items-center">
                                <CardHeader className="py-4 font-bold flex w-full flex-col items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <CardTitle>Placeholder</CardTitle>
                                        <Link className="m-2 w-1/3  justify-center flex " href={`/users/${activity.user.username}`}>
                                            <Avatar className='size-6 ml-4'>
                                                <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                                <AvatarImage src={""} alt={`${activity.user.name}'s profile picture`} />
                                            </Avatar>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center items-center">
                                        <CardDescription className="flex flex-row px-4 justify-center">
                                            {Array.from({ length: Math.floor(4) }).map((_, index) => (
                                                <Star color="gold" key={index} size={24} />
                                            ))}
                                        </CardDescription>
                                        <CardDescription className="mr-4">01/01/2024</CardDescription>
                                    </div>
                                    <CardDescription className="px-4">Description</CardDescription>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </Card>


                <Link href={`/activities/${props.params.slug}/reviews/new`}>
                    <Button className="w-full">
                        {`Create a Review for ${props.params.slug}`}
                    </Button>
                </Link>
            </Layout>
        )

}
