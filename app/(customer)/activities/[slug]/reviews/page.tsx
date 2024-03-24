import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout, LayoutTitle } from "@/src/components/Layout"
import { Button } from "@/src/components/ui/button"
import { Card, CardHeader, CardContent, CardDescription } from "@/src/components/ui/card"
import { prisma } from "@/src/prisma"
import type { PageParams } from "@/src/types/next"
import Link from "next/link"
import RouteError from "./error"

export default async function RouteParams(props: PageParams<{ slug: string }>) {

    try {
        const user = await requiredCurrentUser()

        const activities = await prisma.activity.findMany({
            where: {
                slug: props.params.slug
            },
            include: {
                reviews: true
            }
        })

        return (
            <Layout>
                {activities.map((activity) => (
                    <Card key={activity.id} className="my-4">
                        <CardHeader>
                            {activity.Title}
                        </CardHeader>
                        <CardContent>
                            {activity.reviews.map((review) => (
                                <div key={review.id} className="border-t border-gray-200 py-2">
                                    <CardDescription className="font-bold">{review.Title}</CardDescription>
                                    <CardDescription>{review.content}</CardDescription>
                                    <CardDescription>Rating: {review.rating}</CardDescription>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}

                <Link href={`/activities/${props.params.slug}/reviews/new`}>
                    <Button className="w-full">
                        {`Create a Review for ${props.params.slug}`}
                    </Button>
                </Link>
            </Layout>
        )
    } catch (error) {
        return <RouteError />;
    }
}
