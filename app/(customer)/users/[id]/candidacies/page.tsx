import { requiredCurrentUser } from "@/src/auth/current-user";
import { Layout } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import { notFound } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Check, Cross } from "lucide-react";
import Link from "next/link";
import RouteError from "../../error";


export default async function RouteParams(props: PageParams<{ id: string }>) {

    try {
        const current = await requiredCurrentUser()

        const user = await prisma.user.findUnique({
            where: {
                username: props.params.id,
            },
            include: {
                candidacies: {
                    include: {
                        activity: true
                    }
                }
            }
        })

        if (!user) {
            notFound();
        }

        if (user.id !== current.id) {
            notFound();
        }

        return (
            <Layout>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>
                            All Candidacies of {user?.username}.
                        </CardTitle>
                    </CardHeader>
                    {user?.candidacies && user.candidacies.length > 0 ? (
                        user.candidacies.map((candidacy) => (
                            <Card className="shadow-lg m-4" key={candidacy.id}>
                                <CardContent className="flex flex-col md:flex-row items-center justify-between p-4 w-full">
                                    <Link className="p-2" href={`/activities/${candidacy.activity.slug}`}>
                                        <Button className="flex flex-col items-center  m-2 shadow-lg h-full" variant={"secondary"}>
                                            <CardDescription className="mr-4 font-bold text-md md:text-xl p-2">{`${candidacy.activity.Title.slice(0, 20)}...`}</CardDescription>
                                            <div className="flex">
                                                <CardDescription className="mr-4 ">{candidacy.activity.Location}</CardDescription>
                                                <CardDescription className="mr-4">{candidacy.activity.Date.toLocaleDateString()}</CardDescription>
                                            </div>
                                        </Button>
                                    </Link>
                                    <CardDescription className="mr-4 flex flex-row md:flex-col items-center"> <span className="font-bold mr-2">Candidacy sent on</span>  {candidacy.createdAt.toLocaleDateString()}</CardDescription>
                                    <div className="flex">
                                        {candidacy.status === "PENDING" && (
                                            <CardDescription className="mr-4 mt-2 md:mt-0 flex flex items-center"><span className="font-bold mr-4">Candidacy statut</span>  Pending</CardDescription>
                                        )}
                                        {candidacy.status === "APPROVED" && (
                                            <>
                                                <CardDescription className="w-content mr-4 flex flex items-center"><span className="w-[8rem] font-bold mr-4">Candidacy statut</span> Approved</CardDescription>
                                                <Card className="w-full flex items-center justify-center bg-green-500" >
                                                    <Check color="white" size={36} />
                                                </Card>
                                            </>
                                        )}
                                        {candidacy.status === "REJECTED" && (
                                            <>
                                                <CardDescription className="w-content mr-4 flex flex items-center"><span className="font-bold mr-4">Candidacy statut</span>Rrejected</CardDescription>
                                                <Card className="w-full  flex items-center justify-center bg-red-500 ">
                                                    <Cross className={'rotate-45'} color="white" size={36} />
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
                            <Button className="m-2 shadow-lg" variant={"secondary"}>
                                <Link className="flex items-center p-4" href={`/`}>
                                    Find new activities
                                </Link>
                            </Button>
                        </CardContent>
                    )}
                </Card>
            </Layout>
        );

    } catch (error) {
        return <RouteError />;
    }
}
