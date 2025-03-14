"use client";

import React from "react";
import {motion} from "motion/react";
import Image from "next/image";

export default function Testimonials(): React.JSX.Element {
    return (
        <div className="py-20 border-t border-b my-12">
            <div className="container mx-auto">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-primary mb-12 text-center">
                        WHAT PEOPLE ARE SAYING
                    </h2>
                    <p className="mb-16 text-lg text-center max-w-3xl mx-auto">
                        Our community has embraced our mission to make sustainable dining
                        delicious and accessible. Here's what some of our customers have
                        to say:
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <motion.div
                            className="p-6 rounded-lg border-2 shadow-sm"
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mr-3">
                                    <span className="text-green-700 text-xl">😊</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Sarah Johnson</h4>
                                    <p className="text-sm text-gray-500">Local Teacher</p>
                                </div>
                            </div>
                            <p className="italic text-gray-700">
                                "The recipes have transformed how my family eats. We've
                                cut our meat consumption by 70% and my kids actually love
                                the plant-based meals we've learned to make!"
                            </p>
                            <div className="mt-4 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-500">
                                        ★
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="p-6 rounded-lg border-2 shadow-sm"
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mr-3">
                                    <span className="text-green-700 text-xl">👨‍💼</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Michael Chen</h4>
                                    <p className="text-sm text-gray-500">
                                        Tech Executive
                                    </p>
                                </div>
                            </div>
                            <p className="italic text-gray-700">
                                "As someone who was skeptical about plant-based foods,
                                Sprout & About completely changed my perspective. Their
                                Cauliflower Steak is better than any Cow Steak I've had!"
                            </p>
                            <div className="mt-4 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-500">
                                        ★
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="p-6 rounded-lg border-2 shadow-sm"
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.4}}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mr-3">
                                    <span className="text-green-700 text-xl">👩‍⚕️</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Dr. Lisa Rodriguez</h4>
                                    <p className="text-sm text-gray-500">Nutritionist</p>
                                </div>
                            </div>
                            <p className="italic text-gray-700">
                                "I recommend Sprout & About to all my patients looking to
                                improve their diet. Their focus on nutrition alongside
                                sustainability makes them truly special in Spokane."
                            </p>
                            <div className="mt-4 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-500">
                                        ★
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.8}}
                        className="text-center"
                    >
                        <h3 className="text-2xl font-semibold text-primary mb-10">
                            FEATURED ON
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
                            <motion.div
                                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                whileHover={{scale: 1.05}}
                            >
                                <Image
                                    src="/about/logos/NewYorkTimes.svg"
                                    alt="New York Times Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                            <motion.div
                                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                whileHover={{scale: 1.05}}
                            >
                                <Image
                                    src="/about/logos/Forbes_logo.svg"
                                    alt="Forbes Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                            <motion.div
                                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                whileHover={{scale: 1.05}}
                            >
                                <Image
                                    src="/about/logos/The_Guardian_2018.svg"
                                    alt="The Guardian Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                            <motion.div
                                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                whileHover={{scale: 1.05}}
                            >
                                <Image
                                    src="/about/logos/Los_Angeles_Times_logo.svg"
                                    alt="Los Angeles Times Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                            <motion.div
                                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                whileHover={{scale: 1.05}}
                            >
                                <Image
                                    src="/about/logos/Today_2023.svg"
                                    alt="Today Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                            <motion.div
                                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                whileHover={{scale: 1.05}}
                            >
                                <Image
                                    src="/about/logos/The_Logo_of_The_Washington_Post_Newspaper.svg"
                                    alt="Washington Post Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                        </div>

                        <div className="mt-10 max-w-2xl mx-auto">
                            <blockquote className="text-xl text-center italic text-gray-700 mb-4">
                                "Sprout & About isn't just serving food; they're
                                pioneering a movement toward sustainable dining in the
                                Inland Northwest."
                            </blockquote>
                            <p className="font-semibold text-primary">
                                — The Spokane Foods Award, 2025 Food Innovation Award
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
