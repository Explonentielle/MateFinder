import { Layout, LayoutTitle } from "@/src/components/Layout"
import type { PageParams } from "@/src/types/next"
import ActivityForm from "../[activityid]/edit/ActivityForm"


export default async function RouteParams(props: PageParams<{}>) {
    return (
        <Layout>
            <LayoutTitle className="flex font-bold">Ready to Join the<p className="titleBorder ml-2">Community?</p></LayoutTitle>
            <h1 className="font-bold text-xl"> Propose Your Activity with Mate Finder!</h1>
            <ActivityForm />
        </Layout>
    )
}