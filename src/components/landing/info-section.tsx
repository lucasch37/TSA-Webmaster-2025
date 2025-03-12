"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Button} from "../ui/button";
import {Lightbulb} from "lucide-react";
import { motion } from "motion/react";

// Restaurant info section component
const InfoSection = (): React.JSX.Element => {
    return (
        <div className="md:absolute md:centered w-full px-4 sm:px-6 md:px-10 my-16 md:my-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                {/* Left side image with decorative dot */}
                <div className="flex justify-center md:justify-start">
                    <div className="relative w-full max-w-[320px] md:max-w-none">
                        <Image
                            src={"/large-dot.svg"}
                            height={100}
                            width={100}
                            className="w-full max-w-[35rem] 2xl:w-[40rem] -rotate-[55deg] shrink-0"
                            alt="dot"
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

                {/* Right side content */}
                <div className="flex flex-col">
                    {/* Heading */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80 }}
                        className="text-primary font-bold text-3xl md:text-4xl 2xl:text-5xl 2xl:text-[3.25rem] 2xl:leading-tight leading-tight"
                    >
                        A TASTE OF LIFE IN EACH AND EVERY SERVING
                    </motion.div>

                    {/* Mission statement */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80 }}
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
                            nutrients. Whether you are a lifelong vegan or simply looking
                            to explore new culinary horizons, our menu offers something
                            for everyone.
                        </div>
                    </motion.div>

                    {/* CTA button */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{ once: true }}
                        transition={{type: "spring", stiffness: 80}}
                        className="mt-8 mb-2 md:mt-16"
                    >
                        <Link href={"/about"}>
                            <Button size={"lg"}>
                                <Lightbulb />
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
