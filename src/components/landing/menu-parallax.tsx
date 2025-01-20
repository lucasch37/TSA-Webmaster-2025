"use client";
import {motion, MotionValue, useScroll, useTransform} from "motion/react";
import Image from "next/image";
import React from "react";

const MenuParallax = (): React.JSX.Element => {
    function useParallax(
        value: MotionValue<number>,
        distance: number,
    ): MotionValue<number> {
        return useTransform(value, [0, 1], [-distance, distance]);
    }

    const ref = React.useRef(null);
    const {scrollYProgress} = useScroll({target: ref});
    const y = useParallax(scrollYProgress, 300);
    const y2 = useParallax(scrollYProgress, 800);

    const container = {
        initial: {opacity: 0},
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
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
        <div ref={ref} className="flex flex-col relative">
            <motion.div
                className="sticky top-[50vh] text-center text-8xl text-primary z-20 mt-48 font-semibold font-homemade-apple"
                variants={container}
                initial="initial"
                whileInView="animate"
                exit="exit"
            >
                <motion.div className="flex justify-center gap-1">
                    {"Popular Dishes".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterAnimation}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>

            <div className="h-[80rem]"></div>

            <div className="grid grid-cols-2">
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

            <div className="h-[80rem]"></div>
        </div>
    );
};

const ParallaxCard = (): React.JSX.Element => {
    return (
        <div className="h-fit flex flex-col justify-center">
            <Image
                src={"/landing/eggplant-parmesan.jpg"}
                width={500}
                height={500}
                alt={"Jalapeno poppers"}
                className="w-[30rem] mx-auto h-fit border-4 border-primary"
            />
            <div className="mt-4 font-medium text-2xl">Eggplant Parmesan</div>
        </div>
    );
};

export default MenuParallax;
