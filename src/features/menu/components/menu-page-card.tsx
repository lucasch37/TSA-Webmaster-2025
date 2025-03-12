"use client";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {MenuItem} from "@/types";
import {motion} from "framer-motion";
import {BadgePercent, ChefHat, Minus, Plus, ShoppingBasket} from "lucide-react";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import {toast} from "sonner";

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
        <div className="flex flex-col container mx-auto mt-12">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-8">
                {/* Left side - Image and nutrition info */}
                <div className="relative">
                    <div className="w-full border-primary border-2 relative box-border">
                        {/* Item image */}
                        <div className="flex justify-center items-center h-[35rem]">
                            <Image
                                src={menuItem.image_url}
                                className="w-[25rem]"
                                height={1000}
                                width={1000}
                                alt={menuItem?.name}
                            />
                        </div>

                        {/* Nutrition facts grid */}
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
                                            {`${value}`}{" "}
                                            {key.toLocaleLowerCase() === "calories"
                                                ? "kcal"
                                                : !(
                                                      key.toLocaleLowerCase() ===
                                                      "serving size"
                                                  ) && "g"}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side - Item details and customization */}
                <div className="flex flex-col justify-between">
                    {/* Item name and description */}
                    <div>
                        <div className="flex gap-6 items-center">
                            <div className="text-primary font-semibold text-4xl flex">
                                {menuItem.name.toUpperCase()}
                            </div>
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
                        </div>
                        <hr className="border-t-2 border-primary my-6 w-full" />
                        <div className="text-primary text-base font-medium max-w-full flex flex-col gap-8 mb-5">
                            <div>{menuItem.description}</div>

                            <div>
                                <span className="font-bold underline">Ingredients:</span>{" "}
                                {menuItem.ingredients.join(", ")}
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-fit flex border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    <ChefHat size={18} />
                                    View Recipe
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95%] md:max-w-3xl max-h-[80vh] mx-auto overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-primary">
                                        {menuItem.name} Recipe
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none mt-4 text-primary">
                                    <ReactMarkdown>{menuItem.recipe}</ReactMarkdown>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Quantity selector and add to cart */}
                        <div className="mt-12 flex gap-6 items-center">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:bg-primary hover:text-white"
                                    onClick={() =>
                                        setQuantity((prev) => Math.max(1, prev - 1))
                                    }
                                >
                                    <Minus size={14} />
                                </Button>
                                <span className="text-primary font-medium">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:bg-primary hover:text-white"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    <Plus size={14} />
                                </Button>
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={loading}
                                    size={"lg"}
                                    className="w-fit"
                                >
                                    <div className="font-medium">Add To Cart</div>
                                    <ShoppingBasket size={20} />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    className={`font-bold text-primary text-[23px] ${menuItem.sale_percentage !== 0 ? "line-through decoration-red-500 decoration-[4px]" : ""}`}
                                >
                                    ${(menuItem.price * quantity).toFixed(2)}
                                </div>
                                {menuItem.sale_percentage !== 0 && (
                                    <div className="text-primary font-bold text-[23px]">
                                        $
                                        {(
                                            menuItem.price *
                                            (1 - menuItem.sale_percentage / 100) *
                                            quantity
                                        ).toFixed(2)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Customization options */}
                    <div className="border-2 mt-12">
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
