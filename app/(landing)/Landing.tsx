import { Layout } from "@/src/components/Layout";
import { PropsWithChildren } from "react";
import { LandingHero } from "@/src/features/landing/LandingHero";
import { LandiongActivities } from "@/src/features/landing/LandingActivities";
import { FAQSection } from "@/src/features/landing/FAQsection";
import { BannerLanding } from "@/src/features/landing/BannerLanding";
import { Footer } from "@/src/features/layout/Footer";

export type LandingProps = PropsWithChildren<{
    location: string;
}>;

export const Landing = async (props: LandingProps) => {

    return (
        <div className="size-full">
            <Layout>
                <LandingHero />
                <LandiongActivities location={props.location} />
                <BannerLanding />
                <FAQSection />
                <Footer />
            </Layout>
        </div >
    )
}

