import type { Activity, PageParams } from "@/src/types/next"
import { currentUser, requiredCurrentUser } from "@/src/auth/current-user"
import { Layout, LayoutTitle } from "@/src/components/Layout"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { prisma } from "@/src/prisma"
import LucideIcons, { IconName } from "@/src/components/LucideIcons"
import { MousePointerClick, Star } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import RouteError from "../../notFound"
import { notFound } from "next/navigation"
import { Progress } from "@/src/components/ui/progress"
import ChatButton from "../chat/ChatButton"




export default async function RouteParams(props: PageParams<{ id: string }>) {

    try {

        const userId = props.params.id
        const current = await requiredCurrentUser()

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                reviews: true,
                activities: {
                    include: {
                        candidacies: {
                            select: {
                                status: true,
                            }
                        }
                    },
                },
                candidacies: true
            }
        })

        if (!user) {
            notFound()
        }

        const calculateAge = (date: Date) => {
            const birthDate = new Date(date)
            const today = new Date();

            const diff = today.getTime() - birthDate.getTime();
            const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            return age;
        };


        return (
            <Layout>
                <div className="flex justify-between items-center">
                    <LayoutTitle>{user.username}</LayoutTitle>
                    {(current?.id === user?.id) ?
                        <Button className="p-0">
                            <Link className="p-2" href={`/users/${user?.username}/edit`}>Update my profile</Link>
                        </Button>
                        :
                        <Button className="p-0">
                            <Link className="p-2" href={``}>Send a message</Link>
                        </Button>}
                </div>

                <Card className="shadow-lg flex flex-row justify-center">
                    <div className="flex flex-col m-4  w-2/4">
                        <Card className="shadow-lg ">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle> {(current.id === user.id) ? "My Informations" : `Informations of ${user?.username}`}</CardTitle>
                                <div className="flex items-center">
                                    <Avatar className="size-10 mr-4">
                                        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                                        {user?.image && <AvatarImage src={user?.image} alt={`${user?.name}'s profile picture`} />}
                                    </Avatar>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-between px-8 ">
                                <div className="mr-2 flex flex-col items-start">
                                    <CardDescription className="my-2">Email :</CardDescription>

                                    <CardDescription className="my-2">Age : </CardDescription>

                                    <CardDescription className="my-2">Membre since : </CardDescription>

                                    <CardDescription className="my-2">Username : </CardDescription>

                                    <CardDescription className="my-2">Location : </CardDescription>

                                    <CardDescription className="my-2">Participations : </CardDescription>
                                </div>
                                <div className="flex flex-col items-end">
                                    {current.id === user.id ? (
                                        <CardDescription className="my-2">{user.email}</CardDescription>
                                    ) : (
                                        <ChatButton
                                            current={{
                                                id: current.id ,
                                                name: current.name,
                                                email: current.email,
                                                photoUrl: current.image,
                                            }}
                                            otherUser={{
                                                id: user.id,
                                                name: user.name,
                                                email: user.email,
                                                photoUrl: user?.image,
                                            }}
                                        />
                                    )}

                                    <CardDescription className="my-2"> {user?.age ? calculateAge(user?.age) : "Unknown"} year s old</CardDescription>

                                    <CardDescription className="my-2"> {user?.createdAt.toLocaleDateString()}</CardDescription>

                                    <CardDescription className="my-2"> {user?.username}</CardDescription>

                                    <CardDescription className="my-2"> {user?.location}</CardDescription>

                                    <CardDescription className="my-2"> {user?.activities.length}</CardDescription>

                                    {/* {(current?.id === user?.id) ?
                                        <CardDescription className="my-2">{user?.plan}</CardDescription>
                                        : <Button className="w-4/5" variant={"outline"}>
                                            <Link className="text-xs mx-2" href={``}>Be Premium for know it</Link>
                                        </Button>} */}

                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-4 px-8 py-4 h-full">
                            <div className="mb-2 flex flex-row justify-between">
                                <CardDescription>Plan : </CardDescription>
                                <CardDescription>{user?.plan}</CardDescription>
                            </div>
                            <div className="my-2 ">
                                <span className="text-sm">Max 2 activities for month</span>
                                <Progress value={user.activities.length * 10} />
                            </div>
                            <div className="my-2">
                                <span className="text-sm" >Max 5 activities for month</span>
                                <Progress value={user?.candidacies.length + 1 * 40} />
                            </div>

                            <Card className="mt-4 p-4 flex flex-row items-center justify-between">
                                <span className="font-ligth text-xs">You will soon reach the limite of your free plan, please upgrade </span>
                                <Button className="ml-8">
                                    Upgrade
                                </Button>
                            </Card>

                        </Card>
                    </div>

                    <div className="mx-4 flex flex-col justify-center items-center w-4/5">
                        <Card className="shadow-lg my-4  w-full h-full">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle> {(current?.id === user?.id) ? "My last activities" : `Last activities of ${user?.username}`}</CardTitle>
                                <div>
                                    {(current?.id === user?.id) ?
                                        <Link className="mr-4" href={"/activities/new"} >
                                            <Button variant={"secondary"}>
                                                Create a New Activity

                                            </Button>
                                        </Link> : null}

                                    <Link href={`/users/${user?.id}/activities`}>
                                        <Button>
                                            View all
                                            <MousePointerClick className="ml-2" size={16} />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {user?.activities.length === 0 ? (
                                    <CardDescription className="mt-20 flex justify-center items-center text-2xl">No activities found</CardDescription>
                                ) : (
                                    user?.activities.slice(0, 4).map((activity) => (
                                        <Card className="relative shadow-lg p-2 my-2" key={activity.id}>
                                            <Link href={`/activities/${activity.slug}`} key={activity.id}>
                                                {(current?.id === user?.id) && (activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length > 0 ? (
                                                    <div className=" -translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                                        {activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length}
                                                    </div>
                                                ) : null)}
                                                <div className="flex justify-between my-4 w-full">
                                                    <CardDescription className="font-extrabold">{activity.Title}</CardDescription>
                                                    <LucideIcons name={activity.Icon as IconName} />
                                                </div>
                                                <div className="flex justify-between">
                                                    <CardDescription className="my-2" >{activity.Date ? new Date(activity.Date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</CardDescription>
                                                    <CardDescription className="my-2" >{activity.Location}</CardDescription>
                                                    <CardDescription className="my-2" >{(typeof activity.Hour === 'string' && activity.Hour.match(/^\d+$/)) ?
                                                        `${parseInt(activity.Hour, 10)}h` :
                                                        activity.Hour}
                                                    </CardDescription>
                                                </div>
                                            </Link>
                                        </Card>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Card>
            </Layout>
        )

    } catch (error) {
        return <RouteError />;
    }
}