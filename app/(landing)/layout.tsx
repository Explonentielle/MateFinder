import { Footer } from "@/src/features/layout/Footer";
import { Header } from "@/src/features/layout/Header";
import type { LayoutParams } from "@/src/types/next"

export default async function RouteLayout(props: LayoutParams<{}>) {
    return (
        <div className="size-contente">
            <Header />
            {props.children}
        </div>
    )
}  