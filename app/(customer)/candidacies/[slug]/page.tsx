import { currentUser, requiredCurrentUser } from "@/src/auth/current-user";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import { notFound } from "next/navigation";
import RouteError from "../error";
import { Button } from "@/src/components/ui/button";
import { Check, Cross } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import Link from "next/link";
import CandidacyForm from "../new/CandidacyForm";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";


export default async function RouteParams(props: PageParams<{ slug: string }>) {

    try {
        const user = await requiredCurrentUser()

        const activity = await prisma.activity.findUnique({
            where: {
                slug: props.params.slug,
            },
            include: {
                candidacies: {
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!activity) {
            notFound();
        }

        if (user.id !== activity.userId) {
            notFound();
        }

        return (
            <Layout>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>
                            Manage candidacies for {activity?.Title}.
                        </CardTitle>
                    </CardHeader>
                    {activity?.candidacies && activity.candidacies.length > 0 ? (
                        activity.candidacies.map((candidacy) => (
                            <Card className="shadow-lg m-4" key={candidacy.id}>
                                <CardContent className="flex items-center justify-between p-4 w-full">
                                    <Button className="m-2 shadow-lg" variant={"secondary"}>
                                        <Link className="flex items-center p-4" href={`/users/${candidacy.user.id}`}>
                                            <CardDescription className="mr-4 ">{candidacy.user.username}</CardDescription>
                                            <CardDescription className="flex justify-center items-center" >
                                                <Avatar className='size-6'>
                                                    <AvatarFallback>{candidacy.user.username?.[0]}</AvatarFallback>
                                                    {candidacy.user.image ? (
                                                        <AvatarImage src={candidacy?.user.image} alt={`${candidacy.user.username}'s profile picture`} />
                                                    ) : null}
                                                </Avatar>
                                            </CardDescription>
                                        </Link>
                                    </Button>
                                    <CardDescription className="mr-4 ">{candidacy.createdAt.toLocaleDateString()}</CardDescription>
                                    <div className="flex">
                                        {candidacy.status === "PENDING" && (
                                            <>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button className="bg-green-300 mr-4" variant="outline"><Check size={24} /></Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80">
                                                        <div className="grid gap-4">
                                                            <div className="space-y-2">
                                                                <p className="text-sm text-muted-foreground">
                                                                    Are your sure to approve this candidacy
                                                                </p>
                                                            </div>
                                                            <div className="items-center">
                                                                <CandidacyForm activityId={activity.id} userId={candidacy.userId} status="APPROVED" icon="Check" candidacyId={candidacy.id} />
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button className="bg-red-300 mr-4" variant="outline"><Cross className=" rotate-45" size={24} /></Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80">
                                                        <div className="grid gap-4">
                                                            <div className="space-y-2">
                                                                <p className="text-sm text-muted-foreground">
                                                                    Are your sure to rejecte this candidacy
                                                                </p>
                                                            </div>
                                                            <div className="items-center">
                                                                <CandidacyForm activityId={activity.id} userId={candidacy.userId} status="REJECTED" icon="Cross" candidacyId={candidacy.id} />
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </>
                                        )}
                                        {candidacy.status === "APPROVED" && (
                                            <>
                                                <Card className="bg-green-500 mr-4" >
                                                    <CandidacyForm activityId={activity.id} userId={candidacy.userId} icon="Check" candidacyId={candidacy.id} />
                                                </Card>
                                                <Card className="bg-gray-300">
                                                    <CandidacyForm activityId={activity.id} userId={candidacy.userId} icon="Cross" candidacyId={candidacy.id} />
                                                </Card>
                                            </>
                                        )}
                                        {candidacy.status === "REJECTED" && (
                                            <>
                                                <Card className="bg-gray-300 mr-4" >
                                                    <CandidacyForm activityId={activity.id} userId={candidacy.userId} icon="Check" candidacyId={candidacy.id} />
                                                </Card>
                                                <Card className="bg-red-500">
                                                    <CandidacyForm activityId={activity.id} userId={candidacy.userId} icon="Cross" candidacyId={candidacy.id} />
                                                </Card>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <CardContent>
                            <CardDescription>No candidacies</CardDescription>
                        </CardContent>
                    )}
                </Card>
            </Layout>
        );

    } catch (error) {
        return <RouteError />;
    }
}
