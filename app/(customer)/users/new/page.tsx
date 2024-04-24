import type { PageParams } from "@/src/types/next"
import UserForm from "../[id]/edit/UserForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout } from "@/src/components/Layout"


export default async function RouteParams(props: PageParams<{ username: string }>) {

    const user = await requiredCurrentUser()

    return (
        <Layout>
            <p>New profil </p>
            <UserForm />
        </Layout>
    )
} 