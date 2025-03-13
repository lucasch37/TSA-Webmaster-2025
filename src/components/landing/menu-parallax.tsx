"use client";
import {motion, MotionValue, useScroll, useTransform} from "motion/react";
import Image from "next/image";
import React from "react";
import {Button} from "../ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {MenuItem} from "@/types";

// Parallax scrolling menu preview component
const MenuParallax = ({
    randomizedAppetizers,
    randomizedSides,
    randomizedEntrees,
    randomizedDesserts,
}: {
    randomizedAppetizers: MenuItem[];
    randomizedSides: MenuItem[];
    randomizedEntrees: MenuItem[];
    randomizedDesserts: MenuItem[];
}): React.JSX.Element => {
    // Helper function for parallax effect calculations
    function useParallax(
        value: MotionValue<number>,
        distance: number,
    ): MotionValue<number> {
        return useTransform(value, [0, 1], [-distance, distance]);
    }

    const {scrollYProgress} = useScroll();
    // Different parallax speeds for left and right columns
    const y = useParallax(scrollYProgress, 300);
    const y2 = useParallax(scrollYProgress, 800);

    // Animation variants for text reveal
    const container = {
        initial: {opacity: 0},
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const letterAnimation = {
        initial: {
            opacity: 0,
            y: 20,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="flex flex-col relative">
            {/* Animated section title */}
            <div>
                <motion.div
                    className="sticky top-[50vh] text-center text-4xl md:text-7xl xl:text-8xl xl:text-[7rem] text-primary z-20 mt-32 font-semibold"
                    variants={container}
                    initial="initial"
                    whileInView="animate"
                    exit="exit"
                >
                    <motion.div className="flex flex-col items-center justify-center gap-1">
                        <div className="font-homemade-apple">
                            {"Appetizers".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterAnimation}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </div>
                        <Link href={"/menu?section=appetizer"}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{delay: 0.2, duration: 0.3, ease: "easeOut"}}
                            >
                                <Button className="mt-20 font-semibold" size={"default"}>
                                    View All Appetizers <ArrowRight size={20} />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Spacing for parallax effect */}
                <div className="h-[30rem]"></div>

                {/* Parallax scrolling cards grid */}
                <div className="grid grid-cols-1 gap-48 md:gap-0 md:grid-cols-2 mx-10">
                    {/* Left column */}
                    <div className="flex flex-col items-start gap-48">
                        <motion.div style={{y: y}} className="-z-10">
                            <ParallaxCard menuItem={randomizedAppetizers[0]} />
                        </motion.div>
                        <motion.div style={{y: y}} className="z-50">
                            <ParallaxCard menuItem={randomizedAppetizers[1]} />
                        </motion.div>
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col items-end gap-48 mt-48 md:mt-0">
                        <motion.div style={{y: y2}} className="z-50">
                            <ParallaxCard menuItem={randomizedAppetizers[2]} />
                        </motion.div>
                        <motion.div style={{y: y2}} className="-z-10">
                            <ParallaxCard menuItem={randomizedAppetizers[3]} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom spacing for parallax effect */}
            <div className="h-[6rem]"></div>

            <div>
                <motion.div
                    className="sticky top-[50vh] text-center text-4xl md:text-7xl xl:text-8xl xl:text-[7rem] text-primary z-20 mt-32 font-semibold"
                    variants={container}
                    initial="initial"
                    whileInView="animate"
                    exit="exit"
                >
                    <motion.div className="flex flex-col items-center justify-center gap-1">
                        <div className="font-homemade-apple">
                            {"Sides".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterAnimation}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </div>
                        <Link href={"/menu?section=side"}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{delay: 0.2, duration: 0.3, ease: "easeOut"}}
                            >
                                <Button className="mt-20 font-semibold" size={"default"}>
                                    View All Sides <ArrowRight size={20} />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Spacing for parallax effect */}
                <div className="h-[30rem]"></div>

                {/* Parallax scrolling cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-48 md:gap-0 mx-10">
                    {/* Left column */}
                    <div className="flex flex-col items-start gap-48">
                        <motion.div style={{y: y}} className="-z-10">
                            <ParallaxCard menuItem={randomizedSides[0]} />
                        </motion.div>
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col items-end gap-48 mt-48 md:mt-0">
                        <motion.div style={{y: y2}} className="z-50">
                            <ParallaxCard menuItem={randomizedSides[1]} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom spacing for parallax effect */}
            <div className="h-[6rem]"></div>

            <div>
                <motion.div
                    className="sticky top-[50vh] text-center text-4xl md:text-7xl xl:text-8xl xl:text-[7rem] text-primary z-20 mt-32 font-semibold"
                    variants={container}
                    initial="initial"
                    whileInView="animate"
                    exit="exit"
                >
                    <motion.div className="flex flex-col items-center justify-center gap-1">
                        <div className="font-homemade-apple">
                            {"Entrees".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterAnimation}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </div>
                        <Link href={"/menu?section=entree"}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{delay: 0.2, duration: 0.3, ease: "easeOut"}}
                            >
                                <Button className="mt-20 font-semibold" size={"default"}>
                                    View All Entrees <ArrowRight size={20} />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Spacing for parallax effect */}
                <div className="h-[30rem]"></div>

                {/* Parallax scrolling cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-48 md:gap-0 mx-10">
                    {/* Left column */}
                    <div className="flex flex-col items-start gap-48">
                        <motion.div style={{y: y}} className="-z-10">
                            <ParallaxCard menuItem={randomizedEntrees[0]} />
                        </motion.div>
                        <motion.div style={{y: y}} className="z-50">
                            <ParallaxCard menuItem={randomizedEntrees[1]} />
                        </motion.div>
                        <motion.div style={{y: y}} className="-z-10">
                            <ParallaxCard menuItem={randomizedEntrees[4]} />
                        </motion.div>
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col items-end gap-48 mt-48 md:mt-0">
                        <motion.div style={{y: y2}} className="z-50">
                            <ParallaxCard menuItem={randomizedEntrees[2]} />
                        </motion.div>
                        <motion.div style={{y: y2}} className="-z-10">
                            <ParallaxCard menuItem={randomizedEntrees[3]} />
                        </motion.div>
                        <motion.div style={{y: y2}} className="z-50">
                            <ParallaxCard menuItem={randomizedEntrees[5]} />
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="h-[6rem]"></div>

            <div>
                <motion.div
                    className="sticky top-[50vh] text-center text-4xl md:text-7xl xl:text-8xl xl:text-[7rem] text-primary z-20 mt-32 font-semibold"
                    variants={container}
                    initial="initial"
                    whileInView="animate"
                    exit="exit"
                >
                    <motion.div className="flex flex-col items-center justify-center gap-1">
                        <div className="font-homemade-apple">
                            {"Desserts".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterAnimation}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </div>
                        <Link href={"/menu?section=entree"}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{delay: 0.2, duration: 0.3, ease: "easeOut"}}
                            >
                                <Button className="mt-20 font-semibold" size={"default"}>
                                    View All Desserts <ArrowRight size={20} />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Spacing for parallax effect */}
                <div className="h-[30rem]"></div>

                {/* Parallax scrolling cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-48 md:gap-0 mx-10">
                    {/* Left column */}
                    <div className="flex flex-col items-start gap-48">
                        <motion.div style={{y: y}} className="-z-10">
                            <ParallaxCard menuItem={randomizedDesserts[0]} />
                        </motion.div>
                        <motion.div style={{y: y}} className="z-50">
                            <ParallaxCard menuItem={randomizedDesserts[1]} />
                        </motion.div>
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col items-end gap-48 mt-48 md:mt-0">
                        <motion.div style={{y: y2}} className="z-50">
                            <ParallaxCard menuItem={randomizedDesserts[2]} />
                        </motion.div>
                        <motion.div style={{y: y2}} className="-z-10">
                            <ParallaxCard menuItem={randomizedDesserts[3]} />
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="h-[60rem]"></div>
        </div>
    );
};

