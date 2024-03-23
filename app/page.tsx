import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Button } from "@/src/components/ui/button";
import { Header } from "@/src/features/layout/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Header />
      <Layout>
        <LayoutTitle>
          Welcome
        </LayoutTitle>
        <Button
        variant={"ghost"}
          className="py-6 w-1/3 border-dashes border-2">
          <Link href={"/activities"} >
            Check All Activities
          </Link>
        </Button>
      </Layout>
    </div>
  );
}
