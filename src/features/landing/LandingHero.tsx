import { LayoutTitle } from "@/src/components/Layout";

export const LandingHero = () => {
    return (
        <>
            <LayoutTitle className="flex items-center">
                <p className="mr-2 md:mr-4 text-lg md:text-4xl">Welcome to</p><p className="titleBorder font-extrabold text-2xl md:text-5xl">Mate Finder</p>
            </LayoutTitle>
            <h1 className="text-xl md:text-2xl  pl-6">Discover your perfect mate with Mate Finder</h1>
        </>

    );
};