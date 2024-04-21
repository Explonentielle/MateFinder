import type { PageParams } from "@/src/types/next"
import UserForm from "./UserForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout } from "@/src/components/Layout"
import { notFound } from "next/navigation";


export default async function RouteParams(props: PageParams<{ id: string }>) {
    const user = await requiredCurrentUser();



    if (user?.username !== props.params.id) {
        return notFound();
    }

    const defaultValues = {
        name: user?.name || "",
        age: new Date(user?.age || new Date) || new Date,
        username: user?.username || "",
        location: user?.location || "",
        image: user?.image || "",
    }

    return (
        <Layout>
            <p>Profil de l'utilisateur : {user.username} </p>
            <UserForm username={user.username} defaultValues={defaultValues} />
        </Layout>
    )
}