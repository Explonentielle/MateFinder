import Image from "next/image"
import { LoggedInButton } from "../auth/LoggedInButton"
import { Layout } from "@/src/components/Layout"
import { ModeToggle } from "../theme/ModeToggle"
import Link from "next/link"

export const Header = async () => {

  return (
    <header className="w-full border-b border-border px-4">
      <Layout className="flex py-0 flex-row items-center gap-4">
        <div className="flex-1 ">
          <Link className="flex items-center" href={"/"}>
            <Image
              width={64}
              height={64}
              src="/icon.png"
              alt="MateFinder logo" />
            <h2 className="pl-2 text-md md:text-2xl font-extrabold iconBorder">Mate Finder</h2>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LoggedInButton />
        </div>
      </Layout>
    </header>
  )
}
