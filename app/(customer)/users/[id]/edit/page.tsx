import type { PageParams } from "@/src/types/next"
import UserForm from "./UserForm"
import { requiredCurrentUser } from "@/src/auth/current-user"
import { Layout } from "@/src/components/Layout"
import Link from "next/link"
import { ChevronsLeft } from "lucide-react"


export default async function RouteParams(props: PageParams<{ id: string }>) {

    const user = await requiredCurrentUser()

    const defaultValues = {
        name: user?.name || "",
        age: new Date (user?.age || new Date) || new Date,
        username: user?.username || "",
        image: user?.image || "",
    }

    return (
        <Layout>
            <Link href={`/`}>
                <ChevronsLeft size={32} className="" />
            </Link>
            <p>profil de l utilisateur : {props.params.id} </p>
            <UserForm userId={user.id} username={user.username ?? ""} defaultValues={defaultValues} />
        </Layout>
    )
}