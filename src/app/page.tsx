"use client";

import MenuParallax from "@/components/landing/menu-parallax";
import Navbar from "@/components/navbar";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {ArrowBigDown, Lightbulb, MenuSquare} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Home(): React.JSX.Element {
    return (
        <div className="flex flex-col">
            <div className="md:h-screen relative">
                <Navbar />
                <div>
                    <div className="container grid grid-cols-1 md:grid-cols-5 mt-2 md:centered md:absolute">
                        <div className="flex flex-col justify-center md:col-span-3">
                            <motion.div
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
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: "spring", stiffness: 80, delay: 0.15}}
                                className="text-primary lg:text-base xl:text-lg md:text-sm text-sm font-medium lg:max-w-lg max-w-xs mt-6"
                            >
                                Indulge in a culinary journey that celebrates
                                sustainability and health, without compromising on taste.
                                Join us for an dining experience that nourishes both body
                                and soul.
                            </motion.div>
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
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{type: "spring", stiffness: 80}}
                            className="relative h-fit xl:-ml-32 md:-ml-12 md:col-span-2 md:my-0 mt-12"
                        >
                            <Image
                                height={1000}
                                width={1000}
                                src="/landing/hero-img.png"
                                alt=""
                                className="w-[22rem] md:w-full mx-auto md:mx-0"
                            />
                            <img
                                src="/leaf.png"
                                alt=""
                                className="absolute top-2 right-2 md:top-4 md:right-12 h-12 xl:h-20 xl:w-20 -rotate-90"
                            />
                            <img
                                src="/leaf2.png"
                                alt=""
                                className="absolute bottom-2 right-2 md:bottom-4 md:right-12 h-12 xl:h-24 rotate-[195deg]"
                            />
                            <img
                                src="/leaf.png"
                                alt=""
                                className="absolute top-2 left-2 md:top-4 md:left-12 h-12 xl:h-20 xl:w-20 rotate-[190deg]"
                            />
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{opacity: 0, x: 40}}
                        animate={{opacity: 1, x: 0}}
                        transition={{ease: "linear", duration: 0.5, delay: 0.35}}
                        className="w-full md:absolute md:bottom-12 mt-8 md:mt-0"
                    >
                        <div className="border-y border-primary text-primary text-lg py-2">
                            <Marquee autoFill>
                                <div className="font-medium px-4">100% VEGETARIAN</div>
                                <div>🌿</div>
                            </Marquee>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col container md:h-screen relative">
                <div className="md:absolute md:centered w-full md:px-10 my-16 md:my-0">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-start">
                            <div className="relative">
                                <img
                                    src={"/large-dot.svg"}
                                    className="w-[35rem] 2xl:w-[40rem] -rotate-[55deg] shrink-0"
                                />
                                <Image
                                    src={"/landing/jalapeno-poppers.png"}
                                    width={450}
                                    height={450}
                                    alt="Jalapeno poppers"
                                    className="centered absolute w-[14rem] lg:w-[20rem] 2xl:w-[25rem]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-primary font-bold text-4xl 2xl:text-5xl 2xl:text-[3.25rem] 2xl:leading-tight leading-tight">
                                A TASTE OF LIFE IN EACH AND EVERY SERVING
                            </div>
                            <div className="text-primary text-sm md:text-sm 2xl:text-base font-medium mt-6 md:mt-12 max-w-2xl flex flex-col gap-8">
                                <div>
                                    At our restaurant, we believe that food is more than
                                    just sustenance; it is an experience that brings
                                    people together, nourishes the body, and delights the
                                    senses. Our commitment to sustainability and health is
                                    at the core of everything we do. From the moment you
                                    step through our doors, you will be greeted with the
                                    warm, inviting aroma of fresh, plant-based
                                    ingredients, carefully selected to create dishes that
                                    are as nutritious as they are delicious.
                                </div>
                                <div>
                                    Our chefs are passionate about crafting meals that not
                                    only taste incredible but also support your
                                    well-being. We source our ingredients from local,
                                    organic farms whenever possible, ensuring that each
                                    bite is packed with the highest quality nutrients.
                                    Whether you are a lifelong vegan or simply looking to
                                    explore new culinary horizons, our menu offers
                                    something for everyone.
                                </div>
                            </div>
                            <Link href={"/about"} className="mt-8 md:mt-16">
                                <Button size={"lg"}>
                                    <Lightbulb />
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
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
