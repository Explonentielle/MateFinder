import Image from "next/image"
import { LoggedInButton } from "../auth/LoggedInButton"
import { Layout } from "@/src/components/Layout"
import { ModeToggle } from "../theme/ModeToggle"

export const Header = async () => {
    return (
        <header className="w-full border-b border-border px-4">
            <Layout className="flex items-center gap-4">
                <div className="flex-1 ">
                    <Image
                        width="64"
                        height="64"
                        src="/icon.png"
                        alt="MateFinder logo" />
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle/>
                    <LoggedInButton />
                </div>
            </Layout>
        </header>
    )
}
