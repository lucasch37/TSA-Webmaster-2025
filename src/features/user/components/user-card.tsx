import {Tilt} from "@/components/ui/tilt";
import React from "react";

export function UserCard(): React.JSX.Element {
    return (
        <div className="w-[280px] relative ">
            <div className="absolute inset-0 bg-[#40c9a2]/20 rounded-xl blur-2xl transform translate-y-8 scale-95"></div>
            <div className="absolute inset-0 bg-[#34d399]/15 rounded-xl blur-3xl transform translate-y-10 scale-90"></div>
            <Tilt rotationFactor={8} isRevese>
                <div
                    style={{
                        borderRadius: "12px",
                    }}
                    className="flex w-full flex-col overflow-hidden bg-gradient-to-br from-[#e8f5f3] via-[#f0f9f7] to-[#e1f1ee] shadow-sm relative"
                >
                    <div className="p-2 m-2">
                        <div className="relative pb-4">
                            <svg
                                className="w-64 h-64"
                                viewBox="0 0 500 454.88"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient
                                        id="leaf-gradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0%" style={{stopColor: "#40c9a2"}}>
                                            <animate
                                                attributeName="stop-color"
                                                values="#40c9a2; #2dd4bf; #34d399; #40c9a2"
                                                dur="6s"
                                                repeatCount="indefinite"
                                            />
                                        </stop>
                                        <stop offset="50%" style={{stopColor: "#2dd4bf"}}>
                                            <animate
                                                attributeName="stop-color"
                                                values="#2dd4bf; #34d399; #3cbbb4; #2dd4bf"
                                                dur="6s"
                                                repeatCount="indefinite"
                                            />
                                        </stop>
                                        <stop
                                            offset="100%"
                                            style={{stopColor: "#34d399"}}
                                        >
                                            <animate
                                                attributeName="stop-color"
                                                values="#34d399; #3cbbb4; #40c9a2; #34d399"
                                                dur="6s"
                                                repeatCount="indefinite"
                                            />
                                        </stop>
                                    </linearGradient>
                                </defs>
                                <path
                                    fill="url(#leaf-gradient)"
                                    d="M497.54,181.48c-.14-49.5.19-108.94-.08-156.88-.21-10.52-.84-16.85-4.18-20.23l-.06-.06c-3.31-3.36-9.52-4.01-19.83-4.22-8.18-.12-16.25-.08-24.61-.09-51.27.05-120.49-.04-172.29,0-17.43-.04-31.12.41-48.37,2.99C119.44,18.06,29.11,104.89,6.95,211.92c-5.86,28.3-4.27,51.11-4.5,80.72.18,42.77-.25,96.16.11,136.64.26,10.81,1.05,17.4,4.62,20.92,3.89,3.94,11.51,4.42,24.18,4.57,41.81.2,102.44-.06,147.7.04,38.89-.2,70.03,1.65,107.49-5.96,95.37-19.82,172.12-95.37,202.35-186.81,9.67-27.12,8.7-51.49,8.65-80.56Z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-[#2d5242] text-2xl leading-snug font-bold">
                            Ali Macky
                        </h1>
                        <p className="text-[#5c8b76] pb-10 font-mono text-sm">
                            GOLD MEMBER
                        </p>
                        <div className="flex justify-between flex-row items-center gap-2">
                            <div className="flex flex-row border border-[#a7d8bc] bg-white/50 rounded px-2 text-xs">
                                <p className="text-[#2d5242]">SPRT</p>
                                <div className="w-4 mx-2 h-4 border-x border-[#a7d8bc] bg-[repeating-linear-gradient(45deg,#a7d8bc_0px,#a7d8bc_1px,transparent_1px,transparent_3px)]"></div>
                                <p className="text-[#2d5242]">Aug 7, 2023</p>
                            </div>
                            <div className="flex text-[10px] font-homemade-apple flex-col text-right text-[#5c8b76]">
                                <p>Sprout &</p>
                                <p>About</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Tilt>
        </div>
    );
}
