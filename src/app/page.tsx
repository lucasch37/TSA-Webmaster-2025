"use client";

import Navbar from "@/components/navbar";
import {Marquee} from "@/components/ui/marquee";
import {MenuSquare} from "lucide-react";
import {motion} from "framer-motion";

export default function Home(): JSX.Element {
    return (
        <div className="flex flex-col">
            <Navbar/>
            <div>
                <div className="container grid grid-cols-5 mt-2">
                    <div className="flex flex-col justify-center col-span-3">
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{type: "spring", stiffness: 80}}
                            className="title pb-[10.5rem] text-8xl 2xl:text-[5.5rem] lg:text-[4.5rem] font-bold leading-tight text-green-600 tracking-tighter">
                            {
                                [...Array(2)].map((_, i) =>
                                    <div className="title-content" key={i}>
                                        <div className="flex gap-8 items-center">
                                            NATURE'S{" "}
                                            <img
                                                src="/small-dot.svg"
                                                alt=""
                                                className="rotate-45 rounded-full overflow-hidden w-[5rem] h-[5rem] pointer-events-none"
                                            />
                                        </div>
                                        {" "}
                                        FINEST FLAVORS
                                    </div>
                                )
                            }
                        </motion.div>
                        <motion.div initial={{opacity: 0, scale: 0.9}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{type: "spring", stiffness: 80, delay: 0.15}}
                                    className="text-primary text-lg font-medium max-w-lg mt-4">
                            Experience Asian cuisine with our beautifully crafted
                            restaurant website. From mouth-watering menus to photo
                            galleries, we show the essence of Asian flavors.
                        </motion.div>
                        <motion.div initial={{opacity: 0, scale: 0.9}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{type: "spring", stiffness: 80, delay: 0.25}}
                                    className="mt-8">
                            <button
                                className="bg-primary hover:bg-green-800 transition ease-in-out duraiton-300 text-white py-4 px-8 rounded-full flex gap-3 items-center">
                                <MenuSquare/>
                                Explore Our Menu
                            </button>
                        </motion.div>
                    </div>
                    <motion.div initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: "spring", stiffness: 80}}
                                className="relative h-fit -ml-32 col-span-2">
                        <img src="/hero-img.png" alt="" className="w-full"/>
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
                <motion.div initial={{opacity: 0, x: 40}}
                            animate={{opacity: 1, x: 0}}
                            transition={{ease: "linear", duration: 0.5, delay: 0.35}}
                            className="w-full mt-8">
                    <div className="border-y border-primary text-primary text-lg py-2">
                        <Marquee className="[--duration:5s]">
                            <div>100% PLANT-BASED</div>
                            <div>🌿</div>
                        </Marquee>
                    </div>
                </motion.div>
                <div className="h-48"></div>
            </div>
        </div>
    );
}