// Menu item preview card with image and details
const ParallaxCard = ({menuItem}: {menuItem: MenuItem}): React.JSX.Element => {
    if (!menuItem) {
        return <></>;
    }
    const sanitizeUrl = (url: string): string => url.replace(/([^:]\/)\/+/g, "$1");
    const imageUrl = menuItem.image_url ? sanitizeUrl(menuItem.image_url) : "";

    return (
        <>
            {/* Card container with image */}
            <div className="h-[36rem] w-[15rem] lg:w-[20rem] xl:w-[32rem] overflow-hidden border-2 border-primary relative flex flex-col justify-center rounded-2xl bg-[repeating-linear-gradient(45deg,#15803d_0px,#15803d_2px,transparent_2px,transparent_14px)]">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        width={500}
                        height={500}
                        alt="menu item"
                        className=" w-[10rem] md:w-[26rem] mx-auto h-fit"
                    />
                )}
            </div>

            {/* Card title and CTA */}
            <div className="mt-4 flex justify-between items-center relative">
                <div className="text-2xl text-primary font-semibold">{menuItem.name}</div>
                <div className="font-bold text-lg text-primary rounded-full border px-6 py-2">
                    ${menuItem.price.toFixed(2)}
                </div>
            </div>
        </>
    );
};

export default MenuParallax;
