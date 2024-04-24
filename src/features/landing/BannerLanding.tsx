
import { buttonVariants } from "@/src/components/ui/button";
import { Section } from "./Section";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export const BannerLanding = () => {
    return (
        <Section className="text-center">
            <p
                className="mb-7  inline-flex items-center justify-between rounded-full bg-accent/50 p-1 pr-4 text-sm text-card-foreground hover:bg-accent"
            >
                <span className="mr-3 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground">
                    Available soon
                </span>{" "}
                <span className="text-sm font-medium">
                    AI Vocal helper for activity creation
                </span>
                <svg
                    className="ml-2 size-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-foreground  md:text-5xl lg:text-6xl">
                Go Premium and Create Unlimited Activities and Matches!
            </h1>
            <p className="mb-8 text-lg font-normal text-muted-foreground sm:px-16 lg:text-xl xl:px-48">
                Unlock premium perks: Highlight and customize your activities, and craft a professional profile.
            </p>
            <div className="mb-0 flex flex-col space-y-4 md:flex-row md:justify-center md:space-x-4 md:space-y-0 md:mb-2">
                <Link
                    href="#"
                    className={buttonVariants({
                        size: "lg",
                    })}
                >
                    Learn more
                    <MoveRight className="ml-4"/>
                </Link>
                <Link
                    href="#"
                    className={buttonVariants({
                        size: "lg",
                        variant: "secondary",
                    })}
                >
                    Go Premium
                </Link>
            </div>
        </Section>
    );
};