import { Header } from "@/src/features/layout/Header";
import { Sidebar } from "@/src/features/sidebar/Sidebar";
import type { LayoutParams } from "@/src/types/next"

export default async function RouteLayout(props: LayoutParams<{}>) {
    return (
        <div className="size-full relative">
            <Header />
            <Sidebar />
            {props.children}
        </div>
    )
}  