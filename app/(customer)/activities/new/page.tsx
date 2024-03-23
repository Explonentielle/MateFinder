import { Layout, LayoutTitle } from "@/src/components/Layout"
import type { PageParams } from "@/src/types/next"
import ActivityForm from "../[activityid]/edit/ActivityForm"


export default async function RouteParams(props: PageParams<{}>) {
    return (
        <Layout>
            <LayoutTitle>
                Create Activities
            </LayoutTitle>
            <ActivityForm/>
        </Layout>
    )
}