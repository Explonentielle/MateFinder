import { Header } from "@/src/features/layout/Header";
import { Landing } from "./(landing)/Landing";
import { currentUser } from "@/src/auth/current-user";
import { LocationForm } from "@/src/features/landing/LocationForm";
import ProfileUpdateForm from "@/src/features/landing/ProfilUpdateForm";
import { FAQSection } from "@/src/features/landing/FAQsection";
import { BannerLanding } from "@/src/features/landing/BannerLanding";
import { Footer } from "@/src/features/layout/Footer";
import { LandingHero } from "@/src/features/landing/LandingHero";
import { Layout } from "@/src/components/Layout";
import { Sidebar } from "@/src/features/sidebar/Sidebar";


export default async function Home() {

  const user = await currentUser();

  if (!user) {
    return (
      <div className="size-full">
        <Header />
        <Sidebar/>
        <LocationForm />
        <BannerLanding />
        <FAQSection />
        <Layout>
          <Footer />
        </Layout>
      </div>
    )
  }
  else if (user && (!user?.username || !user.age || !user.name || !user.location)) {
    return (
      <div className="size-full">
        <Header />
        <Sidebar/>
        <Layout>
          <LandingHero />
          <ProfileUpdateForm userId={user?.id} />
        </Layout>
      </div>
    )

  } else {
    if (!user?.location) {
      throw Error
    }

    return (
      <div className="size-full">
        <Header />
        <Sidebar/>
        <Landing location={user.location} />
      </div>
    );
  }
}