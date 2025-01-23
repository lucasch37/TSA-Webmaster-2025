"use client";
import {motion, MotionValue, useScroll, useTransform} from "motion/react";
import Image from "next/image";
import React from "react";
import {Button} from "../ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

// Parallax scrolling menu preview component
const MenuParallax = (): React.JSX.Element => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 mx-10">
                {/* Left column */}
                <div className="flex flex-col items-start gap-48">
                    <motion.div style={{y: y}} className="-z-10">
                        <ParallaxCard />
                    </motion.div>
                    <motion.div style={{y: y}} className="z-50">
                        <ParallaxCard />
                    </motion.div>
                    <motion.div style={{y: y}} className="-z-10">
                        <ParallaxCard />
                    </motion.div>
                    <motion.div style={{y: y}} className="z-50">
                        <ParallaxCard />
                    </motion.div>
                </div>
                {/* Right column */}
                <div className="flex flex-col items-end gap-48">
                    <motion.div style={{y: y2}} className="z-50">
                        <ParallaxCard />
                    </motion.div>
                    <motion.div style={{y: y2}} className="-z-10">
                        <ParallaxCard />
                    </motion.div>
                    <motion.div style={{y: y2}} className="z-50">
                        <ParallaxCard />
                    </motion.div>
                    <motion.div style={{y: y2}} className="-z-10">
                        <ParallaxCard />
                    </motion.div>
                </div>
            </div>

            {/* Bottom spacing for parallax effect */}
            <div className="h-[80rem]"></div>
        </div>
    );
};

// Menu item preview card with image and details
const ParallaxCard = (): React.JSX.Element => {
    return (
        <>
            {/* Card container with image */}
            <div className="h-[36rem] w-[15rem] lg:w-[20rem] xl:w-[32rem] overflow-hidden border-2 border-primary relative flex flex-col justify-center rounded-2xl">
                <Image
                    src={"/landing/jalapeno-poppers.png"}
                    width={500}
                    height={500}
                    alt={"Jalapeno poppers"}
                    className="w-[26rem] mx-auto h-fit"
                />
                {/* Decorative background pattern */}
                <div className="absolute inset-0 bg-[url('/lines.svg')] w-screen h-screen centered scale-[350%] -z-10 rotate-45"></div>
            </div>

            {/* Card title and CTA */}
            <div className="mt-4 flex justify-between items-center relative">
                <div className="text-2xl text-primary font-semibold">
                    Jalapeno Poppers
                </div>
                <Link href={"/menu"}>
                    <Button variant={"outline"} className="relative hidden lg:flex">
                        Order Now <ArrowRight size={20} />
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default MenuParallax;
