"use client";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {MenuItem} from "@/types";
import {motion} from "framer-motion";
import {
    ArrowLeft,
    BadgePercent,
    Check,
    Leaf,
    Minus,
    Plus,
    ShoppingBasket,
    WheatOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {toast} from "sonner";
import SustainabilityDialog from "./sustainability-dialog";

type Props = {
    menuItem: MenuItem;
    addToCart: Function;
};

// Detailed menu item page component
const MenuPageCard = ({menuItem, addToCart}: Props): React.JSX.Element => {
    const [activeOptions, setActivOptions] = React.useState<"Additives" | "Removables">(
        "Additives",
    );
    const [selectedAddItems, setSelectedAddItems] = React.useState<string[]>([]);
    const [selectedRemoveItems, setSelectedRemoveItems] = React.useState<string[]>([]);
    const [quantity, setQuantity] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    // Add item to cart with selected options
    const handleAddToCart = async (): Promise<void> => {
        try {
            setLoading(true);
            await addToCart(menuItem, quantity, selectedAddItems, selectedRemoveItems);
            toast.success(`${quantity}x ${menuItem.name} added to your cart!`);
        } catch {
            toast.error("Failed to add item to cart");
        } finally {
            setLoading(false);
        }
    };

    // Toggle add/remove items in customization
    const handleCheckboxChange = (item: string, type: "add" | "remove"): void => {
        if (type === "add") {
            setSelectedAddItems((prev) =>
                prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
            );
        } else {
            setSelectedRemoveItems((prev) =>
                prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
            );
        }
    };

    return (
        <div className="flex flex-col container mx-auto mt-4 md:mt-12">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 md:gap-8">
                {/* Left side - Image and nutrition info */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70}}
                    className="relative"
                >
                    <div className="w-full border-primary border-2 relative box-border bg-background/40 rounded-xl shadow-md">
                        <Link href={"/menu"} className="absolute top-1.5 left-5">
                            <Button className="w-fit px-0 text-lg" variant={"link"}>
                                <ArrowLeft size={18} />
                                Return to Menu
                            </Button>
                        </Link>
                        {/* Item image */}
                        <div className="flex justify-center items-center h-[20rem] md:h-[35rem]">
                            <Image
                                src={menuItem.image_url}
                                className="w-[15rem] md:w-[25rem]"
                                height={1000}
                                width={1000}
                                alt={menuItem?.name}
                            />
                        </div>

                        {/* Nutrition facts grid */}
                        <div
                            className={`w-full grid ${
                                Object.keys(menuItem.health_stats).filter(
                                    (key) =>
                                        key.toLowerCase() !== "saturated fat" &&
                                        key.toLowerCase() !== "serving size" &&
                                        key.toLowerCase() !== "fiber",
                                ).length === 4
                                    ? "md:grid-cols-4 grid-cols-2"
                                    : "md:grid-cols-5 grid-cols-2"
                            } border-t-2 border-primary items-center`}
                        >
                            {Object.entries(menuItem.health_stats)
                                .filter(
                                    ([key]) =>
                                        key.toLowerCase() !== "saturated fat" &&
                                        key.toLowerCase() !== "serving size" &&
                                        key.toLowerCase() !== "fiber",
                                )
                                .map(([key, value], index, array) => {
                                    const isLastColumn = index === array.length - 1;
                                    const isLastInRow = index % 2 === 1 || isLastColumn;
                                    const isLastRowMobile = index >= array.length - 2;

                                    return (
                                        <div
                                            key={index}
                                            className={`
                        text-primary flex flex-col p-5
                        ${!isLastInRow ? "border-r-2 border-primary" : ""}
                        ${!isLastRowMobile ? "border-b-2 md:border-b-0 border-primary" : ""}
                        ${index % 2 === 1 && !isLastColumn ? "md:border-r-2 border-primary" : ""}
                    `}
                                        >
                                            <div className="text-xs">
                                                {`${key}`.toUpperCase()}
                                            </div>
                                            <div className="text-xl font-semibold">
                                                {`${value}`}{" "}
                                                {key.toLocaleLowerCase() === "calories"
                                                    ? "kcal"
                                                    : !(
                                                          key.toLocaleLowerCase() ===
                                                          "serving size"
                                                      ) && "g"}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </motion.div>

                {/* Right side - Item details and customization */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.1}}
                    className="flex flex-col justify-between"
                >
                    {/* Item name and description */}
                    <div>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="text-primary font-semibold text-4xl flex">
                                {menuItem.name.toUpperCase()}
                            </div>
                            <div className="flex gap-3">
                                {menuItem.sale_percentage !== 0 && (
                                    <div
                                        className={
                                            "relative flex items-center px-3 py-1 font-medium text-sm transform "
                                        }
                                    >
                                        {/* Tag body */}
                                        <div
                                            className={
                                                "absolute inset-0 rounded-l-xl border border-red-500 shadow-inner bg-red-50"
                                            }
                                        ></div>

                                        {/* Hole/eyelet */}
                                        <div className="absolute w-2.5 h-2.5 rounded-full bg-background border border-red-700 left-1.5 top-1/2 -translate-y-1/2 shadow-inner z-10">
                                            <div className="absolute inset-0.5 rounded-full"></div>
                                        </div>

                                        {/* Text content */}
                                        <div
                                            className={
                                                "relative z-10 flex items-center ml-3 text-red-800 gap-1"
                                            }
                                        >
                                            <BadgePercent size={14} />
                                            {menuItem.sale_percentage}% OFF
                                        </div>
                                    </div>
                                )}
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
                        </div>
                        <hr className="border-t-2 border-primary my-6 w-full" />
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`font-bold text-primary text-2xl ${menuItem.sale_percentage !== 0 ? "line-through decoration-red-500 decoration-[4px]" : ""}`}
                            >
                                ${(menuItem.price * quantity).toFixed(2)}
                            </div>
                            {menuItem.sale_percentage !== 0 && (
                                <div className="text-primary font-bold text-2xl">
                                    $
                                    {(
                                        menuItem.price *
                                        (1 - menuItem.sale_percentage / 100) *
                                        quantity
                                    ).toFixed(2)}
                                </div>
                            )}
                            <div className="ml-2">
                                <SustainabilityDialog menuItem={menuItem} />
                            </div>
                        </div>
                        <div className="text-primary text-base font-medium max-w-full flex flex-col gap-8 my-6">
                            <div>{menuItem.description}</div>
                        </div>

                        {/* Quantity selector and add to cart */}
                        <div className="mt-8 flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={loading}
                                    size={"lg"}
                                    className="w-fit"
                                >
                                    <div>Add To Cart</div>
                                    <ShoppingBasket size={20} />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:bg-primary/10 shadow-md"
                                    onClick={() =>
                                        setQuantity((prev) => Math.max(1, prev - 1))
                                    }
                                >
                                    <Minus size={14} />
                                </Button>
                                <span className="text-primary font-medium shadow-md">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:bg-primary/10"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    <Plus size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Customization options */}
                    <div className="border-2 mt-12 bg-background/40 rounded-xl shadow-md overflow-hidden">
                        {/* Tab switcher */}
                        <div className="grid grid-cols-2 border-b-2 border-primary relative overflow-hidden">
                            {/* Animated background element */}
                            <motion.div
                                className="absolute top-0 bottom-0 bg-primary z-0"
                                initial={false}
                                animate={{
                                    left: activeOptions === "Additives" ? "0%" : "50%",
                                }}
                                transition={{
                                    type: "tween",
                                    ease: "easeInOut",
                                    duration: 0.25,
                                }}
                                style={{width: "50%"}}
                            />
                            <div
                                className={`px-4 py-3 transition duration-300 ease-in-out ${activeOptions === "Additives" ? "text-white" : "text-primary"} font-medium cursor-pointer z-10 relative`}
                                onClick={() => setActivOptions("Additives")}
                            >
                                Add Items
                            </div>
                            <div
                                className={`px-4 py-3 transition duration-300 ease-in-out border-l-2 border-primary ${activeOptions === "Removables" ? "text-white" : "text-primary"} font-medium cursor-pointer z-10 relative`}
                                onClick={() => setActivOptions("Removables")}
                            >
                                Remove Items
                            </div>
                        </div>

                        {/* Options checkboxes */}
                        <div className="p-4 md:p-8 min-h-[10rem]">
                            <div className="grid grid-cols-3 gap-4 text-">
                                {(activeOptions === "Additives"
                                    ? menuItem.items_to_add
                                    : menuItem.items_to_remove
                                ).map((item, index) => (
                                    <div
                                        className="flex gap-2.5 items-center text-primary w-fit"
                                        key={index}
                                    >
                                        <Checkbox
                                            checked={
                                                activeOptions === "Additives"
                                                    ? selectedAddItems.includes(item)
                                                    : selectedRemoveItems.includes(item)
                                            }
                                            onCheckedChange={() =>
                                                handleCheckboxChange(
                                                    item,
                                                    activeOptions === "Additives"
                                                        ? "add"
                                                        : "remove",
                                                )
                                            }
                                        />
                                        <div className="text-sm md:text-base">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MenuPageCard;
