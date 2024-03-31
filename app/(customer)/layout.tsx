import { Header } from "@/src/features/layout/Header";
import type { LayoutParams } from "@/src/types/next"
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";

export default async function RouteLayout(props: LayoutParams<{}>) {
    return (
        <div className="size-full">
            <Header />
            {props.children}
        </div>
    )
}