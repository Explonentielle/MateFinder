import { Header } from "@/src/features/layout/Header";
import type { LayoutParams } from "@/src/types/next"

export default async function RouteLayout(props: LayoutParams<{}>) {
    return (
        <div className="h-full w-full">
            <Header />
            {props.children}
        </div>
    )
}