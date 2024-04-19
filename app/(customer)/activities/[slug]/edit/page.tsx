import { Layout, LayoutTitle } from "@/src/components/Layout";
import type { PageParams } from "@/src/types/next";
import ActivityForm from "./ActivityForm";
import { requiredCurrentUser } from "@/src/auth/current-user";
import { prisma } from "@/src/prisma";
import { notFound } from "next/navigation";
import RouteError from "../../error";

export default async function RouteParams(props: PageParams<{ slug: string }>) {
    try {
        const user = await requiredCurrentUser();

        const activity = await prisma.activity.findUnique({
            where: {
                slug: props.params.slug,
                userId: user.id,
            }
        });

        if (!activity) {
            notFound();
        }

        const activityWithValidLink = { ...activity, Link: activity.Link || undefined };

        return (
            <Layout>
                <LayoutTitle>
                    Create Activities
                </LayoutTitle>
                <ActivityForm defaultValues={activityWithValidLink} activityId={activity.id} />
            </Layout>
        );
    } catch (error) {
        return <RouteError />;
    }
}