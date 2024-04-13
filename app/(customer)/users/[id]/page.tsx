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
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { error } from "console"
import { notFound } from "next/navigation"



export default async function RouteParams(props: PageParams<{ id: string }>) {

    try {  
        
        const userId = props.params.id
        const current = await currentUser()

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                reviews: true,
                activities: {
                    include: {
                        reviews: true,
                        candidacies: true
                    },
                }
            }
        })

        if (!user) {
            notFound()
        }

        console.error(user)


        const calculateAge = (date: Date) => {
            const birthDate = new Date(date)
            const today = new Date();

            const diff = today.getTime() - birthDate.getTime();
            const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            return age;
        };


        const rating = (activity: Activity) => {
            let totalRating = 0;

            if (activity.reviews && activity.reviews.length > 0) {
                activity.reviews.forEach((review) => {
                    totalRating += Number(review.rating);
                });
            }
            const averageRating = activity.reviews.length > 0 ? totalRating / activity.reviews.length : 0;

            return averageRating;
        }


        return (
            <Layout>
                <div className="flex justify-between items-center">
                    <LayoutTitle>{user.username}</LayoutTitle>
                    {(current?.id === user?.id) ? <Button>
                        <Link href={`/users/${user?.username}/edit`}>Update my profile</Link>
                    </Button> : <Button>
                        <Link href={``}>Send a message</Link>
                    </Button>}
                </div>

                <Card className="shadow-lg flex flex-row justify-center">

                    <Card className="shadow-lg m-8 w-2/4 ">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle> {(current?.id === user?.id) ? "My Informations" : `Informations of ${user?.username}`}</CardTitle>
                            <div className="flex items-center">
                                <Avatar className="size-10 mr-4">
                                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                                    {user?.image && <AvatarImage src={user?.image} alt={`${user?.name}'s profile picture`} />}
                                </Avatar>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-row justify-between items-center px-8 ">
                            <div>
                                <CardDescription className="my-2">Email :</CardDescription>
                                <hr />
                                <CardDescription className="my-2">Age : </CardDescription>
                                <hr />
                                <CardDescription className="my-2">Membre since : </CardDescription>
                                <hr />
                                <CardDescription className="my-2">Username : </CardDescription>
                                <hr />
                                <CardDescription className="my-2">Plan : </CardDescription>
                            </div>
                            <div className="flex flex-col items-end">
                                {(current?.id === user?.id) ?
                                    <CardDescription className="my-2"> {user?.email}</CardDescription>
                                    : <Button>
                                        <Link href={``}>Send a message</Link>
                                    </Button>}
                                <hr />
                                <CardDescription className="my-2"> {user?.age ? calculateAge(user?.age) : "Unknown"} year s old</CardDescription>
                                <hr />
                                <CardDescription className="my-2"> {user?.createdAt.toLocaleDateString()}</CardDescription>
                                <hr />
                                <CardDescription className="my-2"> {user?.username}</CardDescription>
                                <hr />
                                {(current?.id === user?.id) ?
                                    <CardDescription className="my-2">{user?.plan}</CardDescription>
                                    : <Button className="w-4/5" variant={"outline"}>
                                        <Link className="text-xs mx-2" href={``}>Be Premium for know it</Link>
                                     </Button>}

                            </div>
                        </CardContent>
                    </Card>

                    <div className="mx-8 flex flex-col justify-center items-center w-4/5">
                        <Card className="shadow-lg my-4  w-full">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle> {(current?.id === user?.id) ? "My activities" : `Activities of ${user?.username}`}</CardTitle>
                                <Link href={`/users/${user?.id}/activities`}>
                                    <Button>
                                        <MousePointerClick size={16} />
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                {user?.activities.slice(0, 2).map((activity) => (
                                    <Card className="relative shadow-lg p-2 my-2" key={activity.id}>
                                        <Link href={`/activities/${activity.slug}`} key={activity.id}>
                                            {(current?.id === user?.id) &&
                                                (activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length > 0 ? (
                                                    <div className=" -translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                                                        {activity.candidacies.filter(candidacy => candidacy.status === "PENDING").length}
                                                    </div>
                                                ) : null)
                                            }
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
                                            <div className="flex justify-between">
                                                <CardDescription>Average rating: </CardDescription>
                                                <CardDescription className="flex justify-center items-center">
                                                    {Array.from({ length: Math.floor(Number(rating(activity))) }).map((_, index) => (
                                                        <Star color="gold" key={index} size={16} />
                                                    ))}
                                                </CardDescription>
                                            </div>
                                        </Link>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg my-4 w-full">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle> {(current?.id === user?.id) ? "My reviews" : `Reviews of ${user?.username}`}</CardTitle>
                            </CardHeader>
                            <ScrollArea className="w-full h-[25vh]">
                                <CardContent>
                                    {user?.reviews.map((review) => (
                                        <Card className="shadow-lg p-2 my-2" key={review.id}>
                                            <div className="flex justify-between my-4 w-full">
                                                <CardDescription className="font-extrabold">{review.Title}</CardDescription>
                                                <CardDescription className="flex justify-center items-center">
                                                    {Array.from({ length: Math.floor(Number(review.rating)) }).map((_, index) => (
                                                        <Star color="gold" key={index} size={16} />
                                                    ))}
                                                    <span>/ 5</span>
                                                </CardDescription>
                                            </div>
                                            <CardDescription className="my-2" >{review.createdAt ? new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</CardDescription>
                                            <CardDescription className="">{review.content}</CardDescription>
                                        </Card>
                                    ))}
                                </CardContent>
                            </ScrollArea>
                        </Card>
                    </div>
                </Card>
            </Layout>
        )

    } catch (error) {
        return <RouteError />;
    }
}