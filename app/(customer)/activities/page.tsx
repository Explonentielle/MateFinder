import { requiredCurrentUser } from "@/src/auth/current-user";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { prisma } from "@/src/prisma";
import type { PageParams } from "@/src/types/next"
import RouteError from "./error";

import Link from "next/link";

export default async function RouteParams(props: PageParams<{}>) {
    try {
        const user = await requiredCurrentUser();

        const activities = await prisma.activity.findMany({
            where: {
                userId: user.id,
            },
        })

        return (
            <Layout>
                <Card className="p-4">
                    <CardHeader>
                        <div className="flex justify-between ">
                            <LayoutTitle>Check all Activities</LayoutTitle>
                            <Link href={"/activities/new"} className="flex items-center justify-center hover:bg-accent transition-color rounded-md border-2 border-dashed border-primary py-4-lg p-6 w-1/5">
                                Create Activity
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {activities.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>NAME</TableCell>
                                        <TableCell>CATEGORY</TableCell>
                                        <TableCell>INFORMATION</TableCell>
                                        <TableCell>DATE</TableCell>
                                        <TableCell>AVAILABALE SPOSTS</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activities.map(activity => (
                                        <TableRow key={activity.id}>
                                            <TableCell>{activity.Title}</TableCell>
                                            <TableCell>{activity.categorie}</TableCell>
                                            <TableCell>{activity.Information}</TableCell>
                                            <TableCell>{activity.Date?.toLocaleDateString()}</TableCell>
                                            <TableCell>{activity.userWanted}</TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        ) :
                            <Link href={"/activities/new"} className="flex items-center justify-center hover:bg-accent transition-color rounded-md border-2 border-dashed border-primary py-8-lg p-12 w-full">
                                Create Activity
                            </Link>
                        }
                    </CardContent>
                </Card>
            </Layout>
        );
    } catch (error) {
        return <RouteError />;
    }
}