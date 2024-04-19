import { Header } from "@/src/features/layout/Header";
import { Landing } from "./(landing)/Landing";
import { currentUser } from "@/src/auth/current-user";
import { LocationForm } from "./(landing)/LocationForm";


export default async function Home() {

  const user = await currentUser();

  return (
    <div className="size-full">
      <Header />
      {user ? <Landing user={user} /> : <LocationForm />} 
    </div>
  );
}