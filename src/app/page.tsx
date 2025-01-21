import Hero from "@/components/landing/hero";
import InfoSection from "@/components/landing/info-section";
import MenuParallax from "@/components/landing/menu-parallax";
import Navbar from "@/components/navbar";
import {ArrowBigDown} from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Home(): React.JSX.Element {
    return (
        <div className="flex flex-col">
            <div className="md:h-screen relative">
                <Navbar />
                <Hero />
            </div>
            <div className="flex flex-col container md:h-screen relative">
                <InfoSection />
            </div>
            <div className="mb-24">
                <div className="border-y flex items-center justify-center py-2 text-primary">
                    <Marquee autoFill>
                        <div className="text-lg font-medium px-4">
                            PREVIEW OUR POPULAR DISHES
                        </div>
                        <ArrowBigDown />
                    </Marquee>
                </div>
            </div>
            <div className="container">
                <MenuParallax />
            </div>
        </div>
    );
}
