import type { PageParams } from "@/src/types/next"
import UserForm from "./UserForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout } from "@/src/components/Layout"

export default async function RouteParams(props: PageParams<{ id: string }>) {

    const user = await requiredCurrentUser()

    const defaultValues = {
        name: user?.name || "",
        age: new Date (user?.age || new Date) || new Date,
        username: user?.username || "",
        location: user?.location || "",
        image: user?.image || "",
    }

    return (
        <Layout>
            <p>profil de l utilisateur : {props.params.id} </p>
            <UserForm userId={user.id} username={user.username ?? ""} defaultValues={defaultValues} />
        </Layout>
    )
}