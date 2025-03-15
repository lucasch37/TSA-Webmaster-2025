"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {MenuItem} from "@/types";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {Check, Leaf, WheatOff} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {motion} from "motion/react";

// Grid of menu item preview cards
export default function MenuCard({menu}: {menu: MenuItem[]}): React.JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
            {menu?.map((menuItem, idx) => (
                <motion.div
                    key={menuItem.id}
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.1 * idx}}
                >
                    <Card
                        key={menuItem.id}
                        className="rounded-xl shadow-lg bg-background/40"
                    >
                        <CardContent>
                            {/* Item image */}
                            <div className="h-[16.5rem] flex items-center justify-center overflow-hidden">
                                <Image
                                    width={600}
                                    height={600}
                                    src={menuItem.image_url}
                                    alt={menuItem.name}
                                    className="w-[14rem] object-contain"
                                />
                            </div>

                            {/* Item name and description */}
                            <div className="flex gap-2 mt-3">
                                {menuItem.tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className={`
                                  relative flex items-center px-3 py-1
                                  font-medium text-sm transform
                                `}
                                    >
                                        {/* Tag body */}
                                        <div
                                            className={`
                                    absolute inset-0 
                                    ${tag === "Vegetarian" ? "bg-green-50" : ""}
                                    ${tag === "Vegan" ? "bg-green-200" : ""}
                                    ${tag === "Gluten Free" ? "bg-amber-100 border-amber-800" : ""}
                                    rounded-l-xl
                                    border shadow-inner
                                  `}
                                        ></div>

                                        {/* Hole/eyelet */}
                                        <div
                                            className={`absolute w-2.5 h-2.5 rounded-full bg-background border ${tag === "Gluten Free" ? "border-amber-800" : ""} left-1.5 top-1/2 -translate-y-1/2 shadow-inner z-10`}
                                        >
                                            <div className="absolute inset-0.5 rounded-full"></div>
                                        </div>

                                        {/* Text content */}
                                        <div
                                            className={`
                                  relative z-10 flex items-center ml-3
                                  ${tag === "Vegetarian" ? "text-green-800" : ""}
                                  ${tag === "Vegan" ? "text-green-800" : ""}
                                  ${tag === "Gluten Free" ? "text-amber-800" : ""}
                                `}
                                        >
                                            {tag === "Vegetarian" && (
                                                <span className="mr-1">
                                                    <Check size={12} />
                                                </span>
                                            )}
                                            {tag === "Vegan" && (
                                                <span className="mr-1">
                                                    <Leaf size={12} />
                                                </span>
                                            )}
                                            {tag === "Gluten Free" && (
                                                <span className="mr-1">
                                                    <WheatOff size={14} />
                                                </span>
                                            )}
                                            {tag}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-[10rem]">
                                <div className="text-primary font-semibold text-3xl text-[28px] mt-3 line-clamp-2 ">
                                    {menuItem.name.toUpperCase()}{" "}
                                </div>
                                <div className="text-primary text-sm mt-3 line-clamp-3">
                                    {menuItem.description}
                                </div>
                            </div>

                            {/* Price and details button */}
                            <Link href={`/menu/${encodeURIComponent(menuItem.name)}`}>
                                <Button
                                    size={"default"}
                                    className="w-full justify-between flex mt-4"
                                >
                                    <div>
                                        <span
                                            className={
                                                menuItem.sale_percentage !== 0
                                                    ? "line-through decoration-red-500 decoration-[2px]"
                                                    : ""
                                            }
                                        >
                                            ${menuItem.price.toFixed(2)}{" "}
                                        </span>
                                        {menuItem.sale_percentage !== 0 && (
                                            <span className="ml-1">
                                                $
                                                {(
                                                    menuItem.price *
                                                    (1 - menuItem.sale_percentage / 100)
                                                ).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-sm">See Details</div>
                                        <InfoCircledIcon className="w-5 h-5" />
                                    </div>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
