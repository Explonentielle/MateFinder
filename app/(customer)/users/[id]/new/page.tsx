import type { PageParams } from "@/src/types/next"
import UserForm from "../edit/UserForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout } from "@/src/components/Layout"
import Link from "next/link"
import { ChevronsLeft } from "lucide-react"


export default async function RouteParams(props: PageParams<{ username: string }>) {

    const user = await requiredCurrentUser()
    console.log(props.params.username)

    return (
        <Layout>
            <p>profil de l utilisateur : {props.params.username} </p>
            <UserForm userId={user.id} username={props.params.username} />
        </Layout>
    )
}