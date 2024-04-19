import { Header } from "@/src/features/layout/Header";
import { Landing } from "./(landing)/Landing";
import { currentUser } from "@/src/auth/current-user";
import { LocationForm } from "./(landing)/LocationForm";
import { Suspense } from "react";


export default async function Home() {

  return (
    <div className="size-full">
      <Header />
      <Suspense fallback={<p>... loading</p>}>
        <Landing />
      </Suspense>
    </div>
  );
}