import Footer from "@/components/footer";
import Hero from "@/components/landing/hero";
import InfoSection from "@/components/landing/info-section";
import MenuParallax from "@/components/landing/menu-parallax";
import Navbar from "@/components/navbar/navbar";
import {ArrowBigDown} from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

// Landing page component
export default function Home(): React.JSX.Element {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                {/* Hero section with navigation */}
                <div className="md:h-screen relative">
                    <Navbar />
                    <Hero />
                </div>

                {/* Restaurant info section */}
                <div className="flex flex-col container md:h-screen relative">
                    <InfoSection />
                </div>

                {/* Menu preview marquee */}
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

                {/* Menu parallax section */}
                <div className="container">
                    <MenuParallax />
                </div>
            </div>
            <Footer />
        </div>
    );
}
