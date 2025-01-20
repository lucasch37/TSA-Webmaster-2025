"use client";

import MenuParallax from "@/components/landing/menu-parallax";
import Navbar from "@/components/navbar";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {Lightbulb, MenuSquare} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import React from "react";

export default function Home(): React.JSX.Element {
    return (
        <div className="flex flex-col">
            <div className="h-screen relative">
                <Navbar />
                <div>
                    <div className="container grid grid-cols-5 mt-2 centered absolute">
                        <div className="flex flex-col justify-center col-span-3">
                            <motion.div
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: "spring", stiffness: 80}}
                                className={`title font-bold leading-tight text-green-600 tracking-tighter
                                2xl:pb-[13rem] pb-[10.5rem] 
                                text-8xl 2xl:text-[5.5rem] text-[4.5rem] select-text
                                `}
                            >
                                {[...Array(2)].map((_, i) => (
                                    <div className="title-content" key={i}>
                                        <div className="flex gap-8 items-center">
                                            NATURE'S{" "}
                                            <img
                                                src="/small-dot.svg"
                                                alt=""
                                                className="rotate-45 rounded-full overflow-hidden w-[5rem] h-[5rem] pointer-events-none"
                                            />
                                        </div>{" "}
                                        FINEST FLAVORS
                                    </div>
                                ))}
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: "spring", stiffness: 80, delay: 0.15}}
                                className="text-primary text-lg font-medium max-w-lg mt-6"
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
                                <Link href={"/menu"}>
                                    <Button size={"lg"}>
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
                            className="relative h-fit xl:-ml-32 -ml-12 col-span-2"
                        >
                            <img src="/landing/hero-img.png" alt="" className="w-full" />
                            <img
                                src="/leaf.png"
                                alt=""
                                className="absolute top-4 right-12 h-20 w-20 -rotate-90"
                            />
                            <img
                                src="/leaf2.png"
                                alt=""
                                className="absolute bottom-4 right-12 h-24 rotate-[195deg]"
                            />
                            <img
                                src="/leaf.png"
                                alt=""
                                className="absolute top-4 left-12 h-20 w-20 rotate-[190deg]"
                            />
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{opacity: 0, x: 40}}
                        animate={{opacity: 1, x: 0}}
                        transition={{ease: "linear", duration: 0.5, delay: 0.35}}
                        className="w-full absolute bottom-12"
                    >
                        <div className="border-y border-primary text-primary text-lg py-2">
                            <Marquee autoFill>
                                <div className="font-medium px-4">100% PLANT-BASED</div>
                                <div>🌿</div>
                            </Marquee>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col container">
                <div className="mt-24">
                    <div className="grid grid-cols-2 gap-12">
                        <div className="flex justify-start">
                            <div className="relative">
                                <img
                                    src={"/large-dot.svg"}
                                    className="w-[40rem] -rotate-[55deg]"
                                />
                                <Image
                                    src={"/landing/jalapeno-poppers.png"}
                                    width={450}
                                    height={450}
                                    alt="Jalapeno poppers"
                                    className="centered absolute"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-primary font-bold text-5xl leading-tight">
                                A TASTE OF LIFE IN EACH AND EVERY SERVING
                            </div>
                            <div className="text-primary text-base font-medium mt-12 max-w-2xl flex flex-col gap-8">
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
                            <Link href={"/about"} className="mt-16">
                                <Button size={"lg"}>
                                    <Lightbulb />
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <MenuParallax />
            </div>
        </div>
    );
}
