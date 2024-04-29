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
                <LayoutTitle className="flex text-xl md:text-4xl font-bold">Pret a rejoindre la<p className="ml-2 titleBorder">Communauté?</p></LayoutTitle>
                <h1 className="font-bold text-lg md:text-xl"> Propose ton activité avec Mate Finder!</h1>
                <ActivityForm />
            </Layout>
        )
    } catch (error) {
        return <RouteError />;
    }
}