import { Header } from "@/src/features/layout/Header";
import { currentUser } from "@/src/auth/current-user";
import { LocationForm } from "@/src/features/landing/LocationForm";
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
}