import Footer from "@/components/footer";
import Hero from "@/components/landing/hero";
import InfoSection from "@/components/landing/info-section";
import MenuParallax from "@/components/landing/menu-parallax";
import Testimonials from "@/components/landing/testimonials";
import Navbar from "@/components/navbar/navbar";
import {Button} from "@/components/ui/button";
import {getMenu} from "@/features/menu/actions/getMenu";
import {ArrowBigDown, Calendar} from "lucide-react";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import {motion} from "motion/react";

// Landing page component
export default async function Home(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data || [];

    const appetizers = menu.filter((item) => item.type === "Appetizer");
    const randomizedAppetizers = appetizers.sort(() => Math.random() - 0.5).slice(0, 4);

    const sides = menu.filter((item) => item.type === "Side");
    const randomizedSides = sides.sort(() => Math.random() - 0.5).slice(0, 2);

    const entrees = menu.filter((item) => item.type === "Entree");
    const randomizedEntrees = entrees.sort(() => Math.random() - 0.5).slice(0, 6);

    const desserts = menu.filter((item) => item.type === "Dessert");
    const randomizedDesserts = desserts.sort(() => Math.random() - 0.5).slice(0, 4);

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

                <Testimonials />

                {/* Menu parallax section */}
                {menu && (
                    <div className="container">
                        <MenuParallax
                            randomizedAppetizers={randomizedAppetizers}
                            randomizedDesserts={randomizedDesserts}
                            randomizedSides={randomizedSides}
                            randomizedEntrees={randomizedEntrees}
                        />
                    </div>
                )}

                <div className="container px-8">
                    <div className="rounded-3xl border-2 flex items-center justify-center h-[400px] bg-[url('/about/mission.jpg')] bg-cover bg-center p-0 overflow-hidden">
                        <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-60">
                            <div className="text-4xl md:text-6xl font-bold text-primary font-homemade-apple text-center">
                                Reserve a<br className="md:hidden flex" /> Spot
                            </div>
                            <div className="mt-12">
                                <Link href={"/reserve"}>
                                    <Button size={"lg"}>
                                        Reserve Now
                                        <Calendar />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
