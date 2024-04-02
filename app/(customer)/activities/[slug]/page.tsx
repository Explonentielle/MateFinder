import { currentUser, requiredCurrentUser } from "@/src/auth/current-user"
import { Layout, LayoutTitle } from "@/src/components/Layout"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/src/components/ui/card"
import { prisma } from "@/src/prisma"
import type { PageParams } from "@/src/types/next"
import { Check, ChevronsLeft, HandCoins, MousePointerClick, Send, Star, ThumbsDown, ThumbsUp, UsersRound } from "lucide-react"
import { notFound } from "next/navigation"
import { EditButton } from "./EditButton"
import LucideIcons, { IconName } from "@/src/components/LucideIcons"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import Link from "next/link"
import CandidacyForm from "../../candidacies/new/CandidacyForm"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"



export default async function RouteParams(props: PageParams<{ slug: string }>) {

    const activity = await prisma.activity.findUnique({
        where: {
            slug: props.params.slug,
        },
        include: {
            user: true,
            reviews: true,
            candidacies: true,
        },
    })

    if (!activity) {
        notFound()
    }

    const user = await currentUser();

    const isCreate = user?.id === activity.userId;

    let totalRating = 0;
    if (activity.reviews && activity.reviews.length > 0) {
        activity.reviews.forEach((review) => {
            totalRating += Number(review.rating);
        });
    }
    const averageRating = activity.reviews.length > 0 ? totalRating / activity.reviews.length : 0;


    return (
        <Layout>
            <Link href={"/activities"}>
                <ChevronsLeft size={32} className="" />
            </Link>
            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex items-center">
                        <LayoutTitle className="mr-4"  >{activity.Title}</LayoutTitle>
                        <LucideIcons name={activity.Icon as IconName} size={36} />
                    </div>
                    {isCreate! ?
                        <div>
                            <Link className="relative" href={`/candidacies/${activity.slug}`}>
                                {(activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length > 0 ? (
                                        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                            {activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length}
                                        </div>
                                    ) 
                                : null)}
                                <Button variant={"secondary"} className="mr-4">
                                    Manage candidacies
                                </Button>
                            </Link>
                            <EditButton slug={activity.slug} />
                        </div> :
                         <Popover>
                         <PopoverTrigger asChild>
                             <Button variant="outline">Participate <Send className="ml-4" size={24} /></Button>
                         </PopoverTrigger>
                         <PopoverContent className="w-1/2">
                             <div className="grid gap-4">
                                 <div className="space-y-2">
                                     <p className="text-sm text-muted-foreground">
                                         Are your sure to send your candidacy
                                     </p>
                                 </div>
                                 <div className="items-center">
                                 <CandidacyForm activityId={activity.id} userId={user?.id} status="PENDING" icon="Send" candidacyId="" />
                                 </div>
                             </div>
                         </PopoverContent>
                     </Popover>
                    }
                </CardHeader>
                <CardContent className="flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Card className="p-2 m-2 w-1/2  ">
                            <CardDescription className="flex justify-center items-center">
                                <span className="py-2 px-6 font-bold">{activity.Information}</span>
                            </CardDescription>
                        </Card>
                        <Card className="p-2 m-2 w-1/2 justify-center flex  ">
                            <CardDescription className="flex justify-center items-center">
                                <span className="py-2 font-extrabold text-2xl">{activity.Date ? new Date(activity.Date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                                <span className="ml-8 font-extrabold text-xl">{(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                    `${parseInt(activity.Hour, 10)}h` :
                                    activity.Hour}
                                </span>
                            </CardDescription>
                        </Card>
                    </div>
                </CardContent>
                <CardContent className="flex justify-center">
                    <Card className="p-2 m-2 w-1/3 ">
                        <CardDescription className="flex justify-center items-center" >
                            <span className="p-2 font-extrabold text-2xl">{activity.categorie}</span>
                        </CardDescription>
                    </Card>
                    <Card className="p-2 m-2 w-1/3  justify-center flex  ">
                        <CardDescription className="flex justify-center items-center" >
                            <span className="p-2 font-extrabold text-2xl"> {activity.userWanted}</span>
                            <UsersRound />
                        </CardDescription>
                    </Card>
                    <Link className="m-2 w-1/3  justify-center flex " href={`/users/${activity.user.id}`}>
                        <Card className="w-full justify-center flex ">
                            <CardDescription className="flex justify-center items-center" >
                                <span className="mr-4">{activity.user.username}</span>
                                <Avatar className='size-6'>
                                    <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                    {activity.user.image ? (
                                        <AvatarImage src={activity.user.image} alt={`${activity.user.name}'s profile picture`} />
                                    ) : null}
                                </Avatar>
                            </CardDescription>
                        </Card>
                    </Link>
                </CardContent>
                <CardContent className="flex justify-center">
                    <Card className="p-2 m-2 w-1/3 ">
                        <CardDescription className="flex justify-center items-center" >
                            <span className="p-2 font-extrabold text-2xl">{activity.Location}</span>
                        </CardDescription>
                    </Card>
                    <Card className="p-2 m-2 w-1/3  justify-center flex  ">
                        {activity.Free ? (
                            <CardDescription className="flex justify-center items-center" >
                                <span className="mr-4"> Free : </span>
                                <Check />
                            </CardDescription>
                        ) :
                            <CardDescription className="flex justify-center items-center" >
                                <span className="mr-4"> Free : </span>
                                <HandCoins />
                            </CardDescription>}
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button className=" py-2 m-2 w-1/3 h-full" variant={"default"}>
                        <Link className="w-full flex items-center justify-center" href={`/activities/${props.params.slug}/reviews`}>
                            <span className="p-2 font-extrabold text-2xl">Reviews </span>
                            <MousePointerClick size={16} />
                        </Link>
                    </Button>
                    <Card className="p-5 m-2 w-1/3 h-full">
                        <div className="flex justify-center items-center h-full">
                            {Array.from({ length: Math.floor(averageRating) }).map((_, index) => (
                                <Star color="gold" key={index} size={16} />
                            ))}
                            <span>/ 5</span>
                        </div>
                    </Card>
                </CardFooter>
            </Card >
        </Layout >
    )
}