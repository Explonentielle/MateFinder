import type {  PageParams } from "@/src/types/next"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout, LayoutTitle } from "@/src/components/Layout"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { prisma } from "@/src/prisma"
import LucideIcons, { IconName } from "@/src/components/LucideIcons"
import { MousePointerClick, Star } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import RouteError from "../../error"
import { notFound } from "next/navigation"
import { Progress } from "@/src/components/ui/progress"
import ChatButton from "../chat/ChatButton"
import { UserAvatar } from "@/src/components/UserAvatar"




export default async function RouteParams(props: PageParams<{ id: string }>) {

    try {
        const username = props.params.id
        const current = await requiredCurrentUser()

        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                reviews: true,
                activities: {
                    where: {
                        Date: {
                            gte: new Date()
                        }
                    },
                    orderBy: {
                        Date: 'asc'
                    },
                    take: 3,
                    include: {
                        candidacies: {
                            select: {
                                status: true
                            }
                        }
                    }
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
                    <LayoutTitle className="text-xl md:text-4xl">{user.username}</LayoutTitle>
                    {(current?.id === user?.id) ?
                        <Button className="p-0">
                            <Link className="p-2" href={`/users/${user?.username}/edit`}>Update my profile</Link>
                        </Button>
                        :
                        <Button className="p-0">
                            <Link className="p-2" href={``}>Send friend request</Link>
                        </Button>}
                </div>

                <Card className="shadow-lg flex flex-col md:flex-row justify-center">
                    <div className="flex flex-col m-4 w-content md:w-2/4">
                        <Card className="shadow-lg h-full ">
                            <CardHeader className="p-2 md:p-6 flex flex-row items-center justify-between">
                                <CardTitle> {(current.id === user.id) ? "My Informations" : `Informations of ${user?.username}`}</CardTitle>
                                <div className="flex items-center">
                                    <UserAvatar email={user.email || ""} image={user.image || undefined} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-2 md:p-6 flex flex-row justify-between px-2 md:px-8 ">
                                <div className="mr-2 flex flex-col items-start">
                                    <CardDescription className="my-2">Email:</CardDescription>

                                    <CardDescription className="my-2">Age: </CardDescription>

                                    <CardDescription className="my-2">Membre since: </CardDescription>

                                    <CardDescription className="my-2">Username: </CardDescription>

                                    <CardDescription className="my-2">Location: </CardDescription>

                                    <CardDescription className="my-2">Activities: </CardDescription>
                                </div>
                                <div className="flex flex-col items-end">
                                    {current.id === user.id ? (
                                        <CardDescription className="my-2">{user.email}</CardDescription>
                                    ) : (
                                        <ChatButton
                                            current={{
                                                id: current.id,
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
                                </div>
                            </CardContent>
                        </Card>

                        {current.id === user.id ?
                            <Card className="mt-4 px-8 py-4 h-full shadow-lg">
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

                                <Card className="mt-6 p-4 flex flex-row items-center justify-between">
                                    <span className="font-light text-xs">You will soon reach the limite of your free plan, please upgrade </span>
                                    <Button className="ml-8">
                                        Upgrade
                                    </Button>
                                </Card>
                            </Card>
                            :
                            null
                        }
                    </div>

                    <div className="mx-4 flex flex-col justify-center items-center w-content md:w-4/5">
                        <Card className="shadow-lg my-4  w-full h-full ">
                            <CardHeader className="p-4 px-6 flex flex-col md:flex-row justify-between items-center">
                                <CardTitle className="mb-2 md:mb-0"> {(current?.id === user?.id) ? "My last activities" : `Last activities of ${user?.username}`}</CardTitle>
                                <div className="flex">
                                    {(current?.id === user?.id) ?
                                        <Link className="mr-2 md:mr-4" href={"/activities/new"} >
                                            <Button variant={"secondary"}>
                                                Create a New Activity

                                            </Button>
                                        </Link> : null}

                                    <Link href={`/users/${user?.username}/activities`}>
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

                        {current.id === user.id ?
                            <Card className="shadow-lg h-1/3 w-full mb-4 p-6">
                                <div className="w-2/4">
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="flex relative">
                                            {user.candidacies.filter(candidacy => candidacy.status === "PENDING").length > 0 ? <span className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 mr-4 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                                {user.candidacies.filter(candidacy => candidacy.status === "PENDING").length}
                                            </span> : null}
                                            <Link href={`/users/${username}/candidacies`}>
                                                <Button variant={"outline"}>
                                                    Check all your send candidacies
                                                </Button>
                                            </Link>
                                        </CardDescription>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <CardDescription className="relative flex">
                                            {/* <span className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 mr-4 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                                {4}
                                            </span> */}
                                            <Button variant={"outline"}>
                                                Check all your Messages
                                            </Button>
                                        </CardDescription>
                                    </div>
                                </div>
                            </Card>
                            :
                            null}

                    </div>
                </Card>
            </Layout>
        )

    } catch (error) {
        return <RouteError />;
    }
}