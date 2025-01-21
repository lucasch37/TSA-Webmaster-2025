"use client";

import {MenuItem} from "@/types";
import Image from "next/image";
import React from "react";
import {Button} from "../ui/button";
import {ShoppingBasket} from "lucide-react";
import {Checkbox} from "../ui/checkbox";

type Props = {
    menuItem: MenuItem;
};

const MenuPageCard = ({menuItem}: Props): React.JSX.Element => {
    const [activeOptions, setActivOptions] = React.useState("Additives");
    return (
        <div className="flex flex-col container mx-auto mt-8">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
                <div className="relative">
                    <div className="w-full border-primary border-2 relative box-border">
                        <div className="flex justify-center items-center h-[35rem]">
                            <Image
                                src={menuItem.image_url}
                                className="w-[25rem]"
                                height={1000}
                                width={1000}
                                alt={menuItem?.name}
                            />
                        </div>
                        <div
                            className={`w-full grid ${Object.keys(menuItem.health_stats).length === 4 ? "grid-cols-4" : "grid-cols-5"} divide-x-2 divide-primary border-t-2 border-primary items-center`}
                        >
                            {Object.entries(menuItem.health_stats).map(
                                ([key, value], index) => (
                                    <div
                                        key={index}
                                        className="text-primary flex flex-col p-5"
                                    >
                                        <div className="text-xs">
                                            {`${key}`.toUpperCase()}
                                        </div>
                                        <div className="text-xl font-semibold">
                                            {`${value}`}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <div className="text-primary font-semibold text-4xl">
                            {menuItem.name.toUpperCase()}
                        </div>
                        <hr className="border-t-2 border-primary my-6 w-full" />
                        <div className="text-primary text-base font-medium max-w-full flex flex-col gap-8">
                            <div>{menuItem.description}</div>

                            <div>
                                INGREDIENTS:{" "}
                                {menuItem.ingredients.join(", ").toLowerCase()}
                            </div>
                        </div>
                        <div className="mt-12 flex gap-6 items-center">
                            <Button size={"lg"}>
                                <div className="font-normal">ADD TO CART</div>
                                <ShoppingBasket size={20} />
                            </Button>
                            <div className="font-bold text-primary text-[23px]">
                                ${menuItem.price}
                            </div>
                        </div>
                    </div>
                    <div className="border-2 mt-12">
                        <div className="grid grid-cols-2 divide-x-2 divide-primary border-b-2">
                            <div
                                className={`px-4 py-3 ${activeOptions === "Additives" ? "bg-primary text-white" : "text-primary"} font-medium cursor-pointer`}
                                onClick={() => setActivOptions("Additives")}
                            >
                                Additives
                            </div>
                            <div
                                className={`px-4 py-3 ${activeOptions === "Removables" ? "bg-primary text-white" : "text-primary"} font-medium cursor-pointer`}
                                onClick={() => setActivOptions("Removables")}
                            >
                                Removables
                            </div>
                        </div>
                        <div className="p-8 min-h-[10rem]">
                            <div className="grid grid-cols-3 gap-4 text-">
                                {(activeOptions === "Additives"
                                    ? menuItem.items_to_add
                                    : menuItem.items_to_remove
                                ).map((item, index) => (
                                    <div
                                        className="flex gap-2 items-center text-primary"
                                        key={index}
                                    >
                                        <Checkbox />
                                        <div>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPageCard;
