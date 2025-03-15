"use client";

import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";
import {motion, AnimatePresence} from "motion/react";
import Image from "next/image";
import {useEffect, useState} from "react";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
    logo: string;
};
export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };
    return (
        <div className="mx-auto antialiased font-sans">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                    <div className="relative h-96 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.name}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index)
                                            ? 999
                                            : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <Image
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl shadow-xl object-cover object-center"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex justify-between flex-col p-8 border-2 rounded-xl bg-background/40 shadow-md">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="flex md:flex-row flex-col gap-5 items-center">
                            <Image
                                src={testimonials[active].logo}
                                alt={testimonials[active].name}
                                width={500}
                                height={500}
                                draggable={false}
                                className="w-[140px] rounded-lg object-contain m-1"
                            />
                            <h3 className="text-4xl uppercase font-bold text-primary">
                                {testimonials[active].name}
                            </h3>
                        </div>
                        <p className="text-lg italic text-primary mt-8">
                            {testimonials[active].designation}
                        </p>
                        <motion.p className="text-base text-primary mt-4 font-medium">
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="h-7 w-7 rounded-full bg-primary flex items-center justify-center group/button"
                        >
                            <IconArrowLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-7 w-7 rounded-full bg-primary flex items-center justify-center group/button"
                        >
                            <IconArrowRight className="h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
