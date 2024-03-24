import { Layout } from "@/src/components/Layout";
import { Header } from "@/src/features/layout/Header";
import { Landing } from "./Landing";




export default function Home() {
  return (
    <div className="h-full w-full">
      <Header />
      <Layout>
        <Landing />
      </Layout>
    </div>
  );
}
