import { Header } from "@/src/features/layout/Header";
import { Landing } from "./(landing)/Landing";


export default async function Home() {

  return (
    <div className="size-full">
      <Header />
      {/* <Landing /> */}
    </div>
  );
}