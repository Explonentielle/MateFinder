import { Layout, LayoutTitle } from "@/src/components/Layout"
import type { PageParams } from "@/src/types/next"
import ActivityForm from "../[slug]/edit/ActivityForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import RouteError from "../error"


export default async function Route() {
    try {
        const user = await requiredCurrentUser()

        return (
            <Layout>
                <LayoutTitle className="flex font-bold">Ready to Join the<p className="ml-2 titleBorder">Community?</p></LayoutTitle>
                <h1 className="font-bold text-xl"> Propose Your Activity with Mate Finder!</h1>
                <ActivityForm />
            </Layout>
        )
    } catch (error) {
        return <RouteError />;
    }
}