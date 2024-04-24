import { currentUser } from "@/src/auth/current-user";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await currentUser();

  if (!user) {
    redirect("/landing/location");
  } else {
    redirect("/landing");
  }
}