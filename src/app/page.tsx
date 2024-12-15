import Navbar from "@/components/navbar";
import {Marquee} from "@/components/ui/marquee";
import {MenuSquare} from "lucide-react";

export default function Home(): JSX.Element {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div>
                <div className="container grid grid-cols-5 mt-2">
                    <div className="flex flex-col justify-center col-span-3">
                        <div className="text-8xl 2xl:text-[5.5rem] lg:text-[4.5rem] font-bold leading-tight text-primary tracking-tighter">
                            <div className="flex gap-8 items-center">
                                NATURE'S{" "}
                                <img
                                    src="/small-dot.svg"
                                    alt=""
                                    className="rotate-45 w-[5rem] h-[5rem] pointer-events-none"
                                />
                            </div>{" "}
                            FINEST FLAVORS
                        </div>
                        <div className="text-primary text-lg font-medium max-w-lg mt-4">
                            Experience Asian cuisine with our beautifully crafted
                            restaurant website. From mouth-watering menus to photo
                            galleries, we show the essence of Asian flavors.
                        </div>
                        <div className="mt-8">
                            <button className="bg-primary text-white py-4 px-8 rounded-full flex gap-3 items-center">
                                <MenuSquare />
                                Explore Our Menu
                            </button>
                        </div>
                    </div>
                    <div className="relative h-fit -ml-32 col-span-2">
                        <img src="/hero-img.png" alt="" className="w-full" />
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
                    </div>
                </div>
                <div className="w-full mt-8">
                    <div className="border-y border-primary text-primary text-lg py-2">
                        <Marquee className="[--duration:5s]">
                            <div>100% PLANT-BASED</div>
                            <div>🌿</div>
                        </Marquee>
                    </div>
                </div>
                <div className="h-48"></div>
            </div>
        </div>
    );
}
