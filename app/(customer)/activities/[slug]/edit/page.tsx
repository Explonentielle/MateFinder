import { Layout, LayoutTitle } from "@/src/components/Layout"
import type { PageParams } from "@/src/types/next"
import ActivityForm from "./ActivityForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { prisma } from "@/src/prisma";
import { notFound } from "next/navigation";
import RouteError from "../../error";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";


export default async function RouteParams(props: PageParams<{ slug: string }>) {

    try {
        const user = await requiredCurrentUser();

        const activity = await prisma.activity.findUnique({
            where: {
                slug: props.params.slug,
                userId: user.id,
            }
        })

        if (!activity) {
            notFound()
        }
        return (
            <Layout>
                <Link href={`/activities/${props.params.slug}/reviews`}>
                    <ChevronsLeft size={32} className="" />
                </Link>
                <LayoutTitle>
                    Create Activities
                </LayoutTitle>
                <ActivityForm defaultValues={activity} activityId={activity.id} />
            </Layout>
        )
    } catch (error) {
        return <RouteError />;
    }
}