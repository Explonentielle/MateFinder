import { PageParams } from "@/src/types/next";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { LandingHero } from "@/src/features/landing/LandingHero";
import { LandiongActivities } from "@/src/features/landing/LandingActivities";
import { FAQSection } from "@/src/features/landing/FAQsection";
import { BannerLanding } from "@/src/features/landing/BannerLanding";
import { Footer } from "@/src/features/layout/Footer";

export default async function RouteParams(props: PageParams<{ slug: string }>) {

    return (
        <div className="size-full">
            <Layout>
                <LandingHero />
                <LandiongActivities location={props.params.slug} />
                <BannerLanding />
                <FAQSection />
                <Footer/>
            </Layout>
        </div >
    )
}

