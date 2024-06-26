import { Layout, LayoutTitle } from "@/src/components/Layout"
import type { PageParams } from "@/src/types/next"
import ReviewForm from "../edit/ReviewForm"
import { prisma } from "@/src/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";

export default async function RouteParams(props: PageParams<{ slug: string }>) {

    const activity = await prisma.activity.findUnique({
        where: {
            slug: props.params.slug
        },
        include: {
            user: true
        }
    });

    if (!activity) {
        return notFound()
    }


    return (
        <Layout>
            <LayoutTitle>{props.params.slug}</LayoutTitle>
            <ReviewForm slug={activity.slug} activityId={activity.id} />
        </Layout>
    )

}