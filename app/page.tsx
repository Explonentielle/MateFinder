import { Header } from "@/src/features/layout/Header";
import { currentUser } from "@/src/auth/current-user";
import { LocationForm } from "@/src/features/landing/LocationForm";
import ProfileUpdateForm from "@/src/features/landing/ProfilUpdateForm";
import { FAQSection } from "@/src/features/landing/FAQsection";
import { BannerLanding } from "@/src/features/landing/BannerLanding";
import { Footer } from "@/src/features/layout/Footer";
import { LandingHero } from "@/src/features/landing/LandingHero";
import { Layout } from "@/src/components/Layout";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await currentUser();


  if (!user) {
    redirect("/landing/location");
  } else {
    redirect("/landing");
  }

  // if (!user) {
  //   redirect("/landing/location");
  // } 
  // else if (user && user.location) {
  //   redirect("/landing");
  // } 
  // else {
  //   redirect("/profil");
  // }
  


  // if (!user) {
  //   return (
  //     <div className="size-full">
  //       <Header />
  //       <LocationForm />
  //       <BannerLanding />
  //       <FAQSection />
  //       <Layout>
  //         <Footer />
  //       </Layout>
  //     </div>
  //   )
  // }
  // else if (user && (!user?.username || !user.age || !user.name || !user.location)) {
  //   return (
  //     <div className="size-full">
  //       <Header />
  //       <Layout>
  //         <LandingHero />
  //         <ProfileUpdateForm userId={user?.id} />
  //       </Layout>
  //     </div>
  //   )

  // } else {
  //   if (!user?.location) {
  //     throw Error
  //   }

  //   return (
  //     <div className="size-full">
  //       <Header />
  //       {/* <Landing location={user.location} /> */}
  //     </div>
  //   );
  // }
}