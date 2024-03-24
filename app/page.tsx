import { Layout } from "@/src/components/Layout";
import { Header } from "@/src/features/layout/Header";
import { Landing } from "./(landing)/Landing";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Header />
      <Landing />
    </div>
  );
}
