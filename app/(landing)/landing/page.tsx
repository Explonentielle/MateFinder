import { Layout } from "@/src/components/Layout";
import { LandingHero } from "@/src/features/landing/LandingHero";
import { LandiongActivities } from "@/src/features/landing/LandingActivities";
import { FAQSection } from "@/src/features/landing/FAQsection";
import { BannerLanding } from "@/src/features/landing/BannerLanding";
import { Footer } from "@/src/features/layout/Footer";

import type { PageParams } from "@/src/types/next"
import { currentUser } from "@/src/auth/current-user";
import { redirect } from "next/navigation";


export default async function RouteParams(props: PageParams<{}>) {
    const user = await currentUser();

    if (user) {
        if (user.username && user.location) {
            return (
                <div className="size-full">
                    <Layout>
                        <LandingHero />
                        <LandiongActivities location={user.location} />
                        <BannerLanding />
                        <FAQSection />
                        <Footer />
                    </Layout>
                </div >
            )
        }else {
            redirect("/users/new");
        }
        
    } else {
        redirect("/landing/location");
    }
}
