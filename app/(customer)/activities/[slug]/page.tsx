import { currentUser } from "@/src/auth/current-user"
import { Layout, LayoutTitle } from "@/src/components/Layout"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/src/components/ui/card"
import { prisma } from "@/src/prisma"
import type { PageParams } from "@/src/types/next"
import { Check, HandCoins, Send, UsersRound } from "lucide-react"
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
            candidacies: {
                include: {
                    user: true,
                }
            }
        },
    })

    if (!activity) {
        notFound()
    }

    const user = await currentUser();

    const isCreate = user?.id === activity.userId;


    return (
        <Layout>
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
                            <PopoverContent className="w-50">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Are your sure to send your candidacy
                                        </p>
                                    </div>
                                    <div className="items-center">
                                        <CandidacyForm activityId={activity.id} userId={user?.id} status="PENDING" icon="Send" />
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
                            <span className="text-xl mr-2">places remaining</span>
                            <UsersRound />
                        </CardDescription>
                    </Card>
                    <Link className="m-2 w-1/3  justify-center flex " href={`/users/${activity.user.username}`}>
                        <Card className="w-full justify-center flex ">
                            <div className="flex items-center">
                                <span className="text-gray-500 mr-4">Organize by :</span>
                                <CardDescription className="flex justify-center items-center" >
                                    <span className="mr-4">{activity.user.username}</span>
                                    <Avatar className='size-6'>
                                        <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
                                        {activity.user.image ? (
                                            <AvatarImage src={activity.user.image} alt={`${activity.user.name}'s profile picture`} />
                                        ) : null}
                                    </Avatar>
                                </CardDescription>
                            </div>
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
                                <span className="mr-4"> Not Free : </span>
                                <HandCoins />
                            </CardDescription>}
                    </Card>
                    <Card className="p-2 m-2 w-1/3 justify-center flex ">
                        <span className="content-center text-gray-500 mr-4">Participants :</span>
                        <CardDescription className="flex justify-center items-center" >
                            {activity.candidacies.map((candidacy) => (
                                (candidacy.status === "APPROVED" &&
                                    <Link href={`/users/${candidacy.user.id}`} key={candidacy.id}>
                                        <Avatar className='size-8 mr-1' key={candidacy.id}>
                                            <AvatarFallback>{candidacy.user.name?.[0]}</AvatarFallback>
                                            {candidacy.user.image ? (
                                                <AvatarImage src={candidacy.user.image} alt={`${candidacy.user.name}'s profile picture`} />
                                            ) : null}
                                        </Avatar>
                                    </Link>)
                            ))}
                        </CardDescription>
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center"> 

                </CardFooter>
            </Card >
        </Layout >
    )
}