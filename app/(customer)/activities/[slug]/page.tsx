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
import { UserAvatar } from "@/src/components/UserAvatar"




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
                <CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between">
                    <div className="flex mr-2 items-center">
                        <LayoutTitle className="mr2 md:mr-4 text-xl md:text-4xl"  >{activity.Title}</LayoutTitle>
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
                                <Button variant={"secondary"} className="mb-4 md:mb-0 mr-4">
                                    Gerez vos candidatures
                                </Button>
                            </Link>
                            <EditButton  slug={activity.slug} />
                        </div> :
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Participer<Send className="ml-4" size={24} /></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-50">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Etes vous sure d envoyer une candidature
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
                <CardContent className="p-4 md:p-6 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row justify-center">
                        <Card className="p-2 w-full md:w-1/2 ">
                            <CardDescription className="flex justify-center items-center">
                                <span className="py-2 px-6 font-bold">{activity.Information}</span>
                            </CardDescription>
                        </Card>
                        <Card className="p-2 my-2 mx-0 md:my-0 md:mx-2  w-full md:w-1/2 justify-center flex  ">
                            <CardDescription className="flex justify-center items-center">
                                <span className="py-2 font-extrabold text-2xl">{activity.Date ? activity.Date.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                                <span className="ml-8 font-extrabold text-xl">{(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                    `${parseInt(activity.Hour, 10)}h` :
                                    activity.Hour}
                                </span>
                            </CardDescription>
                        </Card>
                    </div>
                </CardContent>
                <CardContent className="flex justify-center">
                    <Card className="p-2 m-2 w-1/3 flex justify-center items-center ">
                        <CardDescription className="flex justify-center items-center" >
                            <span className="p-2 font-extrabold text-lg md:text-2xl">{activity.categorie}</span>
                        </CardDescription>
                    </Card>
                    <Card className="p-2 m-2 w-1/3  flex flex-col md:flex-row justify-center items-center  ">
                        <CardDescription className="justify-between items-center flex">
                            <span className="pr-2 font-extrabold text-md md:text-2xl"> {activity.candidacies.filter(candidacy => candidacy.status === "APPROVED").length} / {Number(activity.userWanted)}</span>
                            <UsersRound />
                        </CardDescription>
                        <CardDescription className="text-sm md:text-xl ml-0 md:ml-2">Places restantes</CardDescription>
                    </Card>
                    <Link className="m-2 w-1/3  justify-center flex " href={`/users/${activity.user.username}`}>
                        <Card className="w-full p-2 justify-center flex ">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <span className="text-sm md:text-xl text-gray-500 mr-0 md:mr-4">Organisateur:</span>
                                <CardDescription className="flex mx-6 md:mx-0 flex-col-reverse md:flex-row justify-center items-center" >
                                    <span className="mr-0 md:mr-4">{activity.user.username}</span>
                                   <UserAvatar email={activity.user.email || ""} image={activity.user.image || undefined}/>
                                </CardDescription>
                            </div>
                        </Card>
                    </Link>
                </CardContent>
                <CardContent className="flex justify-center">
                    <Card className="p-2 m-2 w-1/3 flex justify-center items-center">
                        <CardDescription className="flex justify-center items-center" >
                            <span className="p-2 font-extrabold text-lg md:text-2xl">{activity.Location}</span>
                        </CardDescription>
                    </Card>
                    <Card className="p-2 m-2 w-1/3 justify-center flex">
                        {activity.Free ? (
                            <CardDescription className="flex flex-col md:flex-row justify-center items-center" >
                                <span className="mr-0 md:mr-4"> Gratuit :</span>
                                <Check className="mx-6" />
                            </CardDescription>
                        ) :
                            <CardDescription className="flex flex-col md:flex-row justify-center items-center" >
                                <span className="mr-0 md:mr-4"> Payant : </span>
                                <HandCoins />
                            </CardDescription>}
                    </Card>
                    <Card className="p-2 m-2 w-1/3 justify-center flex flex-col md:flex-row ">
                        <span className="text-sm md:text-xl content-center text-gray-500 mr-0 md:mr-4">Participants:</span>
                        <CardDescription className="flex justify-center items-center" >
                            {activity.candidacies.map((candidacy) => (
                                (candidacy.status === "APPROVED" &&
                                    <Link href={`/users/${candidacy.user.username}`} key={candidacy.id}>
                                        <UserAvatar email={candidacy.user.email || ""} image={candidacy.user.image || undefined}/>
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