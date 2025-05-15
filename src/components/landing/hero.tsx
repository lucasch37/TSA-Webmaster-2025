"use client";

import React from "react";
import {motion} from "motion/react";
import Link from "next/link";
import {Button} from "../ui/button";
import {MenuSquare} from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// Hero section component for landing page
const Hero = (): React.JSX.Element => {
    return (
        <div>
            <div className="container grid grid-cols-1 md:grid-cols-5 mt-2 md:centered md:absolute">
                {/* Left side content */}
                <div className="flex flex-col justify-center md:col-span-3 md:items-start items-center">
                    {/* Animated title */}
                    {/* <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{type: "spring", stiffness: 80}}
                        className={`title font-bold leading-tight text-green-600 tracking-tighter
                                2xl:pb-[13rem] xl:pb-[10.5rem] lg:pb-[9rem] md:pb-[7rem] pb-[11rem]
                                text-8xl 2xl:text-[5.5rem] xl:text-[4.5rem] lg:text-[4rem] md:text-[3rem] text-[3rem] select-text
                                `}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div className="title-content" key={i}>
                                <div className="flex gap-4 md:gap-8 items-center">
                                    NATURE'S{" "}
                                    <img
                                        src="/small-dot.svg"
                                        alt=""
                                        className="rotate-45 rounded-full overflow-hidden w-[3rem] lg:w-[5rem] lg:h-[5rem] pointer-events-none"
                                    />
                                </div>{" "}
                                FINEST
                                <br className="flex md:hidden" /> FLAVORS
                            </div>
                        ))}
                    </motion.div> */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{type: "spring", stiffness: 80}}
                        className={`title font-bold leading-tight text-green-700 tracking-tighter
                                    text-8xl 2xl:text-[5.5rem] xl:text-[4.5rem] text-[4rem]`}
                    >
                        {/* TODO: Add title-content animation here */}
                        <div key={0}>
                            <div className="flex gap-4 md:gap-8 items-center items-center text-center">
                                NATURE'S{" "}
                                <img
                                    src="/small-dot.svg"
                                    alt=""
                                    className="rotate-45 rounded-full overflow-hidden w-[3rem] lg:w-[5rem] lg:h-[5rem] pointer-events-none hidden md:block"
                                />
                            </div>{" "}
                            <p>FINEST</p>
                            <p>FLAVORS</p>
                        </div>
                    </motion.div>

                    {/* Description text */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{type: "spring", stiffness: 80, delay: 0.15}}
                        className="text-primary lg:text-base xl:text-lg md:text-sm text-sm max-md:text-center font-medium lg:max-w-lg max-w-xs mt-6"
                    >
                        Indulge in a culinary journey that celebrates sustainability and
                        health, without compromising on taste. Join us for a dining
                        experience that nourishes both body and soul.
                    </motion.div>

                    {/* CTA button */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{type: "spring", stiffness: 80, delay: 0.25}}
                        className="mt-8"
                    >
                        <Link href={"/menu"} className="hidden md:flex">
                            <Button size={"lg"}>
                                <MenuSquare />
                                Explore Our Menu
                            </Button>
                        </Link>
                        <Link href={"/menu"} className="flex md:hidden">
                            <Button size={"default"}>
                                <MenuSquare />
                                Explore Our Menu
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right side image with decorative leaves */}
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{type: "spring", stiffness: 80}}
                    className="relative h-fit xl:-ml-32 md:-ml-12 md:col-span-2 md:my-0 mt-12 flex items-center justify-center"
                >
                    {/* Main hero image */}
                    <Image
                        height={800}
                        width={800}
                        src="/landing/hero-img.png"
                        alt=""
                        className="w-[22rem] max-w-[70vh] object-contain md:w-full mx-auto md:mx-0"
                        priority
                    />
                    {/* Decorative leaves */}
                    <Image
                        src="/leaf.png"
                        width={400}
                        height={400}
                        alt=""
                        className="absolute top-2 right-2 md:top-4 md:right-12 h-12 w-fit xl:h-20 xl:w-20 -rotate-90"
                    />
                    <Image
                        src="/leaf2.png"
                        width={400}
                        height={400}
                        alt=""
                        className="absolute bottom-2 right-2 md:bottom-4 md:right-12 h-12 xl:h-24 w-fit rotate-[195deg]"
                    />
                    <Image
                        src="/leaf.png"
                        width={400}
                        height={400}
                        alt=""
                        className="absolute top-2 left-2 md:top-4 md:left-12 h-12 w-fit xl:h-20 xl:w-20 rotate-[190deg]"
                    />
                </motion.div>
            </div>

            {/* Vegetarian banner */}
            <motion.div
                initial={{opacity: 0, x: 40}}
                animate={{opacity: 1, x: 0}}
                transition={{ease: "linear", duration: 0.5, delay: 0.35}}
                className="w-full md:absolute md:bottom-12 mt-8 md:mt-0"
            >
                <div className="border-y border-primary text-primary text-lg py-2 bg-background/40 shadow-md">
                    <Marquee autoFill>
                        <div className="font-medium px-4">100% VEGETARIAN</div>
                        <div>🌿</div>
                    </Marquee>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
