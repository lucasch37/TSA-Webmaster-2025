"use client";

import {IconFenceFilled, IconMapPin2, IconStarFilled} from "@tabler/icons-react";
import {Clock, Lightbulb, Sprout} from "lucide-react";
import {motion} from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Button} from "../ui/button";
import {Farms} from "./farms";
import {Testimonial} from "./testimonial";
const LocationMap = dynamic(() => import("./location-map"), {ssr: false});

// Restaurant info section component
const InfoSection = (): React.JSX.Element => {
    return (
        <div className="md:py-32 w-full my-16 md:my-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-14 md:gap-28 items-center max-w-7xl mx-auto">
                {/* Left side image with decorative dot */}
                <div className="flex justify-center md:justify-start 2xl:-ml-12">
                    <div className="relative w-full max-w-[320px] md:max-w-none flex justify-center">
                        <Image
                            src={"/large-dot.svg"}
                            height={100}
                            width={100}
                            className="w-full max-w-[35rem] 2xl:w-[40rem] -rotate-[55deg] shrink-0"
                            alt="dot"
                        />
                        <Image
                            src={"/landing/bruschetta.png"}
                            width={450}
                            height={450}
                            alt="Jalapeno poppers"
                            className="centered absolute w-[14rem] lg:w-[20rem] 2xl:w-[25rem]"
                        />
                    </div>
                </div>

                {/* Right side content */}
                <div className="flex flex-col 2xl:-ml-12">
                    {/* Heading */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 80, delay: 0.1}}
                        className="text-primary font-bold text-3xl md:text-4xl 2xl:text-5xl 2xl:text-[3rem] 2xl:leading-tight leading-tight"
                    >
                        A TASTE OF LIFE IN EACH AND EVERY SERVING
                    </motion.div>

                    {/* Mission statement */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 80, delay: 0.2}}
                        className="text-primary text-sm md:text-sm 2xl:text-base font-medium mt-6 md:mt-12 max-w-2xl flex flex-col gap-8"
                    >
                        <div>
                            At our restaurant, we believe that food is more than just
                            sustenance; it is an experience that brings people together,
                            nourishes the body, and delights the senses. Our commitment to
                            sustainability and health is at the core of everything we do.
                            From the moment you step through our doors, you will be
                            greeted with the warm, inviting aroma of fresh, plant-based
                            ingredients, carefully selected to create dishes that are as
                            nutritious as they are delicious.
                        </div>
                        <div>
                            Our chefs are passionate about crafting meals that not only
                            taste incredible but also support your well-being. We source
                            our ingredients from local, organic farms whenever possible,
                            ensuring that each bite is packed with the highest quality
                            nutrients. Whether you are a lifelong vegetarian or simply
                            looking to explore new culinary horizons, our menu offers
                            something for everyone.
                        </div>
                    </motion.div>

                    {/* CTA button */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 80}}
                        className="mt-8 mb-2 md:mt-16"
                    >
                        <Link href={"/about"} className="ml-2 md:ml-0">
                            <Button size={"lg"}>
                                <Lightbulb />
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-32 py-24 border-t-2 items-center">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.1}}
                    className="flex justify-center md:flex-row flex-col items-center gap-6"
                >
                    <div className="p-6 rounded-full border-2 text-primary">
                        <IconStarFilled size={50} />
                    </div>
                    <div>
                        <div className="font-bold text-4xl md:text-5xl text-primary text-center md:text-left">
                            TESTIMONIALS
                        </div>
                        <div className="mt-4 text-primary max-w-lg text-lg text-center md:text-left">
                            Our community has embraced our mission to make sustainable
                            dining delicious and accessible.
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, x: 50}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.3}}
                    className="mt-16 md:mt-0"
                >
                    <Testimonial />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 py-24 border-t-2 items-center">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70}}
                    className="flex items-center gap-6 justify-center md:flex-row flex-col"
                >
                    <div className="p-6 rounded-full border-2 text-primary">
                        <IconMapPin2 size={50} />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-5xl uppercase font-bold text-primary text-center md:text-left">
                            Our Location
                        </div>
                        <div className="mt-4 text-primary text-xl text-center md:text-left">
                            334 W Spokane Falls Blvd Spokane, WA 99201
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.2}}
                    className="mt-12"
                >
                    <LocationMap />
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.2}}
                    className="mt-12 flex flex-col items-center text-center"
                >
                    <div className="flex items-center justify-center gap-2.5 mb-5">
                        <Clock size={30} className="text-primary" />
                        <h3 className="text-3xl font-bold text-primary">Our Hours</h3>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-6 text-lg">
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{type: "spring", stiffness: 80, delay: 0.2}}
                            className="p-3 px-8 border-2 rounded-xl bg-background/40 shadow-md"
                        >
                            <span className="font-semibold text-primary text-lg">
                                Monday - Friday
                            </span>
                            <p className="mt-2 text-sm text-primary">
                                11:00 AM - 9:00 PM
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{type: "spring", stiffness: 80, delay: 0.2}}
                            className="p-3 px-8 border-2 rounded-xl bg-background/40 shadow-md"
                        >
                            <span className="font-semibold text-primary text-lg">
                                Saturday - Sunday
                            </span>
                            <p className="mt-2 text-sm text-primary">
                                10:00 AM - 9:00 PM
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="pt-24 grid grid-cols-1 items-center border-t-2">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70}}
                    className="flex items-center gap-6 justify-center md:flex-row flex-col"
                >
                    <div className="p-6 rounded-full border-2 text-primary">
                        <IconFenceFilled size={50} />
                    </div>
                    <div>
                        <div className="font-bold text-5xl text-primary text-center md:text-left">
                            PARTNER FARMS
                        </div>
                        <div className="mt-3 text-primary max-w-lg text-lg text-center md:text-left">
                            We work with local farmers to source the freshest, most
                            sustainable ingredients for our dishes.
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.2}}
                    className="mt-24"
                >
                    <Farms />
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.2}}
                    className="mt-24 flex justify-center"
                >
                    <Link href={"/about?section=farm-table"}>
                        <Button size={"lg"} className="hidden md:flex">
                            Learn more about our process <Sprout />
                        </Button>
                    </Link>
                    <Button className="flex md:hidden mb-4">
                        Learn more about our process <Sprout />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default InfoSection;
