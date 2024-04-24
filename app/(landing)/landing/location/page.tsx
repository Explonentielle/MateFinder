import { currentUser } from "@/src/auth/current-user";
import { Layout } from "@/src/components/Layout";
import { BannerLanding } from "@/src/features/landing/BannerLanding";
import { FAQSection } from "@/src/features/landing/FAQsection";
import { LocationForm } from "@/src/features/landing/LocationForm";
import { Footer } from "@/src/features/layout/Footer";
import { redirect } from "next/navigation";


export default async function RouteParams() {

    const user = await currentUser();

    if (!user) {
        return (
            <Layout>
                <LocationForm />
                <BannerLanding />
                <FAQSection />
                <Footer />
            </Layout>
            )
    } else {
        redirect("/landing");
    }
}
